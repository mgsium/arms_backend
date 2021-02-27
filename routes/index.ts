import express from "express";

/* Import Routes */
import auth_routes from "./auth_router";

const defaultExports = (app: express.Application) => {

    /* Route Function Calls */
    auth_routes(app);

};

export default defaultExports;