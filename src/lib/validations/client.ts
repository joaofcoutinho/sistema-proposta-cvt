import { z } from "zod";

const hexColor = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Use um hex de 6 dígitos, ex.: #6C4FE8");

/** Schema de validação do formulário de cliente. */
export const clientFormSchema = z.object({
  companyName: z
    .string()
    .min(1, "Informe o nome da empresa")
    .max(120, "Máximo de 120 caracteres"),
  contactName: z.string().max(120, "Máximo de 120 caracteres").optional(),
  contactRole: z.string().max(120, "Máximo de 120 caracteres").optional(),
  contactEmail: z
    .string()
    .email("E-mail inválido")
    .max(160, "Máximo de 160 caracteres")
    .optional(),
  contactPhone: z.string().max(40, "Máximo de 40 caracteres").optional(),
  logoUrl: z.string().url("URL inválida").optional(),
  primaryColor: hexColor,
  accentColor: hexColor,
  themeMode: z.enum(["dark", "light"]),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
