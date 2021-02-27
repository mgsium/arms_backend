import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    password: String,

});

const userSchemaHandler = (coll_name: any) => mongoose.model("User", userSchema, coll_name);

const defaultExports = {
    UserSchema: userSchema,
    User: userSchemaHandler
};

export default defaultExports;