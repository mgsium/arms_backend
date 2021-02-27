import mongoose from "mongoose";
import UserModel from "./User";

const contractSchema: mongoose.Schema = new mongoose.Schema({
    mentor: UserModel.UserSchema,
    mentree: UserModel.UserSchema
})

const contractSchemaHandler = mongoose.model("Contract", contractSchema);

const defaultExports = {
    ContractSchema: contractSchema,
    Contract: contractSchemaHandler
};

export default defaultExports;