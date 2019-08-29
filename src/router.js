import {userRouter} from './controllers/user';
import {authRouter} from './controllers/auth'
import express from 'express';

const router = express.Router();

router.use('/user',userRouter);
router.use('/auth',authRouter);


export default router;