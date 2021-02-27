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
                        console.log(err);
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
        })
    )

    // @ts-ignore
    passport.serializeUser((user, done) => { done(null, user.id) });

    passport.deserializeUser((id, done) => {
        // @ts-ignore
        UserModel.User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}