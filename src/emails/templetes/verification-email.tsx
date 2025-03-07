import { env } from "@/env";
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text
} from "@react-email/components";
import { User } from "better-auth";
import React from "react";

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
        <Html lang="en">
            <Tailwind config={{
                theme: {
                    extend: {
                        fontFamily: {
                            custom: [
                                "-apple-system",
                                "BlinkMacSystemFont",
                                "\"Segoe UI\"",
                                "Roboto",
                                "Oxygen-Sans",
                                "Ubuntu",
                                "Cantarell",
                                "\"Helvetica Neue\"",
                                "sans-serif",
                            ],
                        },
                    },
                }
            }}>
                <Head />
                <Preview>Verify your email address for uyellitout</Preview>
                <Body className="text-gray-800 font-custom">
                    <Container>
                        <Heading className="text-3xl font-normal text-emerald-500 mb-10">uyellitout</Heading>
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
                        <Hr />
                        <Link className="text-emerald-500" href={env.NEXT_PUBLIC_BETTER_AUTH_URL}>
                            uyellitout
                        </Link>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default VerificationEmail;
