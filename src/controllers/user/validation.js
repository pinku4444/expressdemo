import {check} from 'express-validator/check'

const registerValidation = [
    check('name',"User Name is required").isLength({min:1}),
    check('email','please enter valid email').isEmail(),
    check('password','password length must be greater than 8 characters').isLength({min:8})
];


export {registerValidation};