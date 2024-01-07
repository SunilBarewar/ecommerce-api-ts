import { z } from "zod";

const body = {
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .trim()
      .min(1, "Name cannot be empty"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .trim()
      .min(1, "Email cannot be empty")
      .email("Invalid email"),
    role: z.enum(["admin", "customer", "vendor"], {
      errorMap: (issue, ctx) => {
        return { message: "Invalid role" };
      },
    }),

    password: z
      .string({ required_error: "Password can't be empty" })
      .trim()
      .min(6, "Password should have at least 6 characters"),
  }),
};

const params = {
  params: z.object({
    id: z.string({
      required_error: "id is required",
    }),
  }),
};

export const CreateUserSchema = z.object({
  ...body,
});
export const PartialUserSchema = CreateUserSchema.partial();

export const UpdateUserSchema = z.object({
  body: PartialUserSchema,
  ...params,
});

export const DeleteUserSchema = z.object({
  ...params,
});
export const GetUserSchema = z.object({
  ...params,
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type GetUserDto = z.infer<typeof GetUserSchema>;
export type DeleteUserDto = z.infer<typeof DeleteUserSchema>;
