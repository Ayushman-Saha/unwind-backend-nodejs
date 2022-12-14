//Importing the modules
import { Router } from "express";
import UserDataController from "../userData/userData.controller"

//Declaring the routes
const UserDataRouter = Router()


//Registering the routes
UserDataRouter.route("/register").post(UserDataController.register)
UserDataRouter.route("/get").get(UserDataController.getUser)
UserDataRouter.route("/update").post(UserDataController.modifyUser)
UserDataRouter.route("/delete").delete(UserDataController.deleteUser)

export default UserDataRouter