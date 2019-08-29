import jwt from 'jsonwebtoken';
import configuration from '../config/config'

module.exports = (req,res,next) => {
    let error  = new Error();
    try {
        const token = req.header('authorization');
        if(!token) {
            
            error.statusCode = 401;
            error.msg  = "Token is required";
            next(error);
        }
        const decode = jwt.verify(token,configuration.jwtSecret);
        req.user = decode.users;
        next();

    }catch(err) {
        console.log("error",err.message);
        error.statusCode = 401;
        if(error.message === "jwt must be provided") {
            error.msg  = "Token is required";
        }else {
            error.msg  = "Invalid Token";
        }
        next(error);
        
    }
}
