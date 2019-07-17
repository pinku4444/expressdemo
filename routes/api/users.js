const express = require('express');
const {check,validationResult} = require('express-validator/check')
const User = require('../../models/User')
const router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('config')

// @route   POST api/users
// @desc    Test Route
// @access  public

router.post('/',[
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
            config.get('jwtSecret'),
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

module.exports = router;

