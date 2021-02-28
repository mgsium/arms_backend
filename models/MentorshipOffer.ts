import mongoose from "mongoose";

const offerSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    description: String,
    location: {
        lat: Number,
        lng: Number
    },
    tags: [String]
})

const offerSchemaHandler = mongoose.model("Offer", offerSchema);

const defaultExports = {
    OfferSchema: offerSchema,
    Offer: offerSchemaHandler
};

export default defaultExports;