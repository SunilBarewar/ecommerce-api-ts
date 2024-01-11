import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyJwtToken.middleware";
import {
  getCart,
  addProductInCart,
  updateQuantityOfProduct,
  deleteProductFromCart,
} from "../services/cart.service";
import errorHandler from "../utils/errorHandler.util";

export const get = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    const cart = await getCart(user.cartId);

    return res.status(200).json({ cart });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export const addItem = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await addProductInCart(req.user.cartId, req.body);
    res.status(204).json({ message: "product added into cart" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export const removeItem = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await deleteProductFromCart(req.user.cartId, req.params.productId);
    res.status(204).json({ message: "product deleted from cart" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export const updateQuantity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    await updateQuantityOfProduct(
      req.user.cartId,
      req.params.productId,
      req.body.val
    );
    res.status(204).json({ message: "updated product quantity" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
