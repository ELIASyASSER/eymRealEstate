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
router.get("/profilePosts",verifyToken,profilePosts)

router.post("/",verifyToken,addPost) 
router.post("/save",verifyToken,savePost)

router.put("/:id",verifyToken,updatePost)
router.delete("/:id",verifyToken,deletePost)


export default router