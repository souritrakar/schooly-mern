const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schoolSchema = new Schema(
    
    {
    
        schoolname: {
        type:"String",
        required:true,
        minlength:5,
        trim:true
    },

    email:{
        type:"String",
        required:true,
        trim:true
    },

    password:{

        type:"String",
        required:"true",
        minlength:5
    }


    }, 

  {
    timestamps:true

  }

)

const School = mongoose.model("School", schoolSchema)

module.exports = School