import mongoose from "mongoose";
import TagModel from "./Tag";

const offerSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    tags: [TagModel.TagSchema]
})

const offerSchemaHandler = (coll_name: any) => mongoose.model("Offer", offerSchema, coll_name);

const defaultExports = {
    OfferSchema: offerSchema,
    Offer: offerSchemaHandler
};

export default defaultExports;