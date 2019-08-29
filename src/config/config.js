import { config } from 'dotenv'
config();

const envVars = process.env;

const configuration = Object.freeze({

    port : envVars.PORT,
    env : envVars.NODE_ENV,
    mongoUrl : envVars.mongoUrl,
    jwtSecret: envVars.jwtSecret
    
});

export default configuration;
