import mongoose from "mongoose";

const requestSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    tags: [String]
})

const requestSchemaHandler = mongoose.model("Request", requestSchema);

const defaultExports = {
    RequestSchema: requestSchema,
    Request: requestSchemaHandler
};

export default defaultExports;