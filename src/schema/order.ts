import { z } from "zod";

export const orderSchema = z.object({
    productType: z.enum(["service", "package"]),
    productId: z.number({
        message: "Please select a service or package."
    }),
    productCount: z.number().min(1, {
        message: "Session count must be more than 1."
    }).max(25, {
        message: "Session count must be less than 25."
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }).max(36, {
        message: "Name name must be at most 36 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    phoneNumber: z.string({
        message: "Phone numberis required.",
    }),
    age: z.number().min(1, {
        message: "Age must be at least 1 characters.",
    }),
    date: z.date({
        message: "Date is required.",
    }),
    staringtSlot: z.coerce.number({
        message: "Time is required.",
    }),
    message: z.string().optional(),
});