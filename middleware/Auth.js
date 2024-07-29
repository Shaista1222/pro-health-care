const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticte=(req,res,next)=>{
    const token = req.header('authentication');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const validateUser=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=validateUser;
        next()
    }catch (e) {
        res.status(401).json({ msg: 'Token is not valid' });
        console.error(e)
    }
}
module.exports = authenticte;