import express from "express";

import UserModel from "../models/User";
import MentorshipOfferModel from "../models/MentorshipOffer";

const routes = (app: express.Application) => {

    app.post("/offer/create", (req, res) => {
        const { name, description, location, tags } = req.body;

        // Create new offer object
        const offer = new MentorshipOfferModel.Offer({
            name: name,
            description: description,
            location: location,
            tags: tags
        });

        offer.save()
        .then((doc) => {
            res.json({
                success: true,
                message: "Created offer."
            });
        })
        .catch((err) => {
            res.json({
                success: false
            })
        });
    });

    app.get("/offer/get/:id", async (req, res) => {
        const offerId = req.query.id;

        const offer = await MentorshipOfferModel.Offer.findOne({ id: offerId })
                            .catch(err => null);

        console.log(offer);

        if(!offer) { return res.json(false); }
        return res.json({
            success: true,
            offer: offer
        })
    })

}