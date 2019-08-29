const express = require('express');
import auth  from '../../middleware/auth';
import UserController from './controller';
import {registerValidation} from './validation'

const userRouter = express.Router();

// @route   POST api/users
// @desc    Test Route
// @access  public

userRouter.post('/',registerValidation,UserController.signUp)

userRouter.get('/',auth,UserController.getUsers);

userRouter.get('/me',auth,UserController.me);

userRouter.delete('/delete/:id',auth,UserController.deleteUser);

userRouter.put('/update/:id',auth,UserController.updateUser);



export default userRouter;

