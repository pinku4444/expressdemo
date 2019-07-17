const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next) => {

    const token = req.header('token');
    if(!token) {
        res.status(400).json({msg:"token is reqired"})
    }

    try {
        const decode = jwt.verify(token,config.get("jwtSecret"));
        req.user = decode.users;
        next();

    }catch(err) {
        console.log(err.message);
        res.status(400).json({msg : "Invalid Token"})
    }
}
