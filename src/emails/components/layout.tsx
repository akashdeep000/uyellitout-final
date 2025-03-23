import { env } from "@/env";
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text
} from "@react-email/components";
import React from "react";

type EmailLayoutProps = {
    children: React.ReactNode;
    previewText: string;
};

export const EmailLayout: React.FC<Readonly<EmailLayoutProps>> = ({ children, previewText }) => {
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
                <Preview>{previewText}</Preview>
                <Body className="text-gray-800 font-custom">
                    <Container>
                        <Heading className="text-3xl font-normal text-emerald-500 mb-10">uyellitout</Heading>
                        {children}
                        <Hr className="my-6" />

                        <Section className="mt-4">
                            <Text>📞 Contact Us: 8584034584</Text>
                            <Text>📧 Email: uyellitout@gmail.com</Text>
                            <Text>🌐 Website: <Link href="https://uyellitout.com">uyellitout.com</Link></Text>
                            <Text>📲 Follow Us: <Link href="https://www.instagram.com/uyellitout">Instagram</Link></Text>
                        </Section>

                        <Hr className="my-6" />

                        <Link className="text-emerald-500" href={env.NEXT_PUBLIC_BETTER_AUTH_URL}>
                            <Section className="text-center mt-6">
                                <Img src={`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/full-logo.jpg`} alt="Uyellitout Logo" className="mx-auto mb-4" width="150" height="50" />
                            </Section>
                        </Link>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
