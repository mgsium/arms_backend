import mongoose from "mongoose";

const Config = {
    MONGO_PASSWORD: "avzxlXgMTBLfJCeJ",
    DB_NAME: "Cluster0"
}

// MongoDB via Mongoose
async function connectMongo() {
    await mongoose.connect(`mongodb+srv://armsAd:${Config.MONGO_PASSWORD}@cluster0.of1v7.mongodb.net/${Config.DB_NAME}?retryWrites=true&w=majority`)
        .then(() => console.log('Connected to MongoDB.'))
        .catch((err)=> console.log(err));
}

export default connectMongo;

