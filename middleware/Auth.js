const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticte=(req,res,next)=>{
    const token = req.header('Authorization')
    console.log(token);

    if (!token) {
        const err=new Error('No token, authorization denied')
        err.status = 'fail';
        err.statusCode=401
        next(err)
        // return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const validateUser=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=validateUser;
        next()
    }catch (e) {
        const err= new Error("Token is not valid")
        err.status = 'fail';
        err.statusCode=401
        next(err)
        // res.status(401).json({ msg: 'Token is not valid' });
        // console.error(e)
    }
}
const authorize=(role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            const err= new Error("You can not read the file")
            err.status = 'fail';
            err.statusCode=401
            next(err)
        }
        // const err= new Error("read the file")
        // err.status = 'success';
        // err.statusCode=200
        // next(err)
        next()
    }
}
const authorizeAll=(...role)=>{
    return (req,res,next)=>{
        const userRole = req.user.role;
        role.forEach(roles=>{
           if(roles.includes(userRole)){
              return next()
           }
            const err= new Error("You are not valid user, you can not enter")
            err.status = 'fail';
            err.statusCode=401
            next(err)
        })
    }
}
module.exports = {authenticte, authorize, authorizeAll};