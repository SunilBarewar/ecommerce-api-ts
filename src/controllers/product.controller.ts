import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler.util";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findProduct,
  updateProduct,
} from "../services/product.service";
import {
  CreateProductDto,
  DeleteProductDto,
  FilterProductsDto,
  GetProductDto,
  UpdateProductDto,
} from "../schemas/product.schema";

/**
 * @desc get/filter  products
 * @route /products
 * @method GET
 */
export const getAll = async (
  req: Request<{}, {}, {}, FilterProductsDto["query"]>,
  res: Response
) => {
  try {
    const products = await findAllProducts(req.query);
    return res.status(200).json({ products });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
/**
 * @desc create a product
 * @route /products
 * @method POST
 */
export const create = async (
  req: Request<{}, {}, CreateProductDto["body"]>,
  res: Response
) => {
  try {
    const product = await createProduct(req.body);
    res.status(200).json({ product });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc update a product
 * @route /products/:id
 * @method PATCH
 */
export const update = async (
  req: Request<UpdateProductDto["params"], {}, UpdateProductDto["body"]>,
  res: Response
) => {
  try {
    await updateProduct(req.params.id, req.body);
    res.status(204).end();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc delete a product
 * @route /products/:id
 * @method DETETE
 */
export const remove = async (
  req: Request<DeleteProductDto["params"]>,
  res: Response
) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).end();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

/**
 * @desc get a product
 * @route /products/:id
 * @method GET
 */
export const get = async (
  req: Request<GetProductDto["params"]>,
  res: Response
) => {
  try {
    const product = await findProduct(req.params.id);
    if (!product) return res.status(404).json({ message: "product not found" });

    res.status(200).json({ product });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
