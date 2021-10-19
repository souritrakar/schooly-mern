const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schoolSchema = new Schema(
    
    {
    
        schoolname:{

          type:"String",
          required:true
        
     
      
    },

    email:{
        type:"String",
        required:true
       
    },

    password:{
        type:"String",
        required:true
      

    
    }


    }, 

  {
    timestamps:true

  }

)

const School = mongoose.model("School", schoolSchema)

module.exports = School