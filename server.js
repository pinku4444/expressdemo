const express = require('express')
const connectDb = require('./config/db');
var cors = require('cors');
const errorHanlder = require('./middleware/errorHanlder');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');


 const app = express();
 connectDb();    
 const PORT = process.env.PORT || 9006;

app.get('/',(req,res) => {
    res.send("Welcome in FinalApp");
})

//init middileware
app.use(cors())
app.use(express.json({extended : false}))


//define route 
app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/auth',auth);
app.use('/api/profile',profile);
app.use(errorHanlder);


app.listen(PORT,() => console.log(`server running at port ${PORT}`))