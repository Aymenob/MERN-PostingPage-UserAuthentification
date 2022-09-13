const express=require("express")
const router=express.Router()
const {addPoster,getPosters}=require("../Controllers/postController")
var {Authorized}=require("../validation")

router.post("/Poster",Authorized,addPoster)
router.get("/getPosters",Authorized,getPosters)
module.exports=router
