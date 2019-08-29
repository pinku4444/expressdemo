import express from 'express';
import AuthController from './controller'
import {loginValidation} from './validation'
const authRouter = express.Router();

// @route   POST api/auth/login
// @desc    Login Route
// @access  public

authRouter.post('/login',loginValidation,AuthController.login)

export default authRouter;

