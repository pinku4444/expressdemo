import User from '../../models/User'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import configuration from '../../config/config'
import {validationResult} from 'express-validator/check'
class AuthController {

    async login(req,res,next){
        // check error 
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            let {email,password} = req.body;
            password = password.toString();
            
            // find user
            const users = await User.findOne({email});

            if( !users) {
                res.status(400).json({errors : [{msg : "Invalid Credientials"}]})
            }
            // matching password
            const isMatch = await bcrypt.compare(password,users.password);
            if(! isMatch) {
                res.status(400).json({errors : [{msg : "Invalid Credientials"}]})
            }

            // Generate session token

            const payload = {
                users : {
                    id : users.id
                }
            }

            jwt.sign(payload,
                    configuration.jwtSecret,
                    {expiresIn :3600},
                    (error,token) => {
                        if(error) {
                            throw error
                        }
                        res.status(200).json({token})
                        
                    }
            )
        }catch(error) {
            console.log(error.message)
            res.status(500).json({errors:[ {msg : error.message}]})
        }
    }
}

export default new AuthController;