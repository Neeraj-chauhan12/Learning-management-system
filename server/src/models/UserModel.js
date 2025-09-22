const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    enum:["instructor","student"],
    default:"student",
  },
  enrollCourse:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
  ],

  photoURL:{
    type:String,
    default:"",
  }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema)
