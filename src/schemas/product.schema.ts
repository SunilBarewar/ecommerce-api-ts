import { z } from "zod";

const body = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  desc: z.string().min(10, "Name cannot be empty"),
  price: z.number().min(1, "price cannot be zero"),
  stock: z.number(),
  category: z.string(),
  discount: z.number(),
  thumbnail: z.string(),
  images: z.array(z.string()),
  rating: z.number(),
});

const params = z.object({
  id: z.string({
    required_error: "id is required",
  }),
});
const query = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const FilterProductSchema = z.object({
  query
})

export const CreateProductSchema = z.object({
  body,
});

export const PartialProductSchema = CreateProductSchema.partial();

export const UpdateProductSchema = z.object({
  body: PartialProductSchema,
  params,
});

export const DeleteProductSchema = z.object({
  params,
});
export const GetProductSchema = z.object({
  params,
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
export type DeleteProductDto = z.infer<typeof DeleteProductSchema>;
export type GetProductDto = z.infer<typeof GetProductSchema>;
export type FilterProductsDto = z.infer<typeof FilterProductSchema>
