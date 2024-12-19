/* eslint-disable  @typescript-eslint/no-var-requires */
import {configure, getLogger} from "log4js";
import {LOG_DIR, LOG_FILE, LOG_LEVEL} from "../config/log.config";
import {
  LogLevelsEnum,
} from "../interfaces/log-levels-enum.interface";
require("mkdirp").sync("logs");

configure({
  appenders: {
    console: {type: "stdout", layout: {type: "colored"}},
    dateFile: {
      type: "dateFile",
      filename: `${LOG_DIR}/${LOG_FILE}`,
      layout: {type: "basic"},
      compress: false,
      daysToKeep: 14,
      keepFileExt: true,
    },
  },
  categories: {
    default: {appenders: ["console", "dateFile"], level: LOG_LEVEL},
  },
});

/**
 * Method that prints the severity level to the log file
 * @param {string} log Entire string log to register
 * @param {LogLevelsEnum} level Severity level
 */
const logByLeve = (log: string, level: LogLevelsEnum): void => {
  const logger = getLogger();
  switch (level) {
  case "warn":
    logger.warn(log);
    break;
  case "debug":
    logger.debug(log);
    break;
  case "fatal":
    logger.fatal(log);
    break;
  case "info":
    logger.info(log);
    break;
  default:
    logger.error(log);
    break;
  }
};

/**
 * Log incidence method
 * @param {string} controller Controller name or file name
 * @param {string} func Error method
 * @param {string} message Error message
 * @param {LogLevelsEnum} level Level warn, debug, fatal, info
 */
export const log = (
  controller: string,
  func: string,
  message: string,
  level: LogLevelsEnum,
): void => {
  logByLeve(
    `CONTROLLER: ${controller}, FUNCTION: ${func}, MESSAGE: ${message}`,
    level,
  );
};
