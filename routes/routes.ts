import express from "express"
import usersRoutes from "./users.routes";



const routes = (app: express.Application) => {

    app.use('/', usersRoutes.routes);
}

export default routes