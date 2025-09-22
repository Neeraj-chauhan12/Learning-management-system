const User=require('../models/UserModel')
const Bcrypt=require('bcrypt')
exports.Register=async(req,res)=>{

    const {userName,email,password}=req.body;
    try {

        if(!userName || !email || !password){
            return res.status(400).json({message:"all field are required"})
        }

        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"user already axists"});
        }

      const hashPassword=Bcrypt.hash(password,10);
      const user= await User.create({
        userName,
        email,
        password:hashPassword
      })

      res.status(201).json({message:"user created succusssfully",user})

    } catch (error) {
        console.log("error in registration server",error)
        return res.status(500).json({error:"error in registration server"})
        
    }


}