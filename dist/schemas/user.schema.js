"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserSchema = exports.GetUserSchema = exports.DeleteUserSchema = exports.UpdateUserSchema = exports.PartialUserSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
const body = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "Name is required",
    })
        .trim()
        .min(1, "Name cannot be empty"),
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .trim()
        .min(1, "Email cannot be empty")
        .email("Invalid email"),
    role: zod_1.z
        .enum(["admin", "customer", "vendor"], {
        errorMap: (issue, ctx) => {
            return { message: "Invalid role" };
        },
    })
        .optional(),
    password: zod_1.z
        .string({ required_error: "Password can't be empty" })
        .trim()
        .min(6, "Password should have at least 6 characters"),
});
const params = zod_1.z.object({
    id: zod_1.z.string({
        required_error: "id is required",
    }),
});
exports.CreateUserSchema = zod_1.z.object({
    body,
});
exports.PartialUserSchema = exports.CreateUserSchema.partial();
exports.UpdateUserSchema = zod_1.z.object({
    body: exports.PartialUserSchema,
    params,
});
exports.DeleteUserSchema = zod_1.z.object({
    params,
});
exports.GetUserSchema = zod_1.z.object({
    params,
});
exports.LoginUserSchema = zod_1.z.object({
    body: body.omit({ name: true, role: true }),
});
//# sourceMappingURL=user.schema.js.map