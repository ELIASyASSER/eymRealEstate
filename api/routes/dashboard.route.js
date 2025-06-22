import express from "express"
import {  deletePost, deleteUser, getAllUsers, getStats, getUserPosts } from "../controllers/dashboard.controller.js"
const router = express.Router()


router.route("/getUsers").get(getAllUsers)
router.route("/getUserPosts/:id").get(getUserPosts)
router.route("/deleteUser/:id").delete(deleteUser)
router.route("/deletePost/:id").delete(deletePost)
router.route("/getStats").get(getStats)

export default  router