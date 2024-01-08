import jwt from "jsonwebtoken";
const generateAccessToken = (userInfo: any) => {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: userInfo._id,
        name: userInfo.name,
        role: userInfo.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );

  return accessToken;
};

export default generateAccessToken;
