import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

export default (passport: PassportStatic) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            console.log(email);
            UserModel.User.findOne({ email: email })
            .then(( user ) => {
                // Check the email matches.
                if (!user) {
                    console.log("No User");
                    return done(null, false, { message: "That email is not registered." });
                }
                // Check the password matches.
                // @ts-ignore
                bcrypt.compare(password, user.password, ( err, isMatch ) => {
                    console.log("Comparing PW....");
                    if (err) {
                        console.log("Error Thrown!");
                        throw err;
                    }

                    if (isMatch) {
                        console.log("Is Match!");
                        return done(null, user);
                    }
                    else {
                        console.log("Is Not Match!");
                        return done(null, false, { message: "Incorrect Password." });
                    }
                })
                .catch((err) => { console.log(err); });
            })
            .catch((err) => {
                return done(null, false, { message: err });
            })
        })
    )

    passport.serializeUser((user, done) => { 
        // @ts-ignore
        console.log(`ID: ${user.id}`);
        // @ts-ignore
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log(`User Id: ${id}`);
        // @ts-ignore
        UserModel.User.findById(id, (err, user) => {
            console.log(user);
            done(err, user);
        });
    });
}