import { Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response) => {
  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ message: err.message });
};

export default errorHandler;
