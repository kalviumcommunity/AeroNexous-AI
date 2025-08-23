const jwt=require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET; 
module.exports=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({error:'Authorization header missing'});
    }
    const token=authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({error:'Token missing'});
    }
    try{
        const decoded=jwt.verify(token,secretKey);
        req.user=decoded; // Attach user info to request
        next();
    }catch(err){
        return res.status(401).json({error:'Invalid or expired token'});
    }
}