import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
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

const PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import routes from "./routes/index";
routes(app)

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});
