import {onRequest} from "firebase-functions/v2/https";
import {App} from "./app";
import {appConfig} from "./config/app.config";

const app = new App();

export const api = onRequest(appConfig, app.getApp());
