import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

export default (passport: PassportStatic) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            UserModel.User.findOne({ email: email })
            .then(( user ) => {
                // Check the email matches.
                if (!user) return done(null, false, { message: "That email is not registered." });
                // Check the password matches.
                // @ts-ignore
                bcrypt.compare(password, user.password, ( err, isMatch ) => {
                    if (err) throw err;

                    if (isMatch) return done(null, user);
                    else return done(null, false, { message: "Incorrect Password." })
                })
                .catch((err) => { console.log(err)});
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