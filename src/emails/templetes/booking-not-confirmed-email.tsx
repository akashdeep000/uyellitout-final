import {
    Body,
    Button,
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

type BookingNotConfirmedEmailProps = {
    ctx: {
        client: {
            name: string;
        };
        sessionType: string;
        sessionDateTime: string;
    };

    subject: string;
};

export const BookingNotConfirmedEmail: React.FC<Readonly<BookingNotConfirmedEmailProps>> = ({ ctx }) => {

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
                <Preview>Your booking is not confirmed</Preview>
                <Body className="text-gray-800 font-custom">
                    <Container>
                        <Heading className="text-3xl font-normal text-emerald-500 mb-10">uyellitout</Heading>
                        <Heading className="text-xl font-normal mb-4">Hello {ctx?.client?.name || "User"},</Heading>
                        <Text>We regret to inform you that your booking could not be confirmed. 😔</Text>
                        <Text className="mt-4">Your payment will be refunded within the next 5 business days. If you have any concerns or questions, feel free to contact us.</Text>


                        <Section className="my-6">
                            <Text className="text-lg font-bold">📅 Session Details:</Text>
                            <Text>📌 Session Type: {ctx?.sessionType}</Text>
                            <Text>⏳ Date & Time: {ctx?.sessionDateTime}</Text>
                        </Section>

                        <Section className="mt-6 mb-4">
                            <Text className="text-lg">Would you like to book another session?</Text>
                            <Button className="block p-3 bg-emerald-500 text-white text-center mt-2" href="/dashboard/book-a-session">Book Again</Button>
                        </Section>

                        <Hr className="my-6" />

                        <Text>With care,<br />Uyellitout</Text>

                        <Section className="mt-4">
                            <Text>📞 Contact Us: 8584034584</Text>
                            <Text>📧 Email: uyellitout@gmail.com</Text>
                            <Text>🌐 Website: <Link href="https://uyellitout.com">uyellitout.com</Link></Text>
                            <Text>📲 Follow Us: Instagram</Text>
                        </Section>

                        <Hr className="my-6" />

                        <Section className="text-center mt-6">
                            <Img src="https://uyellitout.com/full-logo.jpg" alt="Uyellitout Logo" className="mx-auto mb-4" width="150" height="50" />
                        </Section>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default BookingNotConfirmedEmail;
