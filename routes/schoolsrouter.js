const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

let School =  require("../models/school.model")

router.route('/').post( async (req, res)=>{
   const school = req.body

   const existingEmail  = School.findOne({email:school.email})
   
   if(existingEmail){
      res.json({message:"Email already exists."})
   }
   else{
      school.password = await bcrypt.hash(req.body.password, 10)

      const dbSchool = new School({
         schoolname: school.schoolname.toLowerCase(),
         email:school.email.toLowerCase(),
         password:school.password
      })

      dbSchool.save()
      res.json({message:"Registration successful!"})
   }
})


module.exports = router