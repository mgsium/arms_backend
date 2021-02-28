import express from "express";
import passport, { authenticate } from "passport";
import bcrypt from "bcrypt";

import UserModel from "../models/User";
import { info } from "console";

const routes = (app: express.Application) => {

    const authenticate = () => {
        passport.authenticate("local", {
            successRedirect: "https://localhost:8080/success",
            failureRedirect: "https://localhost:8080/failure",
            failureFlash: true
        });
    };

    app.post("/register", (req, res) => {
        const { name, email, password } = req.body;

        // Create a new user
        const user = new UserModel.User({
            name: name,
            email: email,
            password: password
        });

        // Hash the password
        bcrypt.genSalt(10,( err, salt )=> 
            // @ts-ignore
            bcrypt.hash(user.password, salt,
                ( err, hash ) => {
                    if(err) throw err;
                    // @ts-ignore
                    user.password = hash;
                    user.save()
                    .then((value: any) => { 
                        console.log(value); 
                        res.json({
                            success: true,
                            info: "Registered a new user."
                        })
                    })
                    .catch((err: any) => { 
                        console.log(err); 
                        res.json({
                            success: false,
                            info: "Could not register user."
                        });
                    });
                }
            )
        );
    });

    app.post("/login", (req, res, next) => {
        passport.authenticate("local",{
            successRedirect: "http://localhost:8080",
            failureRedirect: "http://localhost:8080"
        })(req, res, next);
    });

    app.get("/getuser", (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.json({
                success: true,
                user: req.user
            });
        } else {
            return res.json({
                success: false
            })
        }
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    })

}

export default routes;