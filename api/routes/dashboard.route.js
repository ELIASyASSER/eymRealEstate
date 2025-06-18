import express from "express"
import {  getAllUsers } from "../controllers/dashboard.controller.js"
const router = express.Router()
//to do dont forget to authenticate admin only can do this actions

router.route("/getUsers").get(getAllUsers)

export default  router