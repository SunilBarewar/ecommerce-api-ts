import { Request, Response } from "express";
import { errorLogger } from "./logger.utils";

const errorHandler = (err: any, req: Request, res: Response) => {
  const status = res.statusCode ? res.statusCode : 500; // server error
  errorLogger(err);
  res.status(status);

  res.json({ message: err.message });
};

export default errorHandler;
