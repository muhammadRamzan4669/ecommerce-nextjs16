import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z.string().refine((value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))), 'Price must have exactly two decimal places');

export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be atleast three characters'),
  slug: z.string().min(3, 'Slug must be atleast three characters'),
  category: z.string().min(3, 'Category must be atleast three characters'),
  brand: z.string().min(3, 'Brand must be atleast three characters'),
  description: z.string().min(3, 'Description must be atleast three characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have atleast one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency
})
