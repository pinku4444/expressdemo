import {check} from 'express-validator/check'

const loginValidation = [
    check('email','Invalid Email').isEmail(),
    check('password','password is required').isLength({min:1})
];

export { loginValidation };