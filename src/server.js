import express from 'express';
import connectDb from './config/db'
import config from './config/config'
import cors from 'cors';
import errorHanlder from './middleware/errorHanlder';
import router from './router'


 const app = express();
 connectDb();    

app.get('/',(req,res) => {
    res.send("Welcome in FinalApp");
})

//init middileware
app.use(cors())
app.use(express.json({extended : false}))

//define route 
app.use('/api',router);
// app.use('/api/posts',posts);
// app.use('/api/auth',auth);
// app.use('/api/profile',profile);
app.use(function(req, res, next) {
    let error  = new Error();
    error.statusCode = 404;
    error.msg  = "url not found";
    next(error)
  });
app.use(errorHanlder);




app.listen(config.port,() => { 
    console.log(`server running at port ${config.port}`)
})