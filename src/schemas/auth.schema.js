import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "username is required",
  }),
  email: z
    .string({
      required_error: "Correo requerido",
    })
    .email({
      message: "Correo Invalido",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, {
      message: "password must have at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "Correo invalido ",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, {
      message: "passwor must have at least 6 characters",
    }),
});
