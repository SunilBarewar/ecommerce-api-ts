import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail, getUser } from "../services/user.service";
import { CreateUserDto, LoginUserDto } from "../schemas/user.schema";
import generateAccessToken from "../utils/generateAccessToken.util";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.util";
/**
 * @desc login a user
 * @route /login
 * @method POST
 */
export const login = async (
  req: Request<{}, {}, LoginUserDto["body"]>,
  res: Response
) => {
  try {
    const foundUser = await findUserByEmail(req.body.email);
    if (!foundUser)
      return res.status(404).json({ message: "email doesn't exists" });

    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if (!match) return res.status(401).json({ message: "Wrong password" });

    sendTokenResponse(foundUser, res);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc register new user
 * @route /signin
 * @method POST
 */
export const signup = async (
  req: Request<{}, {}, CreateUserDto["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    sendTokenResponse(user, res);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc refresh token
 * @route /refresh
 * @method GET
 */
export const refresh = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    const generateRefreshToken = async (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await getUser(decoded.userId);

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = generateAccessToken(foundUser);

      res.status(200).json({ accessToken }).end();
    };

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      generateRefreshToken
    );
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc logout user
 * @route /logout
 * @method POST
 */
export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

  res.status(200).json({ message: "Cookie cleared" }).end();
};

const sendTokenResponse = (user: any, res: Response) => {
  //generating access token
  const accessToken = generateAccessToken(user);

  //create refresh token
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Send accessToken containing username and roles
  res.status(200).json({ accessToken }).end();
};
