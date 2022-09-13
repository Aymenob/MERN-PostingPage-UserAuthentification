
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const validation=[check("Name").notEmpty().withMessage("your Name filed is empty!"),
check("Email").isEmail().withMessage("Missing a Valid  Email!"),
check("Password").notEmpty().withMessage("your Password is empty!").isLength({min:6}).withMessage("Password is too short!").isLength({max:6}).withMessage("Password is too long!")
]
const validationLogin=[
check("Email").isEmail().withMessage("please enter a valid email!"),
check("Password").notEmpty().withMessage("your password is empty!").isLength({min:6}).withMessage("Password is too short!").isLength({max:6}).withMessage("Password is too long!")
]
module.exports={validation,validationLogin}
module.exports.Authorized = async function (req,res,next) {
    try
    {
        const token=req.header('token')
      const Verification = await jwt.verify(token, process.env.SECRET)
        if (!Verification) {
          return  res.json("you are not granted access!")
        }
        req.UserId=Verification.id
        next()
}
catch(err){
    res.status(400).json({msg:err})
}
}
