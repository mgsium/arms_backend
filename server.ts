import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import mongoInit from "./helpers/mongo_init";
import initPassport from "./helpers/passport";

mongoInit.connectMongo(); // Connect to MongoDB
initPassport(passport); // Initialize passportjs

const app: express.Application = express()   // Initialize Express
app.use(cors({
    credentials: true,
    origin: "http://localhost:8080"
}))         // Attach cors

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

//use flash
app.use(flash());


//express session
app.use(session({
    // TODO: Change this later
    secret : 'true',
    resave : true,
    saveUninitialized : true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
        secure: false
    },
    store: new MongoStore({
        mongoUrl: mongoInit.mongoEndpoint
    })
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3001


import routes from "./routes/index";
routes(app);

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});
