import * as cors from "cors";
import {Express} from "express";

/**
 * Cors validation
 * @param {Express} app Express param to cors
 */
export const setupCors = (app: Express): void => {
  app.use(cors({origin: true}));
};
