var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose=require("mongoose")
const model=require("../models/userSchema")
const { validationResult } = require('express-validator');
require("dotenv").config({path:"../Config/.env"})
//const errors = validationResult(req)
const getUsers=async function(req,res) {
   
    try{ 
        let result=await model.find({})
        res.json(result)
    }
    catch(err){res.json(err)}
 }
 

// Post User

 const postUser=async function(req,res){
    try{
        let errors=validationResult(req)
        if(!errors.isEmpty()){
          return  res.status(401).json({Errors:errors.array({ onlyFirstError: true })})
        }
        const {Name,Email,Password}=req.body
        let existedEmail=await model.findOne({Email})
        
        if(existedEmail){
         return  res.status(401).json({msg:"Email already Used!"})
        }
        var salt = await bcrypt.genSalt(10)
        var hashPassword = await bcrypt.hash(Password, salt);
          const result= await model.create({Name:Name,Email:Email,Password:hashPassword})
          const token = await jwt.sign({id:result._id},process.env.SECRET, { expiresIn: '30d' });
          return res.json({result,token})
    }
    catch(err){res.status(500).json(err)}
 }

 //Login User
// the order of verification is important!
 const  Login=async function (req,res) {
    try {
        const {Email,Password}=req.body
        let errors=validationResult(req)
       if (!errors.isEmpty()) {
         
        return res.status(401).json({Errors:errors.array({ onlyFirstError: true })})
        
       }
       let result=await model.findOne({Email})
       if (!result) {
        return res.status(401).json({msg:"non registered Email!"})
       }
       let existedHash=result.Password
       let comparePasword=await bcrypt.compare(Password, existedHash)
       if (!comparePasword) {
        return res.status(401).json({msg:"wrong Password!"})
       }
       let token = await jwt.sign({id:result._id},process.env.SECRET);
        return res.json({result,token})
    } catch (error) {res.status(500).json(error)}
 }

 //Update User
 
 const Delete=async function (req,res) {
  try{
    let deleted=await model.findByIdAndDelete({ _id: req.params.id })
     res.json(deleted)
  }
  catch(err){res.status(500).json({msg:err})}
 }
 //Update User
 
 const updateUser=async function (req,res) {
  try{
    let updated=await model.findByIdAndUpdate(req.params.id ,req.body,{new: true})
     res.json(updated)
  }
  catch(err){res.status(500).json({msg:err})}
 }

 module.exports={getUsers,postUser,Login,Delete,updateUser}