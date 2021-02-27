import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isMentor: Boolean,
    imageUrl: {
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png"
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const userSchemaHandler = mongoose.model("User", userSchema);

const defaultExports = {
    UserSchema: userSchema,
    User: userSchemaHandler
};

export default defaultExports;