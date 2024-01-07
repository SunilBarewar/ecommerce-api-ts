import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

export const errorLogger = (err: any) => {
  logger.error(err.message);
};
export default logger;
