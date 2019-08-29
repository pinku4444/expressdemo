import  mongoose from 'mongoose';
import configuration from './config';

const connectDb = async () => {
    try {
         await mongoose.connect(configuration.mongoUrl, { useNewUrlParser: true,useCreateIndex :true });
         console.log("connected to mongodb successfully");
    }catch(err) {
       console.log(err.message);
       process.exit(1)

    }
}
module.exports = connectDb;