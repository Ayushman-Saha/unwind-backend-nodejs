import { Collection, MongoClient } from "mongodb"

//The userData collection object
let userData : Collection

class UserDataDAO {
  //Method for getting the collection from the connection client
    static async injectDB(client : MongoClient) {
        try {
             userData = await client.db(process.env.DB_NAME).collection("userData")
        } catch (e) {
            console.error(`Unable to establish connection in UserDataDAO : ${e}`)
        }
    }

    //Method to get a user by ID
    static async getUser(uid : string) {
        return await userData.findOne({_id:uid})
    }

    //Method to register a user
    static async addUser(data : any) {
    try {
        await userData.insertOne(data)
        return { success: true }
      } catch (e) {
        //Checking if user exists with same uid
        if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
          return { error: "A user with the given uid already exists." }
        }
        console.error(`Error occurred while adding new user, ${e}.`)
        return { error: e }
      }
    }

    //Method to update a user
    static async updateUser(data : any) {
      try {
        await userData.updateOne(
          {_id : data._id},{
            $set : data
          })
        return {success : true}
      } catch(e) {
        console.error(`Error occurred while a updating the user, ${e}.`)
        return { error: e }
      }
    }

    //Method to delete a user
    static async deleteUser(uid : string) {
      try {
        await userData.deleteOne({_id : uid})
        return {sucess : true}
      } catch(e) {
        console.error(`Error occurred while a deleting the user, ${e}.`)
        return { error: e }
      }
    }
}

export default UserDataDAO