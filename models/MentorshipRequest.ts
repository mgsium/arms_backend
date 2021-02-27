import mongoose from "mongoose";
import TagModel from "./Tag";

const requestSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    tags: [TagModel.TagSchema]
})

const requestSchemaHandler = mongoose.model("Request", requestSchema);

const defaultExports = {
    RequestSchema: requestSchema,
    Request: requestSchemaHandler
};

export default defaultExports;