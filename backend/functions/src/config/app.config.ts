import {HttpsOptions} from "firebase-functions/v2/https";

export const appConfig: HttpsOptions = {
  region: "us-central1",
  memory: "256MiB",
  invoker: "public",
};
