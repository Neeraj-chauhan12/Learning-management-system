const User=require('../models/UserModel')
const Bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
exports.Register=async(req,res)=>{

    const {username,email,password}=req.body;
    try {

        if(!username || !email || !password){
            return res.status(400).json({message:"all field are required"})
        }

        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"user already axists"});
        }

      const hashPassword=await Bcrypt.hash(password,10);
      const user= await User.create({
        username,
        email,
        password:hashPassword
      })

      res.status(201).json({message:"user created succusssfully",user})

    } catch (error) {
        console.log("error in registration server",error)
        return res.status(500).json({error:"error in registration server"})
        
    }


}


exports.Login=async(req,res)=>{ 
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const isMatch=await Bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid password"})
        }
      
        // generate token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie("token",token,{httpOnly:true})
        res.json({message:"login succusssfully",user,token})


    } catch (error) {
        console.log("error in registration server",error)
        return res.status(500).json({error:"error in registration server"})
        
        
    }
}

exports.logout=async(req,res)=>{
    try {
        res.clearCookie('token')
        res.status(201).json({message:"logout succefully"})
        
    } catch (error) {
        console.log("error in logout server",error)
        return res.status(500).json({error:"error in logout server"})
        
    }
}