const mongoose = require('mongoose');
const config = require('config');
const mongoUri = config.get('mongoUrl');

const connectDb = async () => {
    try {
         await mongoose.connect(mongoUri, { useNewUrlParser: true,useCreateIndex :true });
         console.log("connected to mongob successfullly");
    }catch(err) {
       console.log(err.message);
       process.exit(1)

    }
}
module.exports = connectDb;