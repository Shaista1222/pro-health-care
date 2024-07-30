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
module.exports = authenticte;