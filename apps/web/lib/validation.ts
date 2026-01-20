import { z } from 'zod';

// Product validation schema
export const productSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    sku: z.string().optional(),
    stock: z.number().int("Stock must be a whole number").nonnegative("Stock cannot be negative"),
    buy_price: z.number().positive("Buy price must be positive"),
    sell_price: z.number().positive("Sell price must be positive"),
});

// Expense validation schema
export const expenseSchema = z.object({
    category: z.string().min(1, "Category is required").max(50, "Category too long"),
    amount: z.number().positive("Amount must be positive"),
    description: z.string().max(500, "Description too long").optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
});

// Type inference
export type ProductInput = z.infer<typeof productSchema>;
export type ExpenseInput = z.infer<typeof expenseSchema>;
