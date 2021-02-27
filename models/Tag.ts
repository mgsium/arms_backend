import mongoose from "mongoose";

const tagSchema: mongoose.Schema = new mongoose.Schema({
    name: String
});

const tagSchemaHandler = mongoose.model("Tag", tagSchema);

const defaultExports = {
    TagSchema: tagSchema,
    Tag: tagSchemaHandler
};

export default defaultExports;