const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')


let School =  require("../models/school.model")


async function hashPass(password){

  return await bcrypt.hash(password, 10)
}

router.route('/verify-email').post(async (req,res)=>{
   const emailid = req.body.email
   const verificationcode = req.body.code
   const transport = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:465,
      auth: {
         user:"useschooly@gmail.com",
         pass:'peg@sus69'
      }
   })

   await transport.sendMail({
      from:"useschooly@gmail.com",
      to:emailid,
      subject:"Schooly Verification Email",
      html:`<div><br/><center><h1> Schooly Verification Email</h1><br/><h3>Hey there! To verify your email, enter this in the input field:</h3><br/><br/><h1>${verificationcode}</h1></center></div>`
   }).then(()=>{
      res.json({message:200})
   })
   

})

router.route('/add').post( async (req,res)=>{
   
   const schoolname = req.body.name
   const email = req.body.email
   const password = req.body.password
 

   var schoolEmailExists = School.findOne({email:email}).exec()
   schoolEmailExists.then(function(doc){
      if(doc){
         res.json({message:"Sorry, but the account already exists."})
      }

      else{

         
         hashPass(password).then((hash)=>{
        
            const newSchool = new School({
               schoolname:schoolname,
               email:email,
               password:hash
            })

     
         
            newSchool.save()
            .then(()=>res.json({message:"Registration completed successfully!"}))
            .catch(err=>res.json({message:err}))
         })

        
        
      }
   })
})


module.exports = router