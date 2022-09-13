const express=require("express")
const router=express.Router()
const {getUsers,postUser,Login,Delete,updateUser}=require("../Controllers/contollers.js")
var {validation,validationLogin}=require("../validation")
var {Authorized}=require("../validation")

//get Users

router.get('',Authorized,getUsers)

// post User

router.post("/postUser",validation,postUser)

// Loggin

router.post("/logginUser",validationLogin,Login)

//delete User

router.delete("/deleteUser/:id",Authorized,Delete)

//delete Update

router.put("/updateUser/:id",Authorized,updateUser)

module.exports=router
