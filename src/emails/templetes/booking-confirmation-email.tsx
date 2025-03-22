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

type BookingConfirmationEmailProps = {
    ctx: {
        client: {
            name: string;
        };
        sessionType: string;
        sessionDateTime: string;
        link?: string;
    };
    subject: string;
};

export const BookingConfirmationEmail: React.FC<Readonly<BookingConfirmationEmailProps>> = ({ ctx }) => {

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
                <Preview>Your appointment is confirmed!</Preview>
                <Body className="text-gray-800 font-custom">
                    <Container>
                        <Heading className="text-3xl font-normal text-emerald-500 mb-10">uyellitout</Heading>
                        <Heading className="text-xl font-normal mb-4">Hello {ctx?.client?.name || "User"},</Heading>
                        <Text>Your session is confirmed, and we couldn’t be happier to welcome you. 🌟 Seeking support is an act of strength, and we’re honored to be part of your journey.</Text>

                        <Section className="my-6">
                            <Text className="text-lg font-bold">📅 Session Details:</Text>
                            <Text>📌 Session Type: {ctx?.sessionType}</Text>
                            <Text>🧑‍⚕️ Therapist: Srishti Singh</Text>
                            <Text>📍 Mode: Online</Text>
                            <Text>⏳ Date & Time: {ctx?.sessionDateTime}</Text>
                            <Text className="mt-4">🔗 <Link href={ctx?.link || "https://meet.google.com/qhd-iwmg-yen"}>This is the link to join the session</Link></Text>
                        </Section>

                        <Text>If you have any thoughts, questions, or simply want to share anything before our session, don’t hesitate to reach out. You’re in a safe space here.</Text>

                        <Hr className="my-6" />

                        <Heading className="text-lg font-bold">💡 Need to Reschedule?</Heading>
                        <Text>We understand that life can bring sudden urgencies. You can reschedule your session 24 hours prior to its scheduled time by following these steps:</Text>
                        <Text className="mt-2">1. Log in to your account (if not already).</Text>h
                        <Text>2. Go to the Dashboard.</Text>
                        <Text>3. Find the Bookings section.</Text>
                        <Text>4. Click on the Schedule button to reschedule your session.</Text>

                        <Text className="mt-4">We&apos;re here to make the process easy and supportive. See you soon! 💙</Text>

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
                            <Img src="http://uyellitout.com/full-logo.jpg" alt="Uyellitout Logo" className="mx-auto mb-4" width="auto" height="50" />
                        </Section>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default BookingConfirmationEmail;
