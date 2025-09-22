const jwt=require('jsonwebtoken');
exports.AuthMiddleware=async(req,res,next)=>{
   const token=req.Cookies.token;
   if(!token){
       return res.status(401).json({message:"unauthorized access"})
   }

   try {

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
    
   } catch (error) {
     return res.status(401).json({message:"invalid token"})
    
   }

}