const express = require('express');
const auth  = require('../../middleware/auth');
import User from '../../models/User'
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import configuration from '../../config/config'
const {check,validationResult} = require('express-validator/check')

const authRouter = express.Router();

// @route   GET api/auth
// @desc    Test Route
// @access  public

authRouter.get('/',auth,async (req,res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
})

// @route   POST api/auth/login
// @desc    Login Route
// @access  public

authRouter.post('/login',[
    check('email','Invalid Email').isEmail(),
    check('password','password is required').isLength({min:1})
],async (req,res) => {

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


})

export default authRouter;

