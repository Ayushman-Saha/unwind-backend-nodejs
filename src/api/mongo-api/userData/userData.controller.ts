import UserDataDAO from "../../../dao/userDataDao";
import { Request , Response} from 'express'

class UserData {
    _id: string
    name : string
    email : string
    display_picture : string
    followers : number
   
    constructor(_id : string, name: string, email :string, display_picture : string, followers : number)  {
        this._id = _id,
        this.name = name,
        this.email = email,
        this.display_picture = display_picture,
        this.followers = followers
    }

    toJson() {
        return { 
            "_id" : this._id,
            "name" : this.name,
            "email" : this.email,
            "display_picture" : this.display_picture,
            "followers" : this.followers
        }
    }
}

//The class for containing the modules for mutating the user data
class UserDataController {

    //Method to register the user
    static async register(req : Request, res : Response) {
        try {
            const userFromBody = req.body //getting userData from request body
            let errors = {
                status : 0,
                message : ""
            } //Object to hold all the errors

            //Inserting the data using UserDAO
            const insertResult = await UserDataDAO.addUser(userFromBody)

            //Checking if the insert is success
            if(!insertResult.success) {
                errors.status = 1
                errors.message = insertResult.error as string
            }

            //Confirming if the data is inserted in the remote DB
            const userFromDB = await UserDataDAO.getUser(userFromBody._id)
            if (!userFromDB) {
               errors.status = 1
               errors.message = "Internal error, please try again later"
            }

            //Checking the error object and returing them all
            if (Object.keys(errors).length > 0) {
                res.status(400).json(errors)
                return
              }

              //Converting response to User object
              if(userFromDB !=null) {
              const user = new UserData(userFromDB._id.toString(), userFromDB.name, userFromDB.email,userFromDB.display_picture,userFromDB.followers)

              res.status(200).json({
                  status : 0,
                  message : "Added user successfully!",
                  info : user.toJson()
              })

            }

        } catch(e) {
            //Returning errors in case of server side problem
            res.status(500).json({ error: e })
        }
    }

    //Method to get a userData based on uid
    static async getUser(req : Request,res : Response) {
        try {
            //Checking if the uid is provided
            if(req.query.uid!=null) {
                //Accessing the data using userDataDAO
                const userFromDB = await UserDataDAO.getUser(req.query.uid as string)

                //Checking if a user is returned by the remote database
                if (!userFromDB) {
                  res.status(404).json({
                      status : 1,
                      message : "No records exists for requested user!"
                  })
                } else {

                    //Database response to User object conversion
                  const user = new UserData(userFromDB._id.toString(), userFromDB.name, userFromDB.email,userFromDB.display_picture,userFromDB.followers)
                    res.status(200).json({
                        status : 0,
                        data : user.toJson() 
                    })
                } 
            } else {
                //Incase uid is not provided by the user in query
                res.status(401).json({
                    status : 1,
                    message : "Incomplete or malformed parameters"
                })
            }
        } catch(e) {
             //Returning errors in case of server side problem
             res.status(500).json({ error: e })
        }
    }

    //Method to modify details of a particular field for a user
    static async modifyUser(req : Request,res : Response) {
        try {
            let errors = {
                status : 0,
                message : ""
            }  //Object to hold all the errors
            let data = req.body //Extracting the request body

            //Checking if the uid is passed by the user
            if(data._id != null) {

                //Updating data using userDataDAO
               let updateResult = await UserDataDAO.updateUser(data)
               //Checking if the update is success
               if(!updateResult.success) {
                   errors.status = 0,
                   errors.message = "Error updating data for the requested user"
                } 
                //If the update is succcess
                else {
                    res.status(200).json({
                        status : 0,
                        message : "Successfully modified the entity for the requested user"
                    })
                }
                //If the uid is not passed by the user
            } else {
                errors.status = 0,
                errors.message = "Incomplete or malformed parameters"
            }

            //Checking for errors and sending the response
            if (Object.keys(errors).length > 0) {
                res.status(400).json(errors)
                return
              }

        } catch(e) {
            // For errors in server side
            res.status(500).json({
                 status : 1,
                 message : e 
                })
        }
    }

    //Method for deleting userData for a particular uid
    static async deleteUser(req : Request,res : Response) {
        try {
            let errors = {
                status : 0,
                message : ""
            } //Object for collecting erros
            let uid = req.query.uid //Extracting uid from query
            if(uid != null) {
                //Deleting the userData using userDataDAO
               let deleteResult = await UserDataDAO.deleteUser(uid as string)
               //Checking if the delete result is success
               if(!deleteResult.sucess) {
                   errors.status = 0,
                   errors.message = "Error deleting for the requested user"
                }
                //If the delete is success
                else {
                    res.status(200).json({
                        status : 0,
                        message : "Successfully deleted the entity for the requested user",
                        uid : uid
                    })
                }
            } else {
                //If user hasnt passed the uid
                errors.status = 0,
                errors.message = "Incomplete or malformed parameters"
            }

            //Checking for the errors and sending the responses
            if (Object.keys(errors).length > 0) {
                res.status(400).json(errors)
                return
              }

        } catch(e) {
            //For server side errors
            res.status(500).json({
                 status : 1,
                 message : e 
                })
            }
        }

}

export default UserDataController