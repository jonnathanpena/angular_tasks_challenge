import {defineString} from "firebase-functions/params";
import {IEnvironmentVars} from "../interfaces/environment-vars.interface";

export const getEnvironmentsVars = (): IEnvironmentVars => {
  return {
    firebase: {
      projectId: defineString("FB_PROJECT_ID")?.value() ?? "",
      clientEmail: defineString("FB_CLIENT_EMAIL")?.value() ?? "",
      privateKey: defineString("FB_PRIVATE_KEY")?.value() ?? "",
    },
    jwt: {
      secret: defineString("JWT_SECRET")?.value() ?? "",
      expiresIn: defineString("JWT_EXPIRES_IN")?.value() ?? "",
    },
  };
};
