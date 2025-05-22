import express from "express"
import {verifyToken} from "../middleware/authorization.js"
import {

    addPost, deletePost,
    getPosts, getSinglePost,
    updatePost ,savePost,
    profilePosts
    
} from "../controllers/post.controller.js"

const router = express.Router()

router.get("/",getPosts)
router.get("/getPost/:id",getSinglePost)
router.post("/",verifyToken,addPost)
router.put("/:id",verifyToken,updatePost)
router.delete("/:id",verifyToken,deletePost)
router.post("/save",verifyToken,savePost)
router.get("/profilePosts",verifyToken,profilePosts)


export default router