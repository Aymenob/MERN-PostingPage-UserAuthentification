var mongoose=require("mongoose")

const Poster=mongoose.Schema({
    Title:String,
    Des:String,
    Owner:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    Image:mongoose.Schema.Types.Mixed

})
module.exports=mongoose.model("Poster",Poster)
