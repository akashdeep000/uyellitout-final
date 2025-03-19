import libphonenumber from "google-libphonenumber";
import { z } from "zod";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

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
    phoneNumber: z.string().nonempty({ message: "Mobile number is required" })
        .refine(
            (number) => {
                try {
                    const phoneNumber = phoneUtil.parse(number);
                    return phoneUtil.isValidNumber(phoneNumber);
                } catch {
                    return false;
                }
            },
            { message: "Invalid mobile number" }
        ),
    age: z.number().min(1, {
        message: "Age must be at least 1 characters.",
    }),
    date: z.date({
        message: "Date is required.",
    }),
    startingSlot: z.coerce.number({
        message: "Time is required.",
    }),
    message: z.string().optional(),
});