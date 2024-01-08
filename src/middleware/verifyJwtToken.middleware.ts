import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: any;
}
const verifyJwtToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.header("Authorization");

    if (!authToken) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Missing Authorization header" });
    }

    const [, token] = authToken.split(" ");

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, decoded: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = decoded.userInfo;
        console.log(decoded);
        next();
      }
    );
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default verifyJwtToken;
