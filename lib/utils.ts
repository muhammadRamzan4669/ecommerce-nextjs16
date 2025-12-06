import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
}

/**
 * Format errors from various sources (Zod, Prisma, etc.) into user-friendly messages
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): string {
  // Handle Zod validation errors
  if (error.name === "ZodError") {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      return error.errors[field].message;
    });
    return fieldErrors.join(". ");
  }

  // Handle Prisma unique constraint errors (e.g., duplicate email)
  if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target ? error.meta.target[0] : "field";
    return `${field.charAt(0).toUpperCase()}${field.slice(1)} already exists`;
  }

  // Handle other errors
  return typeof error.message === "string"
    ? error.message
    : JSON.stringify(error.message);
}
