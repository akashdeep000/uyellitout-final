import {
    Button,
    Heading,
    Section,
    Text
} from "@react-email/components";
import { User } from "better-auth";
import React from "react";
import { EmailLayout } from "../components/layout";

type VerificationEmail = {
    ctx: {
        user: {
            email: string; // Keep email as required
        } & {
            [K in keyof Omit<User, "email">]?: User[K]; // Make other fields optional
        };
        url: string;
        token: string;
    };
    subject: string;
}

export const VerificationEmail: React.FC<Readonly<VerificationEmail>> = ({ ctx }) => {

    return (
        <EmailLayout previewText="Verify your email address for uyellitout">
            <Heading className="text-lg font-normal">Hello {ctx?.user?.name || "User"}</Heading>
            <Heading className="text-xl font-normal">Verify your email address</Heading>
            <Section>
                <Button className="block p-3 bg-emerald-500 text-white text-center" href={ctx?.url}>
                    Verify
                </Button>
            </Section>
            <Text className="text-sm text-gray-600">
                This link will only be valid for the next 5 minutes.
                <br />
                If you have not initiated any action that require email verification please ignore it.
            </Text>
        </EmailLayout>
    );
};

export default VerificationEmail;
