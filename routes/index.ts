import express from "express";

/* Import Routes */
import auth_routes from "./auth_router";
import mentor_routes from "./mentor_router";

const defaultExports = (app: express.Application) => {

    /* Route Function Calls */
    auth_routes(app);
    mentor_routes(app);

};

export default defaultExports;