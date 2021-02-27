import mongoose from "mongoose";
import TagModel from "./Tag";

const requestSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    tags: [TagModel.TagSchema]
})

const requestSchemaHandler = (coll_name: any) => mongoose.model("Request", requestSchema, coll_name);

const defaultExports = {
    RequestSchema: requestSchema,
    Request: requestSchemaHandler
};

export default defaultExports;