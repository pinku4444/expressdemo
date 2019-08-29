import express from 'express';
import cors from 'cors';
import router from './router';
import {notFoundRoute,errorHandlerRoute,Database} from './libs'
import bodyParser from "body-parser";

class Server {
    constructor(config) {
        this.config = config;
        this.app = express()
    }
    bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this.app;
    }

    initBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    setupRoutes() {
        
        const { app } = this;
        app.use('/api',router);
        app.use(notFoundRoute)
        app.use(errorHandlerRoute);
        this.run();
    }

    run() {
        const { app } = this;
        const { mongoUrl,port,env } = this.config;
        const dataBase = new Database(mongoUrl);
        dataBase.connect();
        app.listen(port,() => {
            console.log(`App is running at port ${port} || in ${env} mode`)
        })

    }
}

export default Server;

  

// app.get('/',(req,res) => {
//     res.send("Welcome in FinalApp");
// })

// //init middileware
// app.use(cors())
// app.use(express.json({extended : false}))

// //define route 
// app.use('/api',router);
// app.use(notFoundRoute)
// app.use(errorHandlerRoute);




// app.listen(config.port,() => { 
//     console.log(`server running at port ${config.port}`)
// })