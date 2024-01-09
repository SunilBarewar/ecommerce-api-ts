import { Request, Response, NextFunction } from "express";
const setHeaderCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.header("Access-Control-Allow-Credentials", "true");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
};

export default setHeaderCredentials;
