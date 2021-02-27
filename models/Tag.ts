import mongoose from "mongoose";

const tagSchema: mongoose.Schema = new mongoose.Schema({
    name: String
});

const tagSchemaHandler = (coll_name: any) => mongoose.model("Tag", tagSchema, coll_name);

const defaultExports = {
    TagSchema: tagSchema,
    Tag: tagSchemaHandler
};

export default defaultExports;