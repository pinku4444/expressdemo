const express = require('express');
const {check,validationResult} = require('express-validator/check')
import User from '../../models/User'
import configuration from '../../config/config';
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const auth  = require('../../middleware/auth');

const userRouter = express.Router();

// @route   POST api/users
// @desc    Test Route
// @access  public

userRouter.post('/',[
    check('name',"User Name is required").isLength({min:1}),
    check('email','please enter valid email').isEmail(),
    check('password','password length must be greater than 8 characters').isLength({min:8})
],async (req,res,next) => {

    // check validation error 
    const errors= validationResult(req);
    if(!errors.isEmpty()) {
        let err  = new Error();
        err.statusCode = 400;
        err.msg  = errors.array();
        next(err);

    }
    console.log("data",req.body )
    const {name,email,password} = req.body;
    try {
        // check user exist or not 
        let user = await User.findOne({email});
        if(user) {
            let err  = new Error();
            err.statusCode = 400;
            err.msg  = [ {msg : "User already exist"}];
            next(err);
        }

        // // use gravatar
         const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});


        user = new User({
            name,
            email,
            password,
            avatar
        })
        // // encrypt password 

         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payLoad = {
            users : {
                id :user.id
            }
        }

        jwt.sign(
            payLoad,
            configuration.jwtSecret,
            {expiresIn :3600},
            (error,token) => {
                if(error) {
                    throw error
                }
                res.status(200).json({token})
            }
        )
    }catch(err) {
        console.log(err.message);
        const error = new Error();
        err.statusCode = 500;
        err.msg = "server error";
        next(err);
    }
})

userRouter.get('/',auth,async (req,res,next) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
})

userRouter.get('/me',auth,async (req,res,next) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
})

userRouter.delete('/delete/:id',auth,async (req,res,next) => {
    const id = req.params.id;
    console.log(id);
    const data = await User.findOneAndRemove({_id:id});
    res.status(200).json(data);
})

userRouter.put('/update/:id',auth,async (req,res,next) => {
    const id = req.params.id;
    const userData = req.body;
    const data = await User.findOneAndUpdate({_id: id},{$set:userData},{new:true});
    res.status(200).json(data);
})



export default userRouter;

