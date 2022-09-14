const cloudinary = require('../Helpers/cloudinary');
const Post=require("../models/postSchema")
const addPoster =async function (req,res) {
try {
    const Img = req.files.Image.tempFilePath
    const {Title,Des}=req.body
    const uploading=await cloudinary.uploader.upload(Img)
    const createPost=await new Post({Title,Des,Image:{public_id:uploading.public_id,Url:uploading.url},Owner:req.UserId})
    const savePost=await createPost.save() 
    res.status(200).json(savePost)

    
}   
catch (err) {res.status(500).json({msg:err})}
    
}
const getPosters=async function(req,res){
    try {
        const posters=await Post.find({}).lean().populate({path:"Owner",select:"-Password -__v"})
          
          res.status(200).json(posters)
        
    } catch(err){res.status(500).json({msg:err})}
}

module.exports={addPoster,getPosters}