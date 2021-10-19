const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

let School =  require("../models/school.model")


async function hashPass(password){

  return await bcrypt.hash(password, 10)
}

router.route('/add').post( async (req,res)=>{
   
   const schoolname = req.body.name
   const email = req.body.email
   const password = req.body.password
 

   var schoolEmailExists = School.findOne({email:email}).exec()
   schoolEmailExists.then(function(doc){
      if(doc){
         res.json({message:"Already exists"})
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