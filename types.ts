import { z } from 'zod';
import { insertProductSchema, cartItemSchema, insertCartSchema, shippingAddressSchema, insertOrderSchema, newsletterSchema } from './lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
  colors?: string[];
  sizes?: string[];
  discount?: number;
}

// Cart types
export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof insertCartSchema>

// Shipping address type
export type ShippingAddress = z.infer<typeof shippingAddressSchema>

// Order types
export type OrderInput = z.infer<typeof insertOrderSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>

// Session type with role
export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
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

// Review type
export type Review = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  createdAt: Date;
  user?: {
    name: string;
    image?: string | null;
  };
}

// Order type
export type Order = {
  id: string;
  userId: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    email: string;
  } | null;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  isPaid: boolean;
  paidAt?: Date | null;
  isDelivered: boolean;
  deliveredAt?: Date | null;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: Date;
  orderItems: OrderItem[];
}

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  qty: number;
  price: string;
  name: string;
  slug: string;
  image: string;
  color?: string | null;
  size?: string | null;
}
