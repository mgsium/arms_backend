import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import mongoose from "mongoose";

import connectMongo from "./helpers/mongo_init";
import initPassport from "./helpers/passport";

connectMongo(); // Connect to MongoDB
initPassport(passport); // Initialize passportjs

const app: express.Application = express()   // Initialize Express
app.use(cors())         // Attach cors


// Initial cors config.
app.options("*", cors({
    origin: "*"
}));

app.use(passport.initialize());
app.use(passport.session());

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
//use flash
app.use(flash());

const PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import routes from "./routes/index";
routes(app)

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});
