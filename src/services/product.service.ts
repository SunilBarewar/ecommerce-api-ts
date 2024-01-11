import ProductModel from "../models/product.model";
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from "../schemas/product.schema";

export const findAllProducts = async (query: FilterProductsDto["query"]) => {
  const { category, search, sortBy, sortOrder } = query;

  const filter: any = {};
  if (category) {
    filter.category = category;
  }

  const searchQuery: any = {};
  if (search) {
    searchQuery.$or = [
      { name: { $regex: search, $options: "i" } }, // Case-insensitive search on the 'name' field
      { desc: { $regex: search, $options: "i" } }, // Case-insensitive search on the 'desc' field
    ];
  }

  const finalQuery = { ...filter, ...searchQuery };

  const sort: any = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  const products = await ProductModel.find(finalQuery).sort(sort).limit(20);
  return products;
};

export const findProduct = async (id: string) => {
  return await ProductModel.findById(id);
};

export const updateProduct = async (
  id: string,
  data: UpdateProductDto["body"]
) => {
  return await ProductModel.findByIdAndUpdate(id, data);
};

export const deleteProduct = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};

export const createProduct = async (productData: CreateProductDto["body"]) => {
  return (await (await ProductModel.create(productData)).save()).toJSON();
};
