import { Request, Response } from "express";
import Stripe from "stripe";
import errorHandler from "../utils/errorHandler.util";
import { createOrder } from "../services/order.service";
import { AuthenticatedRequest } from "../middleware/verifyJwtToken.middleware";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { products, from } = req.body;
    const lineItems = products.map((product: any) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
          images: [product.thumbnail],
        },
        unit_amount: product.discountedPrice * 100,
      },
      quantity: product.quantity,
    }));
    const email = req.user?.email || "";

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: email,
      mode: "payment",
      return_url: `http://localhost:5173/payment-status?session_id={CHECKOUT_SESSION_ID}&from=${from}`,
    });

    return res.status(200).json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res);
  }
};
export const getSessionStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id as string
    );

    return res.status(200).json({
      payment_status: session.status,
      payment_id: session.payment_intent,
      userId: req.user?.id,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const placeOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await createOrder(req.body);
    res.status(204).end();
  } catch (error) {
    errorHandler(error, req, res);
  }
};
