import express from 'express'
import cors from "cors"
import bodyParser from 'body-parser';
import 'dotenv/config';
import http from "http"

import routes from './routes/routes.js';
// import { initOpenApi, openApiInstance } from './openapi.js';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());


const port = process.env.PORT || 6060;
routes(app)

// initOpenApi(app, openApiInstance);

app.use((req: express.Request, res: express.Response) => {
    res.status(404).send({ url: req.originalUrl + ' not found !!' })
})

app.listen(port, () => {
    console.log(`Server Started at PORT ${port}`);
});