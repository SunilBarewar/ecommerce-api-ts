import CartModel from "../models/cart.model";

export const createCart = async () => {
  const cartData = {
    products: [],
  };
  const cart = await CartModel.create(cartData);
  await cart.save();

  return cart.toJSON();
};
export const getCart = async (cartId: string) => {
  let cart = await CartModel.findById(cartId).populate("products.productId");
  const products = cart?.toJSON().products.map((product) => ({
    ...product.productId,
    quantity: product.quantity,
  }));

  return products;
};
export const addProductInCart = async (cartId: string, product: any) => {
  return await CartModel.findByIdAndUpdate(cartId, {
    $push: { products: product },
  });
};
export const deleteProductFromCart = async (
  cartId: string,
  productId: string
) => {
  return await CartModel.findByIdAndUpdate(cartId, {
    $pull: { products: { productId: productId } },
  });
};
export const updateQuantityOfProduct = async (
  cartId: string,
  productId: string,
  val: number
) => {
  return await CartModel.updateOne(
    { _id: cartId, "products.productId": productId },
    {
      $inc: { "products.$.quantity": val },
    }
  );
};
