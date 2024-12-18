import {onRequest} from "firebase-functions/v2/https";
import * as express from "express";
import * as cors from "cors";

import {Request, Response} from "express";

const app = express();
app.use(cors({origin: true}));

app.get(
  "/api",
  (_: Request, res: Response): any => res.send("Hola mundo"),
);

exports.api = onRequest({
  region: "us-central1",
  memory: "256MiB",
  invoker: "public",
}, app);