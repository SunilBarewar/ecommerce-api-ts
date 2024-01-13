import jwt from "jsonwebtoken";
const generateAccessToken = (userInfo: any) => {
  const accessToken = jwt.sign(
    {
      userInfo: {
        id: userInfo._id,
        role: userInfo.role,
        cartId: userInfo.cartId,
        email: userInfo.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "2d" }
  );

  return accessToken;
};

export default generateAccessToken;
