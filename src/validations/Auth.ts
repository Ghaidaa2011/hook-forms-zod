import z from "zod";

export const signupSchema = z
  .object({
    first_name: z.string().min(1, { message: "first name is required" }),
    last_name: z.string().min(1, { message: "last name is required" }),
    email: z
      .string()
      .min(1, { message: "email is required" })
      .email({ message: "not valid email" }),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters" })
      .max(20, { message: "password must not be more than 20 characters" }),
    confirm_password: z
      .string()
      .min(6, { message: "confirm password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
export type Isignup = z.infer<typeof signupSchema>;
