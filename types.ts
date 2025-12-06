import { z } from 'zod';
import { insertProductSchema, cartItemSchema, insertCartSchema } from './lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
}

// Cart types
export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof insertCartSchema>

// Session type with role
export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
};

export type Session = {
  user: SessionUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
} | null;
