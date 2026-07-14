const { z } = require("zod");

const strongPasswordSchema = z.string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[!@#$%^&*()_\-+=]/, "A senha deve conter pelo menos um caractere especial");

const createUserSchema = z.object({
  name: z.string().min(2, "name deve ter ao menos 2 caracteres"),
  email: z.string().email("email inválido"),
  password: strongPasswordSchema,
});

module.exports = { createUserSchema };
