"use client";

import { NewBooking } from "@/components/bookings/new-booking";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { WordFadeIn } from "@/components/ui/word-fade-in";
import { cn } from "@/lib/utils";
import { ArrowRight, CalendarDays, Check, Info, MessagesSquare, Quote, ShieldCheck, UserRound, X } from "lucide-react";
import { motion, useSpring, useTransform } from "motion/react";
import Link from "next/link";

export default function Home() {
    const sessionsSpring = useSpring(168, { mass: 0.8, stiffness: 75, damping: 15 });
    const sessionsCount = useTransform(sessionsSpring, (current) =>
        Math.round(current).toLocaleString()
    );

    const clientsSpring = useSpring(34, { mass: 0.8, stiffness: 75, damping: 15 });
    const clientsCount = useTransform(clientsSpring, (current) =>
        Math.round(current).toLocaleString()
    );

    const features = [
        {
            "title": "Easy Accessibility",
            "description": "Access therapy anytime, anywhere from your phone or computer.",
            "our": true,
            "others": false
        },
        {
            "title": "24/7 Support",
            "description": "Get round-the-clock chat support to address urgent concerns.",
            "our": true,
            "others": false
        },
        {
            "title": "Privacy & Anonymity",
            "description": "Choose to remain fully anonymous for added comfort.",
            "our": true,
            "others": false
        },
        {
            "title": "Flexible Scheduling",
            "description": "Book sessions that fit your schedule, including evenings and weekends.",
            "our": true,
            "others": false
        },
        {
            "title": "Cost-Effectiveness",
            "description": "Transparent and affordable pricing without travel expenses.",
            "our": true,
            "others": false
        },
        {
            "title": "Video Sessions",
            "description": "High-quality, face-to-face therapy through video calls with therapists",
            "our": true,
            "others": false
        },
        {
            "title": "Chat Sessions",
            "description": "Anonymous, text-based therapy for those who prefer written communication.",
            "our": true,
            "others": false
        },
        {
            "title": "Phone Sessions",
            "description": "Voice-based therapy for those who prefer talking without video or text.",
            "our": true,
            "others": false
        },
        {
            "title": "No Commuting Required",
            "description": "Save time and money by attending sessions from the comfort of your home.",
            "our": true,
            "others": false
        },
        {
            "title": "Interactive Resources",
            "description": "Engage with quizzes, blogs, and tools to complement your therapy journey.",
            "our": true,
            "others": false
        },
        {
            "title": "Customized Care Plans",
            "description": "Personalized strategies and follow-ups tailored to your needs.",
            "our": true,
            "others": false
        },
        {
            "title": "Tech Enhanced Experience",
            "description": "Digital reminders, session notes, and tools to track your progress.",
            "our": true,
            "others": false
        },
        {
            "title": "Progress Tracking",
            "description": "Get a detailed progress report after each session to see your growth over time.",
            "our": true,
            "others": false
        }
    ];

    const FAQs = [
        {
            title: "General Counseling Questions",
            questions: [
                {
                    question: "What is counseling?",
                    answer: "Counseling is a process where a professional helps individuals work through personal challenges, mental health issues, emotional distress, or life changes by providing guidance and support."
                },
                {
                    question: "What types of counseling do you offer?",
                    answer: "We offer a wide range of counseling services, including <b>individual therapy, couples therapy, family therapy, parental counseling, child and teen counseling, and more</b>, tailored to each individual's or family’s needs."
                },
                {
                    question: "Why should I seek counseling?",
                    answer: "Counseling is beneficial if you are dealing with emotional difficulties, stress, anxiety, relationship issues, grief, or any other life challenge. It provides you with a safe space to talk, reflect, and gain coping strategies."
                },
                {
                    question: "How do I know if therapy is right for me?",
                    answer: "Therapy is for anyone who wants to understand themselves better, improve their mental health, and work through challenges. If you’re feeling overwhelmed, stuck, or struggling with your emotions, therapy can be a helpful step."
                },
                {
                    question: "Is counseling confidential?",
                    answer: "Yes, counseling is confidential. All personal information shared during sessions is kept private, except in rare situations where there is a risk of harm to yourself or others, in which case the counselor may need to break confidentiality."
                },

            ]
        },
        {
            title: "Booking a Session",
            questions: [
                {
                    question: "How do I book a session?",
                    answer: " Simply visit our <b>Book Your Session</b> page, select your preferred therapy type, choose a date and time, and follow the easy steps to confirm your appointment."
                },
                {
                    question: "What happens if I miss my appointment?",
                    answer: "If you miss your session, please inform us at least 24 hours in advance. In case of emergencies, contact us, and we’ll do our best to assist. The final decision will be at our discretion."
                },
                {
                    question: "Can I reschedule my session?",
                    answer: "Yes, you can reschedule up to <b>24 hours before</b> your appointment. After this, the session may be considered a missed session, and fees may apply."
                },
                {
                    question: "How long are the sessions?",
                    answer: "The duration of a session typically ranges from <b>45 minutes to 90 minutes</b> depending on the type of therapy you select."
                },
                {
                    question: "Can I book multiple sessions at once?",
                    answer: "Yes, you can book multiple sessions upfront. You can also choose a regular session plan that suits your needs."
                },
            ]
        },
        {
            title: "Payment and Pricing",
            questions: [
                {
                    question: "What is the cost of counseling?",
                    answer: "The cost depends on the type of therapy and duration of the session. Our pricing is transparent, and you can view the costs on our <b>Book Your Session</b> page. We offer affordable rates for the quality of care provided."
                },
                {
                    question: "Do you accept insurance?",
                    answer: "Currently, we do not accept insurance directly, but you may be able to seek reimbursement through your insurance company depending on your plan. We recommend checking with your insurance provider for coverage details."
                },
                {
                    question: "Are there payment plans available?",
                    answer: "Yes, we offer flexible payment plans. You can choose to pay per session or select a package for multiple sessions at a discounted rate."
                },
                {
                    question: "Do I have to pay upfront?",
                    answer: "Payment is required at the time of booking. For your convenience, we accept a variety of payment methods including credit cards, debit cards, UPI, and other digital payment options."
                },
                {
                    question: "Is there a discount for multiple sessions?",
                    answer: "Yes, we offer discounted rates if you book a set of sessions in advance. Check our <b>Book Your Session</b> page for more details."
                },
            ]
        },
        {
            title: "Therapy and Sessions",
            questions: [
                {
                    question: "How do I prepare for my first session?",
                    answer: "Simply come with an open mind. It’s helpful to think about any specific issues you want to address, but don’t worry if you’re unsure. Your therapist will guide the conversation."
                },
                {
                    question: "What is the difference between individual and couples therapy?",
                    answer: "<b>Individual therapy</b> focuses on personal well-being, while <b>couples therapy</b> is aimed at improving communication, resolving conflicts, and building a stronger relationship between partners."
                },
                {
                    question: "How do I know if therapy is working?",
                    answer: "Therapy is a gradual process. You may notice small improvements in your mood, perspective, or coping skills over time. Your therapist will also check in on progress during sessions."
                },
                {
                    question: "Can I bring a friend or family member to the session?",
                    answer: "Generally, therapy is most effective when it’s one-on-one, but we understand if you feel more comfortable having a support person with you. Please discuss this with your therapist beforehand."
                },
                // {
                //     question: "Can I ask for a specific therapist?",
                //     answer: "Yes, we allow you to choose a therapist based on their specialties or experience. If you have preferences, we’ll match you with someone best suited to your needs."
                // },
            ]
        },
        {
            title: "Special Types of Therapy",
            questions: [
                {
                    question: "What is family therapy?",
                    answer: "Family therapy is a form of counseling that addresses the needs of families facing issues such as communication problems, conflicts, or stress. It helps improve relationships and build a healthier family dynamic."
                },
                {
                    question: "What is parental counseling?",
                    answer: "Parental counseling helps parents navigate parenting challenges, improve their parenting skills, and strengthen their relationships with their children, especially during difficult times."
                },
                {
                    question: "What is child and teen counseling?",
                    answer: "This type of therapy focuses on helping children and teenagers cope with emotional challenges, behavioral issues, or developmental difficulties, providing them with tools to manage their emotions and build resilience."
                },
                {
                    question: "Do you offer group therapy?",
                    answer: "Yes, we offer <b>group therapy</b> sessions where you can connect with others who may be experiencing similar issues, under the guidance of a trained therapist."
                },
                {
                    question: "How does couples therapy work?",
                    answer: "Couples therapy focuses on resolving conflicts, improving communication, and rebuilding trust. It helps both partners understand each other's perspectives and find healthy ways to address disagreements."
                },
            ]
        },
        {
            title: "After the Session",
            questions: [
                {
                    question: "What should I do after my session?",
                    answer: "After your session, reflect on what was discussed, and implement any coping strategies or suggestions provided by your therapist. Journaling or practicing new techniques between sessions can also help."
                },
                {
                    question: "Will I need ongoing therapy?",
                    answer: "The need for ongoing therapy depends on the progress and the goals you have set with your therapist. Some clients benefit from short-term therapy, while others prefer longer-term support."
                },
                {
                    question: "Can I talk to my therapist between sessions?",
                    answer: "We encourage you to use the strategies discussed in your sessions. However, if something urgent arises, you can reach out for support, and we’ll try to assist you as needed."
                },
            ]
        },
        {
            title: "Technical Issues (Online Therapy)",
            questions: [
                {
                    question: "What should I do if my online session isn’t working?",
                    answer: "If you encounter technical difficulties, let your therapist know immediately. We will work to resolve the issue, and if necessary, reschedule or offer a phone session as an alternative."
                },
                {
                    question: "Do I need to download any software for video therapy?",
                    answer: "No special software is required for video sessions. We use a secure platform that works directly from your web browser, ensuring ease of use."
                },
                {
                    question: "Can I use my mobile phone for therapy?",
                    answer: "Yes, you can use your smartphone, tablet, or computer for online therapy. Ensure you have a stable internet connection for the best experience."
                },
                {
                    question: "Do I need a webcam and microphone for online sessions?",
                    answer: "Yes, for video therapy, a working webcam and microphone are necessary. If you’re having trouble with the tech, let us know, and we’ll help you set it up."
                },
            ]
        },
        {
            title: "Privacy and Security",
            questions: [
                {
                    question: "How do you ensure my privacy during online therapy?",
                    answer: "We use a secure and encrypted platform to ensure your privacy during online sessions. Your personal information is stored safely and only shared when necessary, as per confidentiality guidelines."
                },
                {
                    question: "Will anyone else have access to my therapy records?",
                    answer: "No, your therapy records are kept confidential. Only authorized personnel will have access if required by law or with your explicit consent."
                },
            ]
        },
        {
            title: "Others",
            questions: [
                {
                    question: "Can I book therapy for someone else?",
                    answer: "Yes, you can book a session for a loved one with their consent. However, the individual must be aware and ready for therapy to be effective."
                },
                {
                    question: "How do I track my progress in therapy?",
                    answer: "Your therapist will regularly check in on your progress and review any goals you’ve set. You can also track changes in how you feel, your coping skills, or improvements in relationships."
                },
                {
                    question: "What if I don’t feel comfortable with my therapist?",
                    answer: "It’s important to feel comfortable with your therapist. If you ever feel that your therapist isn’t the right fit, you can request a different one."
                },
                {
                    question: "How long does it take to see results from therapy?",
                    answer: "Every person’s journey is different. Some may feel improvements after a few sessions, while others may take longer. It’s important to trust the process and communicate with your therapist about your concerns."
                },
            ]
        },
    ];

    return (
        <main>
            {/*<section className="bg-white">
                <div className="min-h-[calc(100svh_+_0.5rem)] flex flex-col relative">
                    <svg
                        className="pt-[20%] md:pt-[10%] lg:pt-0 w-full max-h-[calc(100svh_+_0.5rem)] h-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1"
                        preserveAspectRatio="none"
                        viewBox="0 0 1440 810"
                    >
                        <path
                            fill="#235161"
                            d="m-37.863 803.598 1564.988.004-3.398 3.398V-758.656l3.398 3.402H-37.863l3.394-3.398V807zm0 6.8A3.4 3.4 0 0 1-41.262 807V-758.652a3.4 3.4 0 0 1 3.399-3.403h1564.988a3.404 3.404 0 0 1 3.398 3.399V807a3.397 3.397 0 0 1-3.398 3.398Zm0 0"
                        ></path>
                        <path
                            fill="#c6dce4"
                            d="M712.457 372.195c-11.23-1.988-4.906-16.078 22.242-38.488 87.043-71.844 199.54-76.477 247.235-123.254 12.101-11.867 127.398-66.586 141.636-75.48 88.727-55.422 88.399-63.18 140.961-49.004l106.563 50.5c17.039 6.96 43.047 18.289 74.394 35.793 17.625 9.843 54.086 23.656 61.262 24.84 29.227 4.816 18.664 33.078-20.305 86.351-46.62 63.738-103.414 96.738-157.441 111.742-104.465 29.012-228.965 47.504-374.426 52.211Zm0 0"
                        ></path>
                        <path
                            fill="#c6dce4"
                            d="M54.629 489.777c-15.75-4.875-89.98-45.16-89.012-223.52.59-107.773-1.047-54.343-.054-108.714.042-2.32 20.507-13.152 34.898-24.094 24.008-18.254 33.516-30.543 42.89-32.125 14.997-2.527 28.715 13.121 95.13 42.692 43.62 19.418 99.574 35.789 134.367 52.949 77.757 38.36 145.082 19.039 201.652 3.484 90.7 17.324 161.695 47.86 173.05 47.918l77.864 10.395c50.836 14.828 81.559 21.863 91.906 23.406 15.125 2.258 54.242 3.805 116.528 12.812 78.699 11.387 120.629 22.196 127.523 22.047Zm0 0"
                        ></path>
                        <path
                            fill="#8cb0bc"
                            d="M1269.531 450.266c-7.176 36.574-106.011-61.204-329.472-149.696L790.227 252c-25.832-5.492-109.97-48.238-130.825-44.965-23.789 3.735-72.832 37.524-109.468 65.375-110.782 84.219-182.832 87.25-223.38 121.547-91.921 38.152-162.527 69.05-205.214 101.926-38.367 29.55-41.89 63.914-17.84 94.379q9.645 33.62 183.07 31.902l217.368-11.266 606.007-9.386c134.504-8.028 370.102 9.172 411.895-27Zm0 0"
                        ></path>
                        <path
                            fill="#52869a"
                            d="M1500.352 409.871c2.668-52.414 22.304-64.898 20.414-185.68-10.364 15.668-41.836-2.082-94.227-20.558-52.394-18.473-136.832-73.375-143.555-73.801-42.87-16.523-147.703 69.23-172.507 84.078C958.25 305.031 937.785 342.191 863.64 396.34c-63.133 46.101-59.934 51.07-76.184 63.156-15.09-5.766-35.906-10.101-35.906-10.101-23.762-9.168-75.602-36.301-95.727-36.66-20.715-.372-136.484 60.269-193.62 103.253-47.142 35.465-44.798 58.356-79.302 52.793-61.8-9.96-17.832 136.29-173.343 45-27.215 6.418-20.227-4.582-46.508 6.95-33.133 14.539-65.762 52.144-104.985 113.222Zm0 0"
                        ></path>
                        <path
                            fill="#52869a"
                            d="M833.992 506.164c-39.726 3.168-33.687 111.879-135.125 95.86l-119.652-67.856c-43.836-52.066-59.727-17.89-116.477-43.281-45.293-20.262-85.097-34.504-147.781-95.121-7.375-7.137-59.027-47.832-81.394-67.047-16.196-13.914-30.852-27.89-49.176-28.242C163.273 300.07 44.523 343.664-8.426 345c-33.586.848-15.828-68.836-15.828-68.836-1.14 22.7-.957-.316-.957-.316-.7 57.941 17.828 147.886 17.828 147.886 45.13 83.434 172.73 147.41 384.723 180.309 194.094 30.121 384.035 9.312 568.137-50.773Zm0 0"
                        ></path>
                        <path
                            fill="#235162"
                            d="m-34.71 628.258 780.062.004h780.058v180.5H-34.71z"
                        ></path>
                        <path
                            fill="#235162"
                            d="M-20.914 637.863c.215-4.41-13.473 3.028-13.586-4.816-.371-25.582.734-81.149.484-105.274-1.652-159.246.086-256.46-.433-278.16-.082-3.441 7.703 36.989 27.949 30.93 39.227-11.738 37.688 38.164 59.371 45.46 18 6.06 10.621 20.72 62.844 56.735 7.664 5.285 38.277 13.805 69.617 46.184l74.086-27.652c19.672 10.644 68.652 58.582 89.723 64.785 35.097 35.199 101.32 68.437 101.32 68.437 97.41 64.543 270.754 95.68 270.754 95.68 174.629 62.21 337.078 147.183 388.558 156.426Zm0 0"
                        ></path>
                        <path
                            fill="#235162"
                            d="M1528.59 642.719c-1.227-241.836-1.227-340.543-3.469-454.563-3.434 12.406-64.684 100.95-96.387 100.356-17.761-.332-73.472 69.332-89.136 77.648-32.77 17.395-96.364-30.37-142.239-25.672-25.015 2.567-110.25 53.625-145.457 79.848-171.898 128.043-259.87 118.426-311.808 133.621-187.067 54.727-276.93 68.61-371.614 110.047-94.683 41.433-193.195 90.8-250.289 117.633Zm0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m877.57 497.488-.238.145-.754 6.894.387-.257-.395.332-.797 7.273.368-.281-.371.304-1.23 11.29q-.808.972-.966 1.98l.016.457q.118.44.183.55.211.466.88.91 1.675.312 2.824-.292.44-.416.664-.879.274-.645.265-1.52c-.015-1.203-.195-4.367-.539-9.503a991 991 0 0 1-.293-7.79q-.11-3.857-.004-9.613m0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m877.758 488.242-.07.145-.211.441c.011-.008.015.043.003.156l-.27.758q.17-.252.263-.023l-.098.148.055.067-.184.359c.031-.012.047.027.05.125l-.187.367q.199-.204.332-.027l-.921 1.422 1.378-1.153-1.394 1.254.004.176-.215.895q.48-.592.656-.715.113-.078.09.133l-.848 1.14-.062.63-.45 1.362.583-.875q.349-.023.347.094l-1.367 2.68-.262.707.004.035 1.68-1.027-.68.644q.035-.017.059.125l1.113-.68-1.136.715-.118.125c.059-.015.067.04.035.168l-.269.16-1.215 1.223-.14.211.21-.262q.113-.03.141.047l2.211-1.363-1.348.93c.137-.028.067.074-.199.304q.053-.022 0 .207l-.285.309-1.367 1.973-.012.097 1.465-1.703q.2-.029.137.149l-1.356 1.578 1.98-1.465-1.066 1.101-.02.043.555-.39-.582.488q.09-.03-.144.293l.082.137-.11.039.008.097-1.242 1.778-.05.398 2.706-2.433-1.238 1.132.074.09-.332.59q.053-.024-.023.188l-.106.093q-.174.304-.109.27l-.195.32-1.61 2.395-.086.285.727-.79.488-.222 2.774-2.312q.492-.375.562-.34l-2.945 2.476.062.055.27-.246c.047-.008.082.016.101.062l-1.125 1.45q.152-.03.11.164l-1.762 2.168-.133.656q3.592-2.878 3.707-2.574l-1.648 1.265q.018-.006 0 .118-.046-.088-.903.734l-.167.172q.07-.025.03.156l-1.405 1.64-.332 1.227 1.777-1.383-1.809 1.497-.11.386 1.825-1.625c.11-.031.16-.008.156.078l-1.418 1.422q.176-.024.13.149l-.884 1.086.52-.477c.074.063.105.098.086.113l-.324.36.418-.008 4.96-3.785-2.898 2.39-2 1.399q11.384.545 11.524.433l-.836-.718-2.325-2.828-.726-1.168-.145-.329 2.52 3.075.121-.043q.355.39.406.254l1.285 1.359-.27-.844-.886-1.941-1.82-2.336 2.906 2.574.067-.601-.641-2.008-.774-1.719c-.015-.113-.007-.168.024-.156l-.3-.668-.84-1.14-.009-.106 1.122 1.21.84 1.075-.153-1.145-1.102-2.418c-.203-.496-.285-.726-.242-.68l-.562-.992c-.012-.05.008-.074.047-.078.02.094-.473-.699-1.47-2.375l-.003-.047 1.188 1.696.128.02 1.586 2.425-.14-1.594-.16-.59-.875-1.464-.547-1.38q-.104-.234-.102-.152-.03-.197 0-.18l-.293-.456.024-.098-.418-.61 1.64 1.805-.101-.777-1.32-2.656-.16-.535-1.282-1.747-.004-.046.602.77 1.613 1.081-.195-.8-.801-.926-.774-1.215.04-.098-.665-1.039q-.029-.305.184-.21l1.309 1.065-.168-.906-.274-.71q-.186.145-1.097-1.055c.19-.164.265-.176.23-.028l.098-.148.129.004c-.016-.11.02-.156.105-.149-.195-.652-.297-.945-.3-.87l-.16-.743ZM937.043 455.453l-.07.145-.211.441c.011-.008.015.043.004.156l-.27.758q.17-.252.262-.023l-.098.148.055.067-.184.359q.047-.019.051.121l-.187.371q.197-.204.332-.027l-.922 1.422 1.379-1.153-1.395 1.254.004.172-.215.899c.32-.399.54-.633.656-.715q.113-.077.09.132l-.847 1.141-.063.625-.45 1.367.583-.875c.234-.02.348.016.348.094l-1.368 2.68-.257.707v.035l1.68-1.027-.68.644q.035-.017.058.125l1.113-.68-1.136.715-.117.125c.058-.015.066.04.035.168l-.27.16-1.215 1.223-.14.211.21-.262q.113-.029.141.043l2.211-1.36-1.347.93q.205-.04-.2.305.053-.022 0 .207l-.285.309-1.367 1.973-.012.097 1.465-1.703q.2-.029.137.148l-1.356 1.579 1.98-1.465-1.066 1.101-.02.04.556-.387-.582.488c.062-.024.011.074-.145.293l.082.137-.11.039.008.097-1.242 1.778-.05.398 2.707-2.433-1.239 1.132.074.09-.332.59q.054-.024-.023.188l-.106.093c-.117.2-.152.293-.105.27l-.2.32-1.605 2.395-.09.285.727-.79.488-.222 2.774-2.312q.492-.376.562-.34l-2.945 2.476.062.055.27-.246q.071-.013.102.062l-1.125 1.45q.15-.029.109.16l-1.762 2.172-.133.656q3.592-2.878 3.707-2.574l-1.648 1.265q.018-.006 0 .118c-.031-.06-.332.187-.902.73l-.168.172q.071-.02.03.16l-1.405 1.64-.332 1.227 1.777-1.383-1.809 1.496-.109.387 1.824-1.625q.163-.052.157.078l-1.418 1.422c.117-.015.16.031.128.149l-.882 1.086.52-.477c.073.063.105.098.085.11l-.324.363.418-.008 4.96-3.785-2.898 2.39-2 1.399q11.384.54 11.524.433l-.836-.718-2.324-2.829-.727-1.168-.144-.332 2.52 3.079.12-.043c.238.261.371.343.406.254l1.286 1.359-.27-.844-.887-1.941-1.82-2.336 2.906 2.574.067-.602-.641-2.007-.773-1.72q-.024-.173.023-.155l-.3-.668-.84-1.145-.008-.101 1.12 1.21.84 1.075-.152-1.145-1.101-2.418c-.203-.496-.286-.726-.243-.68l-.562-.992c-.012-.05.008-.074.047-.078.02.094-.473-.699-1.469-2.375l-.004-.05 1.188 1.699.129.015 1.586 2.43-.141-1.594-.16-.59-.875-1.464-.547-1.383q-.101-.23-.102-.149-.03-.197 0-.18l-.293-.456.024-.098-.418-.61 1.644 1.805-.105-.777-1.32-2.656-.16-.536-1.282-1.746-.004-.046.602.77 1.613 1.081-.195-.8-.801-.926-.773-1.215.039-.098-.664-1.039q-.028-.304.183-.211l1.309 1.066-.164-.906-.278-.71q-.186.14-1.097-1.055c.191-.164.265-.176.23-.028l.098-.148h.129q-.023-.16.105-.145-.291-.983-.3-.87l-.16-.743Zm0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m937.82 474.344-.242.144-.75 6.895.387-.258-.399.328-.793 7.274.368-.278-.371.305-1.23 11.289q-.808.974-.966 1.977l.016.46q.118.44.183.551.211.459.88.91 1.675.306 2.824-.293.44-.415.664-.882.274-.643.265-1.52-.023-1.8-.539-9.5a832 832 0 0 1-.293-7.789q-.11-3.86-.004-9.613M759.188 527.3l-.07.145-.216.442q.022-.013.008.156l-.27.758q.17-.252.262-.024l-.097.149.05.066-.18.36q.047-.019.052.12l-.188.372q.198-.204.332-.028l-.922 1.422 1.38-1.152-1.395 1.254.004.176-.215.894c.316-.398.539-.633.656-.715.074-.05.101-.008.09.133l-.848 1.14-.062.626-.45 1.367.582-.875c.23-.02.348.016.348.094l-1.367 2.68-.262.706v.036l1.684-1.028-.68.645q.035-.017.059.125l1.109-.68-1.133.715-.117.125q.083-.025.031.168l-.265.16-1.215 1.223-.14.21.21-.261q.112-.029.137.043l2.215-1.36-1.348.93q.2-.041-.2.305.054-.022 0 .207l-.284.308-1.368 1.973-.011.098 1.465-1.703q.196-.03.136.148l-1.355 1.578 1.98-1.465-1.07 1.102-.02.043.56-.39-.583.488c.059-.02.012.074-.144.293l.082.136-.11.04.008.097-1.242 1.777-.051.399 2.707-2.434-1.238 1.133.074.09-.332.59q.052-.024-.024.187l-.105.094c-.117.2-.152.293-.11.27l-.195.32-1.609 2.394-.086.285.727-.789.488-.222 2.77-2.313q.496-.375.566-.34l-2.946 2.477.063.055.27-.246q.07-.013.101.062l-1.125 1.45q.152-.03.11.16l-1.762 2.171-.133.657q3.59-2.878 3.707-2.575l-1.648 1.266q.017-.006 0 .117-.047-.085-.903.73l-.168.173q.069-.02.031.16l-1.406 1.64-.332 1.227 1.778-1.383-1.81 1.496-.108.387 1.824-1.625q.164-.052.156.078l-1.418 1.422q.175-.026.129.148l-.883 1.086.52-.476q.113.092.086.109l-.325.363.418-.008 4.961-3.785-2.898 2.391-2 1.398q11.384.54 11.523.434l-.836-.719-2.328-2.828-.726-1.168-.14-.332 2.519 3.078.12-.043q.354.391.407.254l1.285 1.36-.27-.844-.886-1.942-1.82-2.336 2.906 2.575.066-.602-.64-2.008-.774-1.718q-.023-.175.024-.157l-.301-.668-.84-1.144-.012-.102 1.125 1.211.84 1.074-.152-1.144-1.102-2.418c-.203-.496-.285-.727-.242-.68l-.563-.992q-.017-.073.047-.078.028.14-1.468-2.375l-.004-.05 1.187 1.698.13.016 1.585 2.43-.14-1.594-.16-.59-.876-1.465-.547-1.379c-.07-.156-.101-.207-.101-.152-.02-.133-.024-.191 0-.18l-.293-.457.02-.097-.419-.61 1.645 1.805-.102-.777-1.32-2.657-.16-.535-1.281-1.746-.004-.047.601.77 1.614 1.082-.196-.801-.8-.926-.774-1.215.04-.097-.669-1.04q-.023-.304.188-.21l1.308 1.066-.168-.906-.273-.711q-.188.14-1.098-1.055c.192-.164.266-.176.227-.027l.101-.149.13.004q-.024-.165.105-.148-.295-.983-.301-.871l-.16-.742ZM1017.535 419.762l-.07.14-.211.446c.012-.012.016.043.004.156l-.266.758q.165-.252.258-.024l-.098.149.055.066-.184.356q.05-.018.051.125l-.187.37q.201-.203.332-.027l-.918 1.422 1.379-1.152-1.399 1.254.004.172-.215.898q.48-.598.66-.715c.07-.05.102-.008.086.13l-.843 1.144-.067.625-.445 1.367.582-.875q.343-.03.348.094l-1.371 2.68-.258.706v.036l1.68-1.032-.68.649q.035-.017.058.12l1.114-.675-1.133.71-.121.13q.087-.025.035.168l-.266.16-1.219 1.223-.14.21.21-.261q.112-.029.141.043l2.215-1.36-1.351.93q.205-.041-.2.305.053-.023.004.207l-.289.308-1.367 1.973-.012.098 1.47-1.703q.193-.03.136.148l-1.36 1.578 1.981-1.465-1.066 1.098-.02.043.555-.39-.578.492q.086-.036-.149.293l.082.136-.11.04.009.097-1.239 1.777-.054.395 2.707-2.43-1.239 1.133.075.09-.332.59q.052-.023-.024.183l-.101.094q-.179.304-.11.273l-.199.32-1.605 2.391-.09.29.726-.794.489-.218 2.773-2.313q.492-.375.562-.34l-2.945 2.473.063.059.27-.247q.073-.012.1.063l-1.124 1.445q.153-.022.11.164l-1.759 2.172-.136.653q3.593-2.872 3.707-2.575l-1.649 1.27q.018-.012 0 .117c-.027-.058-.328.188-.902.73l-.168.172q.071-.021.031.16l-1.406 1.641-.332 1.227 1.777-1.383-1.804 1.496-.114.387 1.824-1.63q.163-.046.157.083l-1.418 1.422q.175-.029.129.148l-.883 1.086.523-.476q.11.092.086.109l-.328.363.418-.008 4.961-3.785-2.898 2.387-2 1.402q11.384.54 11.523.434l-.836-.719-2.324-2.828-.727-1.168-.144-.332 2.523 3.078.117-.043q.359.388.407.254l1.289 1.36-.27-.844-.89-1.946-1.82-2.336 2.91 2.575.062-.598-.64-2.008-.774-1.719q-.018-.174.023-.156l-.3-.668-.837-1.144-.011-.102 1.12 1.207.845 1.078-.157-1.144-1.101-2.418q-.305-.75-.242-.684l-.563-.992q-.013-.07.05-.074.027.136-1.472-2.375l-.004-.05 1.188 1.694.133.02 1.582 2.43-.137-1.594-.16-.59-.88-1.465-.546-1.383q-.1-.228-.102-.152-.03-.193 0-.176l-.293-.46.024-.098-.418-.606 1.644 1.805-.101-.777-1.324-2.657-.16-.535-1.278-1.746-.008-.047.602.77 1.613 1.082-.191-.801-.805-.926-.773-1.215.039-.097-.664-1.04q-.03-.305.187-.21l1.305 1.066-.164-.906-.278-.711q-.182.14-1.097-1.055c.191-.168.265-.176.23-.027l.098-.149h.129c-.016-.105.02-.156.105-.144q-.291-.983-.3-.871l-.16-.746ZM370.438 473.434l-.075.14-.21.442q.022-.012.003.16l-.265.758q.163-.251.261-.028l-.101.153.054.066-.18.355c.028-.011.048.032.048.125l-.184.368q.195-.2.332-.024l-.922 1.422 1.38-1.152-1.4 1.254.005.172-.215.898q.48-.598.66-.715.107-.076.086.129l-.844 1.145-.066.625-.446 1.363.582-.875q.347-.025.348.098l-1.371 2.675-.258.711v.035l1.684-1.03-.684.648q.04-.019.059.12l1.113-.675-1.133.71-.12.13q.087-.025.034.168l-.265.156-1.22 1.226-.14.208.211-.258q.111-.029.14.043l2.216-1.36-1.352.93q.205-.041-.2.305.053-.023.005.207l-.29.304-1.363 1.973-.015.102 1.469-1.707q.193-.023.136.148l-1.36 1.582 1.985-1.465-1.07 1.098-.02.043.555-.39-.578.491q.087-.034-.148.293l.082.137-.11.04.008.097-1.238 1.773-.051.399 2.703-2.43-1.234 1.133.07.09-.332.586q.052-.018-.023.187l-.102.094q-.177.304-.11.273l-.199.32-1.605 2.391-.09.29.727-.794.488-.218 2.773-2.313q.493-.375.563-.34l-2.945 2.473.062.058.27-.246q.076-.012.105.063l-1.129 1.445q.154-.022.11.164l-1.758 2.172-.137.652q3.594-2.872 3.707-2.574l-1.648 1.27q.017-.012 0 .117c-.028-.059-.329.187-.903.73l-.168.172q.072-.021.032.16l-1.407 1.641-.328 1.227 1.774-1.383-1.805 1.496-.113.387 1.824-1.63q.166-.046.156.083l-1.418 1.422q.175-.03.13.148l-.884 1.086.524-.477q.11.093.086.11l-.325.363.418-.008 4.957-3.785-2.898 2.387-2 1.402c7.59.36 11.434.504 11.523.43l-.832-.715-2.328-2.828-.726-1.168-.14-.332 2.519 3.078.117-.043q.358.388.406.254l1.29 1.36-.27-.844-.891-1.946-1.82-2.336 2.91 2.575.062-.598-.64-2.008-.774-1.719q-.018-.175.024-.156l-.301-.668-.836-1.144-.012-.102 1.121 1.207.844 1.078-.152-1.144-1.102-2.418q-.31-.75-.246-.684l-.562-.992q-.013-.072.05-.074c.016.09-.472-.7-1.472-2.375l-.004-.051 1.191 1.695.13.02 1.581 2.43-.137-1.594-.16-.594-.879-1.461-.547-1.383c-.066-.152-.101-.203-.097-.152q-.035-.194-.004-.176l-.293-.46.023-.099-.418-.605 1.645 1.805-.102-.778-1.324-2.656-.16-.539-1.277-1.742-.008-.047.605.77 1.614 1.082-.196-.801-.8-.926-.778-1.215.043-.098-.668-1.039q-.023-.305.188-.21l1.308 1.066-.168-.906-.277-.711q-.182.14-1.098-1.055.289-.25.23-.031l.098-.145h.13q-.024-.159.105-.148-.288-.98-.301-.867l-.156-.746ZM304.633 418.676l-.07.144-.211.442c.011-.008.015.043.003.156l-.265.758q.164-.252.258-.024l-.098.149.055.066-.184.36q.046-.019.05.12l-.187.372q.199-.204.332-.028l-.918 1.422 1.375-1.152-1.394 1.254.004.172-.215.898q.48-.598.656-.715.113-.076.09.133l-.848 1.14-.062.626-.445 1.367.582-.875c.23-.02.343.016.343.094l-1.367 2.68-.258.706v.036l1.68-1.028-.68.645c.024-.012.043.031.059.12l1.113-.675-1.133.715-.12.125q.087-.025.034.168l-.269.16-1.215 1.223-.14.21.21-.261q.113-.029.141.043l2.215-1.36-1.352.93q.205-.041-.199.305.053-.023 0 .207l-.285.308-1.367 1.973-.012.098 1.465-1.703q.2-.03.137.148l-1.356 1.578 1.98-1.465-1.066 1.102-.02.039.555-.387-.578.489q.087-.036-.148.293l.082.136-.11.04.008.097-1.238 1.777-.055.399 2.707-2.434-1.238 1.133.074.09-.332.59q.053-.024-.023.187l-.106.094c-.117.2-.152.293-.105.27l-.2.32-1.605 2.394-.09.285.727-.793.488-.218 2.774-2.313q.492-.375.562-.34l-2.945 2.477.062.055.27-.246q.074-.013.101.062l-1.125 1.45q.152-.03.11.16l-1.762 2.171-.133.657q3.594-2.878 3.707-2.575l-1.648 1.266q.018-.006 0 .117c-.031-.058-.328.188-.902.73l-.168.173q.07-.02.03.16l-1.405 1.64-.332 1.227 1.777-1.383-1.809 1.496-.11.387 1.825-1.625q.164-.052.156.078l-1.418 1.422q.176-.026.13.148l-.884 1.086.52-.476q.113.092.086.109l-.324.363.418-.007 4.96-3.786-2.898 2.391-2 1.398q11.384.54 11.524.434l-.836-.719-2.325-2.828-.726-1.168-.145-.332 2.52 3.078.121-.043c.238.262.371.344.406.254l1.285 1.36-.27-.844-.886-1.942-1.82-2.336 2.906 2.57.067-.597-.641-2.008-.774-1.718q-.022-.175.024-.157l-.3-.668-.84-1.144-.009-.102 1.122 1.211.84 1.074-.153-1.144-1.102-2.418q-.305-.75-.242-.68l-.562-.992c-.012-.05.008-.074.047-.078.02.094-.473-.7-1.47-2.375l-.003-.05 1.188 1.698.128.016 1.586 2.43-.14-1.594-.157-.59-.878-1.465-.547-1.383q-.101-.23-.102-.148-.03-.198 0-.18l-.293-.457.024-.097-.418-.61 1.644 1.805-.105-.777-1.32-2.657-.16-.535-1.282-1.746-.004-.047.602.77 1.613 1.082-.195-.801-.801-.926-.774-1.215.04-.097-.665-1.04q-.029-.304.184-.21l1.309 1.066-.164-.906-.278-.711c-.125.094-.488-.258-1.098-1.055.192-.164.266-.176.231-.027l.098-.149h.129c-.016-.105.02-.156.105-.144q-.291-.983-.3-.871l-.16-.742ZM569.5 547.344l-.074.144-.211.442q.021-.013.004.156l-.266.758c.11-.168.2-.176.262-.024l-.102.149.055.07-.18.356q.047-.02.051.125l-.187.367c.128-.137.242-.145.332-.024l-.922 1.418 1.379-1.152-1.399 1.254.004.176-.215.894q.48-.593.66-.71.111-.084.086.128l-.843 1.14-.063.63-.45 1.363.583-.875q.347-.024.348.094l-1.372 2.68-.257.706v.036l1.683-1.028-.683.645q.041-.017.058.125l1.114-.68-1.133.715-.117.125c.054-.016.066.043.03.168l-.265.16-1.219 1.227-.14.207.21-.262c.079-.02.122-.004.141.047l2.215-1.364-1.347.93q.2-.041-.204.305.053-.023.004.21l-.289.305-1.363 1.973-.016.098 1.47-1.703q.193-.03.136.148l-1.36 1.578 1.985-1.465-1.07 1.102-.02.043.559-.39-.582.491q.089-.034-.149.29l.082.136-.105.04.004.097-1.239 1.777-.05.399 2.703-2.434-1.235 1.133.07.09-.331.59q.054-.023-.02.187l-.105.094q-.176.305-.11.27l-.2.32-1.605 2.394-.085.285.726-.789.488-.222 2.77-2.313q.491-.375.566-.34l-2.945 2.477.063.055.269-.246q.071-.01.102.062l-1.13 1.45q.158-.03.11.163l-1.758 2.168-.136.657c2.398-1.918 3.632-2.778 3.71-2.575l-1.652 1.266q.024-.006 0 .117-.04-.084-.902.735l-.168.171q.071-.024.031.157l-1.406 1.64-.328 1.227 1.773-1.383-1.805 1.496-.113.39 1.824-1.628c.11-.031.164-.008.157.078l-1.414 1.422q.17-.023.125.148l-.88 1.086.52-.476c.074.062.102.097.086.113l-.324.36.418-.009 4.96-3.785-2.898 2.39-2 1.4c7.586.363 11.43.507 11.52.433l-.832-.719-2.328-2.828-.727-1.168-.14-.328 2.52 3.074.116-.039q.359.386.407.25l1.289 1.36-.27-.844-.89-1.942-1.817-2.336 2.906 2.575.063-.602-.64-2.004-.77-1.722q-.024-.172.023-.157l-.305-.664-.836-1.144-.011-.106 1.12 1.211.845 1.074-.153-1.144-1.101-2.418q-.311-.744-.246-.68l-.563-.992q-.013-.073.05-.078c.016.094-.472-.7-1.472-2.375v-.047l1.188 1.695.129.02 1.582 2.426-.137-1.594-.16-.59-.875-1.465-.547-1.379c-.07-.156-.106-.203-.102-.152q-.034-.199-.004-.176l-.293-.46.024-.098-.418-.606 1.644 1.8-.101-.776-1.324-2.657-.16-.535-1.278-1.746-.004-.047.602.77 1.613 1.082-.195-.801-.801-.926-.777-1.215.043-.097-.668-1.04q-.023-.305.187-.21l1.309 1.066-.168-.902-.278-.715q-.182.147-1.097-1.055c.191-.164.27-.176.23-.027l.102-.149.129.004c-.016-.11.02-.156.105-.148q-.294-.98-.3-.871l-.16-.742ZM481.695 520.848l-.07.144-.215.442c.016-.008.016.046.008.156l-.27.762q.17-.251.262-.028l-.098.149.051.07-.18.355q.046-.015.051.125l-.187.368q.198-.2.332-.024l-.922 1.418 1.379-1.152-1.395 1.254.004.176-.215.898c.317-.399.54-.637.657-.715.074-.055.101-.008.09.129l-.848 1.145-.063.625-.449 1.363.582-.875q.346-.025.348.097l-1.367 2.676-.262.707v.04l1.684-1.032-.68.649q.035-.019.058.12l1.11-.675-1.133.71-.117.13c.055-.02.066.039.031.168l-.266.156-1.214 1.226-.141.207.21-.261q.113-.03.138.047l2.214-1.36-1.347.93q.2-.047-.2.305c.036-.016.036.05 0 .207l-.285.304-1.367 1.973-.011.102 1.464-1.707c.133-.016.176.03.137.148l-1.355 1.582 1.98-1.469-1.07 1.102-.02.043.559-.39-.582.491q.089-.034-.145.293l.082.133-.109.04.008.097-1.242 1.777-.051.399 2.707-2.434-1.238 1.133.074.09-.332.59q.053-.018-.024.187l-.105.094q-.174.304-.11.273l-.195.317-1.61 2.394-.085.29.726-.794.489-.222 2.77-2.309q.496-.38.566-.34l-2.946 2.473.063.058.27-.25c.046-.003.081.016.1.067l-1.124 1.445q.151-.022.11.164l-1.762 2.172-.133.652c2.394-1.918 3.629-2.773 3.707-2.574l-1.649 1.27q.018-.012 0 .117-.046-.089-.902.73l-.168.172q.069-.02.031.157l-1.406 1.644-.332 1.227 1.777-1.383-1.808 1.496-.11.387 1.825-1.63q.163-.044.156.079l-1.418 1.422q.176-.024.129.152l-.883 1.086.52-.477c.074.059.105.098.085.11l-.324.36.418-.005 4.961-3.785-2.898 2.387-2 1.398q11.384.546 11.523.434l-.836-.719-2.328-2.828-.726-1.164-.141-.332 2.52 3.078.12-.043q.353.388.407.254l1.285 1.355-.27-.84-.886-1.945-1.82-2.336 2.906 2.575.066-.598-.64-2.008-.774-1.723q-.024-.17.023-.152l-.3-.668-.84-1.144-.012-.106 1.125 1.211.84 1.078-.152-1.148-1.102-2.414q-.305-.75-.242-.684l-.563-.992q-.017-.072.047-.074c.02.09-.473-.7-1.469-2.375l-.003-.051 1.187 1.695.129.02 1.586 2.43-.14-1.594-.16-.594-.876-1.465-.547-1.379q-.103-.228-.101-.152c-.02-.13-.024-.188 0-.176l-.293-.46.02-.099-.419-.605 1.645 1.805-.102-.778-1.32-2.656-.16-.539-1.282-1.742-.003-.047.601.77 1.613 1.082-.195-.805-.8-.922-.774-1.219.039-.094-.668-1.039q-.024-.31.187-.21l1.31 1.066-.169-.906-.273-.715q-.189.145-1.098-1.051.286-.25.227-.031l.101-.149.129.004q-.023-.159.106-.148-.295-.979-.301-.871l-.16-.742Zm0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m482.137 539.715-.242.14-.75 6.895.386-.258-.394.332-.797 7.274.367-.282-.371.305-1.23 11.29q-.809.978-.965 1.98l.015.457q.118.44.184.55.21.465.879.91 1.675.312 2.824-.292.44-.416.664-.88c.184-.429.27-.937.266-1.519q-.024-1.798-.54-9.504a836 836 0 0 1-.292-7.785q-.111-3.86-.004-9.613M396.68 419.18l-.184.414-.543 1.265c.035-.023.047.121.027.442l-.66 2.164c.293-.485.54-.516.73-.102l-.257.43.156.187-.465 1.024q.128-.054.157.344l-.485 1.054q.532-.59.93-.109l-2.418 4.102 3.738-3.403-3.777 3.692.031.488-.496 2.547q1.276-1.73 1.766-2.086.298-.232.261.355l-2.242 3.317-.105 1.765-1.098 3.887 1.535-2.527q.97-.113.989.226l-3.532 7.692-.644 2.02.004.1 4.605-3.093-1.836 1.898q.099-.051.18.336l3.043-2.035-3.102 2.14-.316.368q.235-.076.113.473l-.73.476-3.278 3.586-.37.602.566-.758q.309-.094.394.113l6.067-4.09-3.688 2.774q.567-.142-.523.883c.097-.047.105.144.03.582l-.773.894-3.605 5.707-.023.281 3.921-4.968q.547-.095.403.402l-3.633 4.602 5.398-4.356-2.87 3.223-.051.12 1.515-1.163-1.57 1.45q.241-.106-.38.839l.247.371-.3.121.03.277-3.273 5.141-.098 1.125 7.317-7.16-3.344 3.332.215.242-.86 1.695c.094-.043.083.133-.042.532l-.286.273q-.455.878-.273.777l-.52.922-4.23 6.918-.211.82 1.945-2.312 1.348-.683 7.52-6.825q1.336-1.119 1.543-1.02l-7.985 7.305.184.149.726-.723q.206-.04.293.164l-2.996 4.203q.435-.094.328.446l-4.687 6.312-.305 1.856q9.763-8.513 10.121-7.68l-4.484 3.762c.035-.02.035.09.012.328q-.135-.24-2.45 2.164l-.453.504q.198-.071.11.437l-3.762 4.782-.781 3.488 4.828-4.098-4.903 4.422-.265 1.102 4.933-4.793q.456-.154.45.207l-3.817 4.164c.324-.063.453.074.38.402l-2.353 3.16 1.41-1.402q.323.245.25.3l-.867 1.055 1.172-.07 13.496-11.23-7.863 7.058-5.457 4.172c21.375.117 32.192.067 32.442-.148l-2.434-1.922-6.871-7.676-2.184-3.191-.437-.914 7.449 8.351.328-.133c.7.7 1.09.918 1.176.664l3.777 3.664-.86-2.336-2.726-5.359-5.394-6.348 8.48 6.891.11-1.691-2.04-5.57-2.374-4.743q-.083-.484.046-.441l-.925-1.836-2.493-3.121-.043-.29 3.297 3.27 2.496 2.922-.566-3.2-3.383-6.663q-.954-2.062-.765-1.887l-1.7-2.723q-.046-.2.13-.218.093.385-4.415-6.5l-.015-.141 3.539 4.625.367.04 4.742 6.64-.578-4.469-.52-1.64-2.64-4.012-1.7-3.817q-.316-.635-.3-.414-.116-.55-.028-.496l-.878-1.258.054-.277-1.25-1.656 4.836 4.875-.379-2.172-4.031-7.313-.512-1.488-3.804-4.754-.02-.129 1.785 2.09 4.664 2.852-.644-2.23-2.364-2.505-2.32-3.324.102-.281-1.996-2.84c-.07-.57.093-.777.5-.617l3.804 2.843-.578-2.523-.86-1.969q-.502.423-3.21-2.836.774-.732.64-.105l.262-.43.363-.008c-.054-.3.036-.441.282-.425q-.938-2.727-.95-2.41l-.539-2.075Zm0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m400.184 448.105-.657.43-1.3 19.465 1.062-.77-1.078.98-1.371 20.54 1-.828-1.012.894-2.121 31.883q-2.156 2.836-2.473 5.68l.094 1.289q.387 1.219.586 1.52.64 1.276 2.574 2.46 4.751.664 7.903-1.164 1.194-1.22 1.77-2.55.685-1.842.562-4.305-.275-5.058-2.641-26.645-1.007-11.976-1.75-21.859-.767-10.835-1.148-27.02M1405.234 215.75l-.183.41-.547 1.266q.059-.035.031.441l-.66 2.164c.293-.484.535-.515.73-.101l-.257.433.156.184-.465 1.023q.128-.054.156.344l-.484 1.059q.532-.597.93-.11l-2.418 4.098 3.738-3.399-3.777 3.688.03.488-.495 2.547q1.272-1.728 1.765-2.086.299-.23.262.356l-2.242 3.316-.106 1.766-1.097 3.89 1.535-2.53q.966-.113.988.226l-3.531 7.691-.648 2.02.007.101 4.606-3.094-1.836 1.899q.098-.053.18.34l3.043-2.04-3.102 2.141-.32.371q.24-.081.117.47l-.73.476-3.278 3.586-.371.605.562-.762q.31-.092.399.114l6.062-4.09-3.683 2.773q.568-.141-.524.883.143-.072.028.582l-.77.895-3.605 5.707-.024.28 3.922-4.964c.363-.066.5.066.399.398l-3.63 4.602 5.4-4.355-2.872 3.222-.05.121 1.515-1.164-1.57 1.45q.241-.106-.38.843l.247.367-.301.122.031.277-3.273 5.14-.098 1.125 7.313-7.16-3.34 3.332.215.246-.864 1.696q.148-.064-.039.527l-.285.274q-.456.877-.273.777l-.52.922-4.23 6.918-.215.82 1.949-2.312 1.348-.68 7.515-6.824c.895-.746 1.41-1.09 1.547-1.024l-7.984 7.305.18.148.73-.722c.133-.028.234.027.293.164l-2.996 4.203c.289-.063.394.086.328.445l-4.688 6.313-.304 1.855q9.763-8.514 10.12-7.676l-4.484 3.758q.049-.03.008.328-.13-.236-2.445 2.164l-.453.504c.129-.047.168.098.105.438l-3.757 4.785-.782 3.488 4.824-4.101-4.898 4.421-.27 1.102 4.938-4.793c.305-.101.453-.035.45.207l-3.817 4.164q.486-.093.379.406l-2.352 3.157 1.406-1.403c.22.164.301.262.254.301l-.867 1.055 1.172-.07 13.496-11.231-7.867 7.059-5.453 4.171q32.064.176 32.441-.148l-2.433-1.922-6.875-7.672-2.18-3.195-.438-.914 7.45 8.351.328-.132q1.048 1.05 1.176.664l3.777 3.664-.86-2.336-2.726-5.36-5.395-6.347 8.48 6.89.106-1.69-2.035-5.567-2.375-4.746c-.054-.32-.039-.47.047-.438l-.926-1.84-2.492-3.117-.043-.293 3.297 3.27 2.496 2.925-.566-3.203-3.383-6.664q-.954-2.062-.766-1.887l-1.699-2.718q-.046-.205.129-.223.09.386-4.414-6.5l-.016-.14 3.54 4.624.367.04 4.742 6.64-.578-4.465-.524-1.644-2.637-4.012-1.699-3.816q-.315-.632-.304-.414-.112-.55-.024-.497l-.879-1.257.055-.278-1.25-1.656 4.836 4.875-.38-2.172-4.03-7.312-.512-1.489-3.805-4.75-.02-.132 1.786 2.09 4.664 2.851-.645-2.23-2.363-2.504-2.324-3.325.105-.28-1.996-2.84q-.107-.858.5-.614l3.801 2.844-.574-2.528-.863-1.968q-.5.421-3.207-2.836.774-.733.64-.106l.262-.43.363-.007q-.086-.45.277-.426-.936-2.722-.949-2.41l-.535-2.07ZM1035.16 372.512l-.656.433-1.3 19.465 1.062-.77-1.079.977-1.37 20.54 1-.829-1.012.899-2.121 31.878q-2.157 2.844-2.473 5.68l.094 1.29q.386 1.224.586 1.523.639 1.275 2.574 2.457 4.75.667 7.902-1.16c.797-.817 1.387-1.665 1.77-2.555q.685-1.84.562-4.3c-.183-3.372-1.066-12.255-2.64-26.65-.672-7.98-1.254-15.269-1.75-21.859q-.768-10.834-1.149-27.02m0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m1035.867 343.504-.183.41-.543 1.27q.06-.037.03.437l-.66 2.164q.44-.722.731-.098l-.262.43.16.184-.464 1.023c.082-.035.137.078.152.344l-.48 1.059q.532-.594.93-.11l-2.419 4.102 3.735-3.403-3.778 3.688.036.492-.5 2.547q1.277-1.735 1.77-2.086c.194-.156.284-.039.26.356l-2.241 3.312-.106 1.766-1.098 3.89 1.536-2.527q.966-.111.984.223l-3.531 7.691-.645 2.02.004.101 4.61-3.09-1.84 1.899q.104-.052.18.336l3.046-2.036-3.101 2.137-.32.371q.241-.076.113.473l-.73.473-3.274 3.59-.371.601.562-.758q.31-.094.399.11l6.062-4.086-3.684 2.773c.376-.098.204.2-.523.879.094-.047.106.148.027.586l-.77.894-3.605 5.707-.023.282 3.918-4.97q.55-.094.402.403l-3.629 4.602 5.399-4.356-2.875 3.22-.047.12 1.516-1.16-1.575 1.45c.164-.071.04.206-.375.84l.246.37-.3.121.027.274-3.27 5.144-.101 1.125 7.316-7.16-3.34 3.332.215.242-.863 1.696q.146-.065-.043.527l-.281.277q-.46.875-.274.778l-.52.922-4.23 6.918-.214.816 1.949-2.313 1.347-.68 7.516-6.823q1.342-1.12 1.547-1.02l-7.984 7.3.18.153.73-.726q.198-.038.293.168l-2.996 4.203c.289-.063.394.086.324.445l-4.688 6.309-.3 1.855q9.759-8.507 10.12-7.676l-4.488 3.758q.053-.024.012.328-.13-.233-2.445 2.164l-.453.504q.193-.07.105.442l-3.758 4.78-.785 3.49 4.828-4.099-4.898 4.418-.27 1.106 4.938-4.793c.304-.106.453-.035.445.203l-3.812 4.164c.324-.058.449.074.375.406l-2.348 3.16 1.406-1.402c.219.16.3.262.254.297l-.867 1.055 1.172-.07 13.496-11.227-7.867 7.058-5.453 4.172c21.375.114 32.187.067 32.437-.152l-2.43-1.918-6.875-7.676-2.18-3.195-.437-.91 7.45 8.347.328-.128q1.049 1.047 1.171.66l3.778 3.668-.856-2.34-2.726-5.356-5.395-6.351 8.48 6.89.106-1.691-2.035-5.566-2.375-4.743q-.083-.487.047-.441l-.926-1.84-2.492-3.117-.043-.29 3.297 3.27 2.492 2.922-.563-3.199-3.382-6.664q-.954-2.068-.77-1.89l-1.695-2.72q-.046-.204.129-.222c.058.258-1.41-1.906-4.414-6.5l-.016-.14 3.54 4.628.366.035 4.742 6.641-.582-4.465-.52-1.64-2.636-4.016-1.7-3.813q-.316-.636-.304-.418-.111-.546-.023-.496l-.88-1.257.052-.278-1.246-1.656 4.836 4.879-.38-2.176-4.03-7.308-.516-1.489-3.801-4.754-.02-.132 1.786 2.093 4.66 2.852-.64-2.235-2.364-2.503-2.324-3.325.105-.277-1.996-2.84c-.074-.57.094-.777.496-.617l3.805 2.844-.574-2.528-.864-1.968q-.499.427-3.207-2.832.774-.732.64-.11l.263-.426.363-.007q-.087-.453.277-.43-.937-2.72-.949-2.41l-.535-2.07ZM1405.453 262.906l-.656.43-1.3 19.465 1.062-.77-1.079.98-1.37 20.54 1-.828-1.012.894-2.121 31.883c-1.438 1.89-2.258 3.785-2.473 5.68l.094 1.289q.386 1.219.586 1.52.639 1.276 2.574 2.46 4.754.664 7.902-1.164 1.195-1.22 1.77-2.55c.457-1.227.644-2.665.562-4.301q-.274-5.057-2.64-26.649-1.007-11.975-1.75-21.86-.768-10.834-1.149-27.019M1440.898 248.668l-.183.414-.543 1.266c.039-.024.05.12.031.441l-.66 2.164q.439-.725.73-.101l-.261.43.16.187-.465 1.023c.082-.035.137.078.152.344l-.48 1.055q.532-.591.93-.11l-2.418 4.102 3.734-3.403-3.777 3.692.035.488-.5 2.547q1.278-1.728 1.765-2.086.301-.232.266.356l-2.242 3.316-.106 1.766-1.097 3.886 1.535-2.527q.967-.112.984.227l-3.531 7.69-.645 2.02.004.102 4.61-3.094-1.84 1.899q.104-.052.18.336l3.046-2.036-3.101 2.141-.32.367q.241-.076.113.473l-.73.477-3.274 3.585-.371.602.562-.758q.31-.092.399.113l6.062-4.09-3.683 2.774c.375-.094.203.2-.524.883.094-.047.106.144.028.582l-.77.894-3.605 5.707-.024.282 3.918-4.969q.55-.095.403.402l-3.63 4.602 5.4-4.356-2.876 3.223-.047.121 1.516-1.164-1.574 1.45q.246-.106-.375.84l.246.37-.301.121.027.278-3.27 5.14-.1 1.125 7.316-7.16-3.34 3.332.21.242-.859 1.696q.146-.065-.043.531l-.28.273c-.306.586-.4.844-.274.778l-.52.922-4.23 6.918-.215.82 1.949-2.313 1.348-.68 7.515-6.827q1.342-1.12 1.547-1.02l-7.984 7.305.18.148.73-.722q.199-.042.293.164l-2.996 4.203q.428-.094.324.445l-4.687 6.313-.301 1.855q9.76-8.512 10.12-7.68l-4.487 3.762q.053-.03.011.328-.13-.239-2.445 2.164l-.453.504q.193-.071.105.438l-3.761 4.78-.782 3.49 4.828-4.099-4.898 4.422-.27 1.102 4.938-4.793q.457-.154.445.207l-3.812 4.164q.486-.091.375.402l-2.348 3.16 1.406-1.402q.323.244.254.301l-.867 1.055 1.172-.07 13.496-11.231-7.867 7.058-5.457 4.172q32.067.176 32.441-.148l-2.43-1.922-6.874-7.676-2.18-3.191-.438-.914 7.45 8.351.328-.132q1.049 1.047 1.172.664l3.777 3.664-.855-2.336-2.727-5.36-5.395-6.347 8.48 6.89.106-1.691-2.035-5.57-2.375-4.743c-.054-.324-.039-.468.047-.441l-.926-1.836-2.492-3.121-.043-.29 3.297 3.27 2.492 2.922-.562-3.199-3.383-6.664c-.637-1.375-.89-2.004-.77-1.887l-1.695-2.722q-.046-.2.129-.22.087.387-4.414-6.5l-.016-.14 3.54 4.625.367.04 4.742 6.64-.582-4.465-.52-1.644-2.637-4.012-1.699-3.817c-.21-.421-.312-.562-.304-.414q-.113-.549-.024-.496l-.879-1.257.05-.278-1.245-1.656 4.836 4.875-.38-2.172-4.03-7.312-.516-1.489-3.8-4.754-.02-.129 1.785 2.09 4.66 2.852-.64-2.23-2.364-2.505-2.324-3.324.105-.281-1.996-2.84q-.109-.856.496-.617l3.805 2.844-.574-2.524-.863-1.968q-.5.421-3.207-2.836.77-.733.64-.106l.262-.43.36-.007q-.083-.45.28-.426-.936-2.726-.949-2.41l-.535-2.075ZM1378.48 290.637l-.183.414-.543 1.265q.059-.036.031.442l-.66 2.164c.293-.485.535-.516.73-.102l-.261.43.16.188-.469 1.023q.13-.054.156.344l-.48 1.054q.532-.59.93-.109l-2.418 4.102 3.734-3.399-3.777 3.688.035.488-.5 2.547q1.278-1.73 1.765-2.086.301-.232.266.355l-2.242 3.317-.106 1.765-1.097 3.887 1.531-2.527q.972-.113.988.226l-3.53 7.692-.645 2.02.003.1 4.606-3.093-1.836 1.898q.104-.051.18.336l3.047-2.035-3.102 2.14-.32.368c.16-.05.195.106.113.473l-.73.476-3.274 3.586-.371.602.562-.758q.31-.093.399.113l6.062-4.09-3.683 2.774c.375-.094.203.2-.528.883.098-.047.11.144.032.582l-.77.894-3.605 5.707-.024.281 3.918-4.968q.55-.095.403.402l-3.63 4.602 5.4-4.356-2.876 3.223-.047.12 1.516-1.163-1.574 1.45q.246-.106-.375.839l.246.371-.301.121.027.277-3.27 5.141-.1 1.125 7.316-7.16-3.34 3.332.21.246-.859 1.695q.146-.069-.043.528l-.28.273c-.306.586-.4.844-.274.777l-.52.922-4.23 6.918-.215.82 1.949-2.312 1.348-.68 7.515-6.828q1.342-1.119 1.547-1.02l-7.988 7.305.184.149.726-.723q.204-.04.297.164l-2.996 4.203q.428-.094.324.446l-4.687 6.312-.301 1.856q9.76-8.513 10.12-7.68l-4.487 3.762q.053-.03.011.328-.13-.24-2.445 2.164l-.457.504q.198-.071.11.437l-3.762 4.782-.782 3.488 4.829-4.098-4.899 4.422-.27 1.102 4.938-4.793c.3-.102.453-.035.445.207l-3.812 4.164c.324-.063.45.074.375.402l-2.348 3.16 1.406-1.402q.323.244.254.3l-.87 1.055 1.175-.07 13.496-11.23-7.867 7.058-5.457 4.172q32.067.175 32.441-.148l-2.43-1.922-6.874-7.676-2.18-3.191-.438-.914 7.45 8.351.328-.133q1.049 1.05 1.172.664l3.777 3.664-.855-2.336-2.727-5.359-5.395-6.348 8.48 6.891.106-1.691-2.035-5.57-2.375-4.743q-.082-.485.047-.441l-.926-1.836-2.492-3.121-.043-.29 3.297 3.27 2.492 2.922-.562-3.2-3.383-6.663c-.637-1.375-.89-2.004-.77-1.887l-1.695-2.723q-.052-.2.129-.218.087.385-4.414-6.5l-.016-.14 3.54 4.624.367.04 4.738 6.64-.578-4.465-.52-1.645-2.637-4.011-1.699-3.817q-.315-.635-.304-.414-.112-.55-.024-.496l-.879-1.258.051-.277-1.246-1.656 4.836 4.875-.38-2.172-4.03-7.313-.516-1.488-3.8-4.754-.02-.129 1.781 2.09 4.664 2.852-.64-2.23-2.364-2.505-2.324-3.324.101-.281-1.992-2.84q-.109-.856.496-.617l3.805 2.844-.574-2.524-.863-1.969q-.502.422-3.207-2.836.77-.732.64-.105l.262-.43.36-.008q-.083-.45.28-.425-.936-2.724-.949-2.41l-.535-2.07ZM997.89 397.336l-.109.258-.328.785q.035-.024.024.27l-.395 1.34q.265-.45.45-.067l-.157.27.098.113-.282.632q.078-.035.098.211l-.293.657q.328-.368.574-.075l-1.468 2.547 2.289-2.12-2.313 2.296.024.305-.29 1.574c.516-.719.88-1.148 1.079-1.297.12-.094.175-.027.164.215l-1.367 2.063-.051 1.09-.657 2.406.934-1.57q.598-.075.61.132l-2.133 4.77-.387 1.25.004.062 2.824-1.933-1.121 1.18c.043-.02.078.046.113.206l1.867-1.273-1.902 1.34-.195.23c.097-.035.125.063.074.29l-.45.296-1.995 2.234-.227.375.344-.472q.187-.058.246.066l3.715-2.558-2.254 1.734q.346-.093-.32.547.087-.046.023.36l-.473.558-2.187 3.543-.016.172 2.39-3.086q.34-.064.25.242l-2.21 2.863 3.305-2.722-1.754 2.007-.032.075.93-.727-.96.906q.147-.072-.227.52l.152.226-.188.078.024.168-1.988 3.196-.055.695 4.473-4.465-2.043 2.078.132.149-.52 1.05q.09-.04-.023.325l-.171.176q-.282.54-.164.48l-.317.57-2.57 4.297-.125.508 1.187-1.441.828-.426 4.598-4.262c.547-.465.863-.68.945-.637l-4.882 4.555.113.094.445-.453q.124-.026.184.101l-1.824 2.614c.175-.043.246.05.203.27l-2.856 3.925-.172 1.148q5.97-5.315 6.2-4.8l-2.747 2.347q.031-.018.008.203-.082-.147-1.496 1.352l-.277.312q.117-.046.07.27l-2.293 2.976-.46 2.157 2.952-2.559-2.996 2.758-.16.684 3.016-2.989q.28-.1.281.121l-2.332 2.598q.303-.064.238.246l-1.433 1.965.863-.875q.199.147.156.184l-.531.656.726-.051 8.262-7.016-4.812 4.407-3.344 2.609q19.794-.088 20.023-.293l-1.511-1.168-4.29-4.695-1.367-1.961-.277-.559 4.652 5.11.2-.086q.655.644.73.402l2.356 2.238-.547-1.437-1.715-3.29-3.367-3.886 5.273 4.203.059-1.047-1.293-3.422-1.492-2.914c-.04-.199-.028-.289.023-.273l-.582-1.129-1.559-1.91-.027-.176 2.055 1.996 1.558 1.79-.367-1.973-2.129-4.094q-.602-1.265-.484-1.16l-1.067-1.668q-.032-.125.079-.137.058.234-2.766-3.984l-.008-.09 2.211 2.836.227.02 2.968 4.07-.386-2.75-.328-1.012-1.657-2.461-1.07-2.344q-.198-.393-.191-.258c-.047-.222-.055-.324-.016-.304l-.55-.77.03-.172-.78-1.015 3.015 2.98-.25-1.34-2.531-4.488-.329-.914-2.375-2.91-.011-.082 1.113 1.28 2.894 1.731-.41-1.375-1.472-1.53-1.453-2.036.058-.176-1.246-1.738q-.076-.528.305-.383l2.363 1.73-.371-1.554-.543-1.211q-.308.265-2-1.73c.316-.305.45-.329.394-.07l.16-.266.223-.008q-.051-.277.172-.266c-.398-1.113-.597-1.61-.601-1.48l-.344-1.274Zm0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m997.367 412.93-.402.273-.684 12.024.653-.485-.66.613-.72 12.684.614-.516-.621.559-1.113 19.691c-.875 1.18-1.371 2.352-1.493 3.524l.067.793q.247.756.37.937c.27.524.802 1.024 1.606 1.5 1.957.258 3.582 0 4.868-.765q.732-.758 1.078-1.586.415-1.141.32-2.656-.199-3.123-1.793-16.434c-.465-4.926-.867-9.418-1.215-13.484q-.54-6.682-.875-16.672M1087.684 369.406l-.403.274-.683 12.023.652-.484-.66.613-.719 12.688.613-.52-.62.559-1.114 19.691q-1.312 1.768-1.492 3.523l.066.793q.248.756.371.938.405.784 1.606 1.504 2.938.38 4.867-.77.733-.758 1.078-1.586.415-1.137.32-2.656-.198-3.122-1.793-16.433c-.46-4.926-.867-9.418-1.21-13.481-.364-4.457-.653-10.016-.88-16.676M1207.77 302.172l-.403.27-.683 12.023.652-.48-.66.609-.723 12.687.613-.52-.617.563-1.117 19.692c-.871 1.175-1.371 2.351-1.488 3.52l.066.796q.244.751.371.934.4.784 1.602 1.504 2.939.381 4.87-.766.735-.76 1.079-1.586c.273-.762.383-1.648.32-2.66-.132-2.082-.734-7.559-1.793-16.434a1539 1539 0 0 1-1.214-13.48q-.541-6.687-.875-16.672M1102.55 374.813l-.405.269-.68 12.023.648-.48-.656.61-.723 12.687.614-.52-.618.559-1.117 19.695c-.875 1.176-1.37 2.352-1.492 3.52l.066.797q.248.75.372.933.404.785 1.605 1.504c1.957.254 3.582-.004 4.871-.765.485-.508.844-1.04 1.074-1.586.278-.762.383-1.649.325-2.66q-.205-3.124-1.797-16.434-.693-7.385-1.211-13.48-.543-6.687-.875-16.673m0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m1085.297 340.2-.11.253-.328.785q.037-.024.02.274l-.395 1.34q.268-.453.454-.067l-.16.266.097.113-.281.637q.08-.035.097.21l-.289.657q.323-.374.575-.074l-1.47 2.547 2.286-2.125-2.309 2.3.024.301-.293 1.574q.78-1.07 1.078-1.296c.125-.094.176-.024.164.218l-1.363 2.059-.055 1.09-.652 2.41.93-1.57q.596-.077.613.132l-2.133 4.77-.387 1.25.004.062 2.824-1.937-1.12 1.183q.059-.034.109.208l1.87-1.278-1.902 1.34-.195.23q.146-.045.074.29l-.449.3-2 2.235-.227.375.344-.473c.13-.039.211-.02.246.066l3.719-2.562-2.258 1.734c.23-.058.125.121-.32.551.062-.031.066.086.023.36l-.468.554-2.192 3.547-.012.172 2.387-3.09q.34-.064.25.246l-2.21 2.863 3.304-2.722-1.754 2.004-.027.078.925-.727-.96.903q.15-.065-.227.52l.152.23-.183.074.02.172-1.989 3.191-.055.695 4.473-4.464-2.043 2.078.133.148-.52 1.055c.059-.027.051.078-.023.324l-.172.172q-.275.545-.164.48l-.317.575-2.566 4.296-.129.504 1.188-1.437.828-.43 4.597-4.258c.551-.464.864-.68.95-.64l-4.883 4.558.113.09.445-.449c.082-.02.145.016.18.098l-1.82 2.613q.263-.06.203.273l-2.856 3.926-.175 1.145q5.97-5.31 6.199-4.801l-2.746 2.348c.023-.008.023.058.008.203-.055-.094-.551.355-1.496 1.351l-.278.313q.124-.043.07.273l-2.292 2.973-.461 2.16 2.957-2.559-3 2.758-.157.68 3.016-2.988q.283-.1.277.125l-2.328 2.593q.3-.058.235.246l-1.43 1.965.86-.87c.132.097.187.155.156.179l-.528.656.723-.047 8.262-7.015-4.813 4.406-3.34 2.605q19.794-.088 20.024-.289l-1.512-1.172-4.293-4.695-1.363-1.957-.278-.562 4.649 5.109.203-.082c.434.426.68.559.726.402l2.356 2.239-.543-1.438-1.715-3.289-3.371-3.887 5.277 4.2.055-1.043-1.289-3.426-1.496-2.91q-.053-.301.027-.274l-.582-1.129-1.558-1.91-.028-.18 2.055 1.997 1.555 1.792-.368-1.972-2.128-4.094q-.6-1.271-.485-1.16l-1.062-1.668c-.024-.086.004-.129.078-.14q.053.24-2.766-3.985l-.012-.086 2.215 2.836.227.02 2.965 4.07-.383-2.754-.332-1.012-1.652-2.46-1.075-2.345q-.198-.387-.187-.253-.074-.34-.02-.305l-.55-.774.03-.171-.777-1.012 3.012 2.98-.246-1.34-2.535-4.488-.324-.914-2.375-2.914-.016-.078 1.113 1.277 2.899 1.735-.41-1.375-1.477-1.532-1.453-2.039.062-.172-1.25-1.742q-.07-.527.305-.383l2.363 1.735-.37-1.559-.544-1.207q-.306.263-1.996-1.73c.317-.305.446-.328.395-.07l.16-.266.223-.008c-.04-.184.02-.273.168-.266-.395-1.117-.598-1.609-.598-1.48l-.344-1.277ZM1272.215 337.004l-.402.27-.684 12.023.648-.48-.656.609-.723 12.687.614-.52-.617.563-1.118 19.692c-.875 1.175-1.37 2.351-1.488 3.52l.066.796c.16.5.286.813.368.934q.404.784 1.605 1.504 2.937.381 4.871-.766.727-.76 1.078-1.586.41-1.142.32-2.66-.204-3.122-1.792-16.434-.698-7.385-1.215-13.48-.54-6.687-.875-16.672m0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m1099.262 338.066-.114.254-.328.785c.024-.015.032.079.024.274l-.395 1.34q.268-.452.45-.067l-.157.266.098.113-.281.637c.05-.023.086.047.097.21l-.289.657q.322-.37.574-.074l-1.468 2.547 2.285-2.125-2.309 2.3.024.305-.293 1.575c.52-.72.879-1.149 1.078-1.301.125-.094.176-.024.164.218l-1.363 2.06-.055 1.093-.652 2.406.93-1.57q.596-.077.609.133l-2.13 4.77-.386 1.25.004.062 2.824-1.938-1.125 1.184q.065-.031.113.207l1.868-1.274-1.899 1.336-.195.23q.146-.046.07.294l-.445.297-2 2.234-.227.375.344-.473c.129-.039.211-.02.246.067l3.719-2.563-2.258 1.738q.346-.092-.32.547.087-.045.023.36l-.469.554-2.191 3.547-.016.172 2.391-3.09c.227-.039.309.04.25.246l-2.21 2.864 3.304-2.723-1.754 2.008-.031.074.93-.727-.962.903c.102-.043.024.129-.226.523l.152.227-.183.078.02.168-1.99 3.195-.054.696 4.473-4.465-2.043 2.074.133.152-.52 1.051q.087-.04-.023.324l-.172.172q-.282.545-.164.48l-.317.575-2.57 4.297-.125.507 1.188-1.44.828-.43 4.597-4.258q.82-.698.95-.641l-4.887 4.559.113.093.445-.453c.086-.015.145.016.184.102l-1.824 2.61c.18-.04.246.054.207.273l-2.856 3.925-.175 1.149q5.97-5.316 6.199-4.801l-2.746 2.348q.03-.02.007.203c-.054-.098-.55.351-1.496 1.347l-.277.317q.123-.047.07.27l-2.293 2.972-.46 2.16 2.953-2.558-2.997 2.757-.16.684 3.02-2.992c.187-.063.277-.024.277.125l-2.328 2.594q.3-.06.234.25l-1.433 1.96.863-.87c.133.097.188.16.156.183l-.527.656.723-.05 8.261-7.016-4.812 4.406-3.344 2.61c13.2-.063 19.871-.16 20.027-.293l-1.515-1.172-4.29-4.692-1.366-1.96-.274-.56 4.649 5.106.203-.082c.433.426.676.563.726.402l2.356 2.239-.543-1.438-1.719-3.289-3.367-3.887 5.277 4.2.055-1.043-1.29-3.422-1.495-2.914q-.053-.299.023-.274l-.582-1.129-1.555-1.91-.03-.18 2.054 2 1.559 1.79-.368-1.973-2.129-4.094q-.602-1.265-.484-1.16l-1.066-1.668q-.03-.127.078-.137.059.235-2.766-3.984l-.008-.09 2.215 2.836.223.02 2.969 4.07-.383-2.754-.332-1.008-1.653-2.46-1.074-2.348q-.2-.388-.187-.254c-.051-.223-.055-.328-.02-.305l-.55-.773.03-.168-.78-1.016 3.015 2.98-.246-1.34-2.535-4.488-.324-.914-2.38-2.91-.011-.082 1.113 1.281 2.899 1.73-.414-1.374-1.473-1.531-1.453-2.04.062-.171-1.25-1.743q-.07-.525.305-.382l2.363 1.734-.37-1.555-.544-1.21q-.306.262-1.996-1.731.47-.457.395-.07l.156-.266.226-.008c-.039-.183.02-.273.168-.265-.394-1.118-.597-1.61-.601-1.48l-.344-1.278ZM1206.414 285.313l-.113.253-.328.786q.034-.025.023.273l-.394 1.336c.175-.297.328-.32.449-.066l-.156.27.097.112-.281.633c.05-.02.086.05.098.211l-.29.656q.324-.37.57-.07l-1.468 2.543 2.29-2.121-2.313 2.3.027.301-.293 1.575c.516-.715.879-1.145 1.078-1.297.121-.094.176-.024.164.219l-1.363 2.058-.055 1.09-.652 2.41.93-1.57q.597-.077.609.133l-2.133 4.77-.383 1.25v.062l2.825-1.938-1.122 1.184q.063-.034.114.207l1.867-1.278-1.902 1.34-.192.23c.094-.03.121.063.07.29l-.445.297-2 2.238-.226.371.343-.469q.188-.064.246.067l3.72-2.563-2.259 1.735q.346-.094-.32.546c.059-.027.066.09.024.36l-.473.558-2.188 3.547-.015.172 2.39-3.09q.34-.064.25.246l-2.21 2.86 3.304-2.719-1.754 2.004-.031.074.93-.726-.961.906c.097-.047.023.129-.227.52l.152.226-.183.078.02.168-1.989 3.195-.055.696 4.473-4.465-2.043 2.078.133.148-.52 1.051q.088-.04-.023.328l-.172.172q-.28.545-.164.48l-.316.575-2.57 4.293-.126.508 1.188-1.438.828-.43 4.598-4.257c.546-.47.863-.68.949-.64l-4.887 4.558.113.09.446-.454c.086-.015.144.02.183.102l-1.824 2.613q.266-.06.203.274l-2.851 3.922-.176 1.148c3.98-3.543 6.047-5.14 6.2-4.8l-2.747 2.347q.03-.016.008.203-.084-.145-1.496 1.352l-.278.312c.082-.027.102.063.07.273l-2.292 2.973-.461 2.156 2.953-2.558-2.996 2.762-.16.68 3.02-2.99q.279-.098.277.126l-2.329 2.594q.3-.06.235.246l-1.434 1.965.863-.875q.198.15.157.183l-.532.656.727-.05 8.262-7.012-4.813 4.406-3.343 2.606q19.793-.09 20.023-.29l-1.512-1.171-4.289-4.696-1.367-1.957-.277-.562 4.652 5.11.2-.083q.654.639.73.399l2.355 2.242-.543-1.438-1.719-3.289-3.367-3.89 5.278 4.203.054-1.043-1.293-3.426-1.492-2.914q-.053-.3.024-.27l-.582-1.132-1.555-1.907-.031-.18 2.054 1.997 1.559 1.789-.367-1.969-2.13-4.094q-.602-1.27-.484-1.16l-1.066-1.672q-.032-.124.078-.136.06.24-2.766-3.985l-.007-.086 2.21 2.832.227.024 2.969 4.07-.387-2.754-.328-1.012-1.656-2.46-1.07-2.344c-.133-.262-.196-.344-.192-.254q-.072-.339-.016-.309l-.55-.77.03-.171-.78-1.016 3.015 2.98-.25-1.335-2.53-4.489-.325-.918-2.38-2.91-.01-.082 1.112 1.282 2.895 1.73-.41-1.371-1.473-1.531-1.453-2.04.059-.171-1.246-1.742q-.077-.528.304-.383l2.364 1.73-.372-1.554-.543-1.211c-.207.175-.87-.399-2-1.727q.477-.46.395-.074l.16-.266.223-.004q-.052-.279.172-.265-.597-1.678-.602-1.485l-.344-1.273ZM1274.527 303.184l-.113.253-.328.79c.027-.016.031.074.023.27l-.394 1.339q.268-.449.45-.066l-.157.27.097.108-.28.637q.08-.035.097.211l-.29.656q.323-.368.575-.074l-1.469 2.547 2.285-2.121-2.308 2.297.023.304-.293 1.575c.52-.72.88-1.149 1.078-1.297.125-.094.176-.028.165.215l-1.364 2.062-.054 1.09-.653 2.406.93-1.57q.596-.074.613.133l-2.133 4.77-.386 1.25.004.062 2.824-1.938-1.125 1.184q.065-.031.113.207l1.867-1.274-1.898 1.34-.196.23q.146-.05.075.29l-.45.297-2 2.234-.226.375.344-.473q.193-.057.246.067l3.718-2.559-2.257 1.735q.346-.094-.32.546.087-.045.023.36l-.469.558-2.191 3.543-.016.172 2.39-3.09q.34-.059.25.247l-2.21 2.863 3.304-2.723-1.754 2.008-.03.074.929-.726-.961.902c.102-.043.023.129-.227.523l.153.227-.184.078.02.168-1.989 3.195-.054.696 4.472-4.465-2.043 2.074.133.152-.52 1.051q.09-.04-.023.324l-.172.176q-.275.54-.164.48l-.316.571-2.57 4.297-.125.508 1.187-1.442.828-.425 4.598-4.262q.82-.699.95-.64l-4.888 4.558.118.094.441-.454c.086-.015.145.016.184.102l-1.825 2.613c.18-.043.246.051.207.27l-2.855 3.926-.176 1.148q5.97-5.316 6.2-4.8l-2.747 2.347q.031-.018.008.203c-.055-.098-.55.352-1.496 1.352l-.277.312q.123-.046.07.27l-2.293 2.976-.46 2.156 2.952-2.558-2.996 2.758-.16.683 3.02-2.988q.279-.1.277.121l-2.328 2.594q.299-.06.234.25l-1.43 1.965.86-.875q.201.147.156.183l-.527.656.722-.05 8.262-7.016-4.812 4.406-3.344 2.61c13.199-.059 19.87-.157 20.027-.293l-1.515-1.168-4.29-4.696-1.367-1.96-.273-.56 4.648 5.11.203-.086q.65.644.727.403l2.355 2.238-.543-1.438-1.718-3.289-3.368-3.886 5.278 4.203.055-1.047-1.29-3.422-1.496-2.914q-.053-.3.024-.273l-.582-1.13-1.555-1.91-.027-.175 2.054 1.996 1.555 1.789-.367-1.973-2.129-4.094q-.602-1.265-.484-1.16l-1.067-1.668q-.028-.124.078-.136.059.234-2.761-3.985l-.012-.09 2.215 2.836.226.02 2.965 4.07-.383-2.754-.332-1.008-1.652-2.46-1.074-2.348q-.2-.388-.188-.254-.073-.334-.02-.305l-.55-.77.031-.171-.781-1.016 3.016 2.98-.246-1.34-2.536-4.487-.324-.914-2.379-2.91-.012-.083 1.114 1.282 2.898 1.73-.414-1.375-1.473-1.531-1.453-2.035.063-.176-1.25-1.738c-.047-.356.055-.48.305-.383l2.363 1.73-.371-1.554-.543-1.211c-.203.175-.871-.403-1.996-1.73q.47-.458.394-.071l.156-.266.227-.008c-.039-.183.02-.273.168-.265-.395-1.114-.598-1.61-.602-1.48l-.34-1.278ZM555.648 546.398l-.402.27-.683 12.023.652-.48-.66.61-.72 12.687.614-.516-.62.559-1.114 19.691q-1.312 1.766-1.492 3.52l.066.797q.248.75.371.933c.27.524.8 1.024 1.606 1.504 1.957.254 3.582 0 4.867-.766q.732-.76 1.078-1.585.415-1.143.32-2.66c-.133-2.079-.73-7.56-1.793-16.434-.465-4.922-.867-9.418-1.215-13.48-.359-4.458-.652-10.012-.875-16.673M446.313 512.41l-.403.274-.683 12.023.652-.484-.66.613-.719 12.687.61-.52-.618.56-1.117 19.69c-.871 1.18-1.371 2.352-1.488 3.524l.066.793q.244.756.371.938.4.784 1.602 1.504 2.939.38 4.87-.77.735-.758 1.079-1.586c.273-.758.383-1.644.32-2.656q-.198-3.122-1.793-16.434-.695-7.387-1.214-13.48-.541-6.686-.875-16.676m0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m553.71 515.773-.108.254-.329.79q.037-.024.02.269l-.39 1.34c.175-.301.324-.32.449-.067l-.16.266.101.113-.281.637q.075-.034.097.21l-.293.657q.329-.369.575-.074l-1.47 2.547 2.286-2.121-2.309 2.297.024.304-.29 1.575c.516-.72.88-1.149 1.075-1.297q.188-.148.164.215l-1.363 2.062-.055 1.09-.652 2.406.933-1.57q.598-.075.61.133l-2.133 4.77-.387 1.25.004.062 2.824-1.938-1.12 1.184c.042-.02.077.047.113.207l1.867-1.274-1.903 1.34-.195.23q.146-.052.074.29l-.449.297-2 2.234-.226.375.347-.473q.189-.057.242.067l3.72-2.559-2.259 1.734q.353-.092-.316.547.088-.045.02.36l-.47.554-2.19 3.547-.012.172 2.39-3.09q.337-.058.25.246l-2.215 2.864 3.309-2.723-1.754 2.008-.031.074.93-.726-.962.902c.098-.043.024.129-.23.523l.156.227-.187.078.02.168-1.989 3.195-.05.696 4.472-4.465-2.043 2.074.133.152-.524 1.051q.093-.04-.02.324l-.175.176q-.275.54-.164.48l-.313.57-2.57 4.298-.125.508 1.188-1.442.828-.426 4.597-4.261q.822-.698.946-.641l-4.883 4.559.113.093.446-.453c.082-.015.144.016.183.102l-1.824 2.61c.176-.04.246.054.203.273l-2.855 3.925-.176 1.149q5.976-5.316 6.199-4.801l-2.742 2.348q.03-.02.008.203-.083-.148-1.496 1.351l-.278.313q.118-.047.067.27l-2.29 2.976-.46 2.156 2.953-2.558-2.996 2.757-.16.684 3.015-2.988q.283-.101.277.12l-2.328 2.595q.305-.06.235.25l-1.43 1.964.86-.875q.202.147.16.184l-.532.656.723-.05 8.262-7.016-4.809 4.406-3.344 2.61c13.196-.063 19.871-.157 20.024-.293l-1.512-1.172-4.29-4.692-1.366-1.96-.278-.56 4.653 5.11.199-.086q.655.641.73.403l2.352 2.238-.543-1.438-1.715-3.289-3.367-3.886 5.273 4.203.059-1.047-1.293-3.422-1.496-2.914q-.053-.299.027-.274l-.582-1.129-1.558-1.91-.028-.18 2.055 2 1.559 1.79-.371-1.973-2.13-4.094q-.596-1.265-.484-1.16l-1.062-1.668q-.034-.124.078-.137.058.236-2.766-3.984l-.011-.09 2.214 2.836.227.02 2.969 4.07-.387-2.754-.332-1.008-1.652-2.46-1.07-2.348q-.202-.388-.192-.254-.072-.334-.02-.305l-.547-.773.032-.168-.782-1.016 3.016 2.98-.25-1.34-2.531-4.488-.328-.914-2.375-2.91-.016-.082 1.117 1.281 2.895 1.73-.41-1.374-1.473-1.531-1.457-2.036.062-.175-1.25-1.739q-.07-.53.305-.382l2.367 1.73-.37-1.555-.544-1.21c-.207.175-.87-.403-2-1.731q.477-.457.395-.07l.16-.266.223-.008q-.055-.276.172-.265-.597-1.676-.602-1.48l-.344-1.278ZM445.5 498.32l-.113.258-.328.785q.034-.022.023.27l-.394 1.34c.175-.301.328-.32.449-.067l-.157.27.098.113-.281.633c.05-.024.086.047.098.21l-.29.657q.324-.368.57-.074l-1.468 2.547 2.29-2.121-2.313 2.296.027.305-.293 1.574c.516-.718.879-1.148 1.078-1.296.121-.094.176-.028.164.214l-1.363 2.063-.055 1.09-.652 2.406.93-1.57c.398-.051.601-.004.609.132l-2.133 4.77-.383 1.25v.063l2.825-1.934-1.122 1.18c.043-.02.079.046.114.207l1.867-1.274-1.902 1.34-.192.23c.094-.035.121.063.07.29l-.445.296-2 2.235-.226.375.343-.473q.188-.057.246.067l3.715-2.559-2.254 1.734q.346-.092-.32.547.088-.046.023.36l-.472.558-2.188 3.543-.015.172 2.39-3.086q.34-.063.25.242l-2.21 2.864 3.304-2.723-1.754 2.008-.031.074.93-.727-.961.907q.147-.072-.227.52l.152.226-.183.078.02.168-1.989 3.195-.055.695 4.473-4.464-2.043 2.078.133.148-.52 1.05q.088-.038-.023.325l-.172.176q-.28.54-.164.48l-.316.57-2.57 4.298-.126.507 1.188-1.441.828-.426 4.598-4.261c.546-.465.863-.68.949-.637l-4.887 4.554.113.094.446-.453c.086-.016.144.016.183.102l-1.824 2.613c.176-.043.246.05.203.27l-2.855 3.925-.172 1.149q5.97-5.316 6.199-4.801l-2.746 2.348q.03-.02.008.203-.083-.148-1.496 1.351l-.278.313c.082-.032.102.058.07.27l-2.292 2.976-.461 2.156 2.953-2.558-2.996 2.757-.16.684 3.02-2.988q.275-.101.276.12l-2.328 2.598q.3-.064.235.246l-1.434 1.965.863-.875q.199.148.157.184l-.532.656.727-.05 8.262-7.016-4.813 4.406-3.344 2.61q19.795-.09 20.024-.294l-1.512-1.168-4.289-4.695-1.367-1.96-.277-.56 4.652 5.11.2-.086q.654.644.73.402l2.355 2.239-.543-1.438-1.719-3.289-3.367-3.887 5.277 4.203.055-1.046-1.293-3.422-1.492-2.914q-.052-.299.023-.274l-.582-1.129-1.554-1.91-.031-.176 2.054 1.996 1.559 1.79-.367-1.973-2.13-4.094q-.602-1.265-.484-1.16l-1.066-1.668q-.031-.124.078-.137.06.235-2.766-3.984l-.007-.09 2.21 2.836.227.02 2.969 4.07-.387-2.75-.328-1.012-1.656-2.46-1.07-2.345q-.199-.392-.192-.257c-.047-.223-.055-.325-.016-.305l-.55-.77.03-.171-.78-1.016 3.015 2.98-.25-1.34-2.531-4.488-.328-.914-2.375-2.91-.012-.082 1.113 1.281 2.895 1.73-.41-1.374-1.473-1.531-1.453-2.036.059-.175-1.246-1.739q-.077-.527.304-.383l2.363 1.73-.37-1.554-.544-1.21c-.207.175-.87-.4-2-1.731q.477-.457.395-.07l.16-.266.223-.008q-.052-.276.172-.266c-.399-1.113-.598-1.609-.602-1.48l-.344-1.273ZM283.414 383.98l-.402.274-.684 12.023.649-.484-.657.613-.722 12.684.613-.516-.617.559-1.117 19.691c-.875 1.18-1.372 2.352-1.489 3.524l.067.793c.16.504.285.812.367.937.27.52.805 1.024 1.605 1.5q2.937.382 4.871-.765.727-.761 1.079-1.586.408-1.143.32-2.66-.206-3.118-1.793-16.43a1402 1402 0 0 1-1.215-13.485q-.54-6.68-.875-16.672m0 0"
                        ></path>
                        <path
                            fill="#235161"
                            d="m284.86 359.98-.11.254-.328.786q.036-.025.02.273l-.391 1.336q.263-.447.449-.063l-.16.266.101.113-.28.633q.074-.031.097.215l-.293.652q.328-.37.574-.07l-1.469 2.543 2.285-2.121-2.308 2.3.023.301-.289 1.575c.516-.715.88-1.145 1.074-1.297.125-.094.18-.024.165.219l-1.364 2.058-.054 1.09-.653 2.41.934-1.57q.597-.077.61.133l-2.134 4.77-.386 1.25.004.062 2.824-1.938-1.121 1.184c.043-.024.078.047.113.207l1.867-1.278-1.902 1.34-.195.23c.097-.03.12.063.074.29l-.45.3-2 2.235-.226.375.348-.473c.125-.039.207-.02.242.067l3.719-2.563-2.258 1.735c.234-.059.129.12-.317.546.059-.027.067.09.02.36l-.469.558-2.191 3.547-.012.172 2.39-3.09c.223-.043.31.04.25.246l-2.214 2.86 3.308-2.719-1.754 2.004-.03.078.929-.73-.961.906c.098-.047.023.129-.23.52l.156.226-.188.078.02.172-1.989 3.191-.05.696 4.472-4.465-2.043 2.078.133.148-.523 1.051c.062-.023.054.082-.02.328l-.176.172q-.275.545-.164.48l-.312.575-2.57 4.293-.125.508 1.187-1.438.828-.43 4.598-4.257q.821-.699.945-.641l-4.883 4.559.114.09.445-.45c.082-.02.144.016.184.098l-1.825 2.613q.266-.06.203.274l-2.855 3.925-.176 1.145q5.977-5.31 6.2-4.8l-2.743 2.347q.031-.013.008.203c-.055-.098-.555.355-1.496 1.351l-.277.313q.118-.041.066.273l-2.29 2.973-.46 2.16 2.953-2.562-2.996 2.761-.16.68 3.015-2.988q.283-.1.278.125l-2.328 2.594q.304-.06.234.246l-1.43 1.965.86-.875c.137.101.187.16.16.183l-.531.656.722-.05 8.262-7.012-4.809 4.406-3.343 2.606q19.793-.09 20.023-.29l-1.512-1.171-4.289-4.696-1.367-1.957-.277-.562 4.652 5.11.2-.083q.655.639.73.399l2.351 2.242-.543-1.438-1.714-3.289-3.368-3.886 5.274 4.199.058-1.043-1.293-3.426-1.496-2.914q-.054-.3.028-.27l-.582-1.128-1.559-1.91-.027-.18 2.054 1.996 1.56 1.789-.372-1.969-2.129-4.094q-.597-1.27-.484-1.16l-1.063-1.672q-.034-.124.078-.136.06.24-2.765-3.985l-.012-.086 2.215 2.836.226.02 2.97 4.07-.388-2.754-.332-1.012-1.652-2.46-1.07-2.344c-.133-.258-.2-.344-.192-.254q-.07-.34-.02-.305l-.546-.773.031-.172-.781-1.012 3.016 2.977-.25-1.336-2.532-4.489-.328-.918-2.375-2.91-.015-.078 1.117 1.278 2.894 1.734-.41-1.375-1.473-1.531-1.457-2.04.063-.171-1.25-1.742q-.07-.528.305-.383l2.367 1.73-.371-1.555-.543-1.21c-.207.18-.871-.399-2-1.727q.475-.457.394-.07l.16-.266.223-.008q-.054-.279.172-.265c-.399-1.118-.598-1.61-.602-1.485l-.343-1.273ZM1360.266 332.855l-.11.254-.328.79q.035-.024.024.269l-.395 1.34c.176-.301.328-.32.45-.067l-.157.27.098.11-.282.636q.078-.035.098.211l-.293.656q.328-.368.574-.074l-1.468 2.547 2.289-2.121-2.313 2.297.024.304-.29 1.575c.516-.72.88-1.149 1.079-1.297.12-.094.175-.028.164.215l-1.368 2.062-.05 1.09-.657 2.406.934-1.57q.598-.075.61.133l-2.133 4.77-.387 1.25.004.062 2.824-1.938-1.121 1.184q.062-.031.113.207l1.867-1.274-1.902 1.34-.195.23c.097-.034.125.063.074.29l-.45.297-1.995 2.234-.227.375.344-.473q.188-.057.246.067l3.715-2.559-2.254 1.735q.346-.094-.32.546.087-.045.023.36l-.473.558-2.191 3.543-.012.172 2.39-3.09q.34-.058.25.246l-2.21 2.864 3.305-2.723-1.754 2.008-.032.074.93-.726-.96.906q.147-.071-.227.52l.152.226-.188.078.024.168-1.988 3.195-.055.696 4.473-4.465-2.043 2.078.132.148-.52 1.051q.09-.04-.023.324l-.171.176q-.282.54-.164.48l-.317.57-2.57 4.298-.125.508 1.187-1.442.828-.426 4.598-4.261q.821-.699.945-.641l-4.882 4.559.113.093.445-.453c.082-.015.145.016.184.102l-1.824 2.613c.175-.043.246.05.203.27l-2.856 3.925-.172 1.149q5.97-5.316 6.2-4.8l-2.747 2.347q.031-.02.008.203-.082-.148-1.496 1.351l-.277.313q.117-.047.07.27l-2.293 2.976-.46 2.156 2.952-2.558-2.996 2.757-.16.684 3.016-2.988q.28-.101.281.12l-2.332 2.595q.303-.06.238.25l-1.433 1.964.863-.875q.199.148.156.184l-.531.656.726-.05 8.262-7.016-4.812 4.406-3.344 2.61q19.794-.09 20.023-.293l-1.511-1.168-4.29-4.696-1.367-1.96-.277-.56 4.652 5.11.2-.086q.655.644.73.403l2.356 2.238-.547-1.438-1.715-3.289-3.367-3.886 5.273 4.203.059-1.047-1.293-3.422-1.492-2.914c-.04-.2-.028-.29.023-.274l-.582-1.128-1.559-1.91-.027-.176 2.055 1.996 1.558 1.789-.367-1.973-2.129-4.094q-.602-1.265-.484-1.16l-1.067-1.668q-.032-.124.079-.137.058.235-2.766-3.984l-.008-.09 2.211 2.836.227.02 2.968 4.07-.386-2.754-.328-1.008-1.657-2.46-1.07-2.344q-.198-.393-.191-.258-.072-.334-.02-.305l-.547-.77.031-.171-.78-1.016 3.015 2.98-.25-1.34-2.531-4.488-.329-.914-2.375-2.91-.011-.082 1.113 1.281 2.895 1.73-.41-1.374-1.473-1.531-1.453-2.036.058-.175-1.246-1.739q-.076-.53.305-.382l2.363 1.73-.371-1.555-.543-1.21q-.309.262-2-1.731.476-.457.395-.07l.16-.266.222-.008q-.051-.276.172-.265c-.398-1.114-.597-1.61-.601-1.48l-.344-1.274ZM1255.445 325.129l-.11.254-.327.785c.023-.016.031.078.023.273l-.394 1.34q.266-.452.449-.066l-.156.265.097.114-.28.636c.05-.023.085.047.097.211l-.293.657c.219-.246.41-.274.574-.075l-1.469 2.547 2.29-2.125-2.313 2.301.023.305-.289 1.574c.516-.719.88-1.148 1.078-1.3q.182-.144.164.218l-1.367 2.059-.05 1.093-.657 2.407.934-1.57q.597-.079.61.132l-2.134 4.77-.386 1.25.004.062 2.824-1.937-1.121 1.183q.063-.034.113.207l1.867-1.273-1.902 1.336-.196.23q.148-.046.075.293l-.45.297-1.996 2.234-.226.375.344-.472q.188-.062.246.066l3.714-2.562-2.253 1.738q.346-.093-.32.547.087-.046.023.36l-.473.554-2.187 3.547-.016.172 2.39-3.09c.227-.04.31.039.25.246l-2.21 2.863 3.304-2.723-1.754 2.008-.03.075.929-.727-.961.902q.147-.066-.227.524l.153.226-.188.078.024.168-1.989 3.196-.054.691 4.472-4.46-2.043 2.073.133.153-.52 1.05q.089-.04-.023.325l-.172.172q-.28.544-.164.48l-.316.574-2.57 4.297-.126.508 1.188-1.441.828-.43 4.598-4.258q.821-.699.945-.64l-4.883 4.558.114.094.445-.453q.124-.029.183.101l-1.824 2.61q.266-.06.203.273l-2.855 3.926-.172 1.148q5.97-5.315 6.2-4.8l-2.747 2.347q.031-.018.008.203-.083-.146-1.496 1.348l-.277.316q.117-.046.07.27l-2.293 2.973-.461 2.16 2.953-2.559-2.996 2.758-.16.683 3.015-2.992c.188-.062.282-.023.282.125l-2.332 2.594q.303-.06.238.25l-1.434 1.961.864-.871q.197.148.156.183l-.531.657.726-.051 8.262-7.016-4.813 4.407-3.343 2.609q19.793-.094 20.023-.293l-1.512-1.172-4.289-4.695-1.367-1.957-.277-.559 4.652 5.106.2-.082c.437.425.679.562.73.402l2.355 2.238-.547-1.437-1.714-3.29-3.368-3.886 5.274 4.2.058-1.044-1.293-3.426-1.492-2.91c-.039-.199-.027-.289.024-.273l-.582-1.13-1.559-1.91-.027-.179 2.054 2 1.559 1.79-.367-1.974-2.13-4.093q-.601-1.265-.483-1.16l-1.067-1.668q-.032-.128.078-.137.059.234-2.765-3.984l-.008-.09 2.21 2.836.227.02 2.97 4.07-.388-2.754-.328-1.012-1.656-2.457-1.07-2.348q-.199-.388-.192-.254c-.047-.222-.054-.328-.015-.304l-.551-.774.031-.168-.781-1.015 3.015 2.98-.25-1.34-2.53-4.488-.329-.914-2.375-2.91-.012-.082 1.114 1.28 2.894 1.731-.41-1.375-1.473-1.53-1.453-2.04.059-.172-1.246-1.742c-.051-.352.05-.477.304-.383l2.364 1.735-.371-1.555-.543-1.211q-.309.263-2-1.73.475-.458.394-.07l.16-.267.223-.007q-.052-.277.172-.266-.597-1.675-.602-1.48l-.343-1.278ZM1298.2 341.855l-.11.254-.328.786q.035-.019.023.273l-.394 1.34c.175-.301.328-.324.449-.067l-.156.266.097.113-.281.637c.05-.023.086.047.098.211l-.293.656q.328-.37.574-.074l-1.469 2.547 2.285-2.125-2.308 2.3.023.305-.289 1.575c.516-.72.879-1.149 1.074-1.297q.187-.148.168.215l-1.367 2.058-.055 1.094-.652 2.406.934-1.57q.597-.075.609.133l-2.133 4.77-.387 1.25.004.062 2.825-1.938-1.121 1.184q.063-.031.113.207l1.867-1.274-1.902 1.336-.196.235q.149-.053.075.289l-.45.297-1.996 2.234-.226.375.343-.473q.187-.057.247.067l3.714-2.563-2.254 1.738q.346-.092-.32.547.088-.045.024.36l-.473.554-2.191 3.547-.012.172 2.39-3.09q.34-.058.25.246l-2.214 2.864 3.308-2.723-1.754 2.008-.031.074.93-.726-.961.902q.148-.066-.23.523l.156.227-.188.078.024.168-1.989 3.195-.054.696 4.472-4.465-2.043 2.074.133.152-.52 1.051q.089-.04-.023.324l-.176.172q-.276.545-.16.48l-.316.575-2.57 4.297-.126.508 1.188-1.442.828-.426 4.598-4.261q.821-.699.945-.641l-4.883 4.559.113.093.446-.453c.082-.015.144.016.183.102l-1.824 2.61c.176-.04.246.054.203.273l-2.855 3.925-.176 1.149q5.975-5.316 6.203-4.8l-2.746 2.347q.031-.02.008.203-.083-.147-1.496 1.348l-.278.316q.119-.047.067.27l-2.29 2.976-.46 2.156 2.953-2.558-2.996 2.757-.16.684 3.015-2.988q.282-.101.282.12l-2.332 2.595q.303-.06.238.25l-1.434 1.96.86-.87q.202.147.16.183l-.531.656.726-.05 8.258-7.016-4.809 4.406-3.343 2.61q19.793-.094 20.023-.293l-1.512-1.172-4.289-4.692-1.367-1.96-.277-.56 4.652 5.106.2-.082c.437.426.679.563.73.403l2.355 2.238-.547-1.438-1.715-3.289-3.367-3.886 5.274 4.199.058-1.043-1.293-3.422-1.496-2.914c-.035-.2-.023-.29.028-.274l-.582-1.128-1.559-1.91-.027-.18 2.054 2 1.559 1.789-.367-1.973-2.13-4.094q-.601-1.265-.487-1.16l-1.063-1.668q-.032-.127.078-.137.059.235-2.765-3.984l-.012-.09 2.215 2.836.226.02 2.969 4.07-.387-2.754-.328-1.008-1.656-2.46-1.07-2.348q-.199-.388-.192-.254-.072-.334-.02-.305l-.546-.773.031-.168-.781-1.016 3.015 2.98-.25-1.34-2.53-4.488-.329-.914-2.375-2.91-.012-.082 1.114 1.281 2.894 1.73-.41-1.374-1.473-1.531-1.457-2.04.063-.171-1.246-1.742q-.076-.526.3-.383l2.368 1.734-.371-1.555-.543-1.21q-.31.262-2-1.731.475-.457.394-.07l.16-.266.223-.008q-.054-.276.172-.265-.597-1.676-.602-1.48l-.344-1.278ZM1175.707 319.98l-.11.258-.327.785q.032-.022.02.27l-.395 1.34q.269-.446.449-.067l-.157.27.098.113-.281.633q.081-.035.098.211l-.29.656q.323-.368.575-.074l-1.469 2.547 2.285-2.121-2.308 2.3.023.301-.293 1.575c.52-.72.879-1.149 1.078-1.297.125-.094.176-.024.164.218l-1.363 2.059-.055 1.09-.652 2.406.93-1.57q.596-.072.613.133l-2.133 4.773-.387 1.25.004.063 2.824-1.938-1.12 1.184q.059-.034.109.207l1.867-1.278-1.899 1.34-.195.23q.146-.05.074.29l-.449.297-2 2.234-.226.375.343-.469q.194-.063.246.063l3.72-2.559-2.259 1.735q.346-.094-.32.546c.063-.03.066.09.024.36l-.47.558-2.19 3.543-.012.176 2.386-3.09q.34-.064.25.246l-2.21 2.86 3.304-2.723-1.754 2.008-.027.074.926-.726-.961.906c.101-.047.023.129-.227.52l.152.226-.183.078.02.168-1.989 3.195-.055.696 4.473-4.465-2.043 2.078.133.148-.52 1.051q.088-.04-.023.328l-.172.172q-.275.54-.164.48l-.316.57-2.567 4.298-.129.508 1.188-1.438.828-.43 4.598-4.257c.546-.47.863-.68.949-.641l-4.883 4.555.113.093.442-.453q.13-.022.183.102l-1.82 2.613q.263-.06.203.274l-2.855 3.921-.176 1.149c3.98-3.543 6.047-5.14 6.2-4.8l-2.747 2.347q.032-.016.008.203c-.055-.098-.551.351-1.496 1.351l-.278.313q.124-.047.07.27l-2.292 2.976-.461 2.156 2.957-2.558-3 2.757-.156.684 3.015-2.988q.283-.1.277.125l-2.328 2.594q.3-.06.235.246l-1.43 1.964.86-.875c.132.102.187.16.156.184l-.528.656.723-.05 8.262-7.016-4.813 4.406-3.34 2.61q19.792-.09 20.024-.293l-1.512-1.168-4.293-4.696-1.363-1.957-.277-.562 4.648 5.11.203-.087c.434.43.68.563.727.403l2.355 2.242-.543-1.438-1.719-3.293-3.367-3.886 5.278 4.203.054-1.047-1.289-3.422-1.496-2.914q-.053-.3.027-.27l-.586-1.132-1.554-1.907-.028-.18 2.055 1.997 1.555 1.789-.367-1.973-2.13-4.09c-.398-.847-.562-1.234-.484-1.164l-1.066-1.668q-.028-.124.078-.137.058.24-2.762-3.984l-.011-.086 2.214 2.832.227.024 2.965 4.066-.383-2.75-.332-1.012-1.652-2.46-1.075-2.344c-.132-.262-.195-.344-.187-.254q-.074-.339-.02-.309l-.55-.77.03-.171-.78-1.016 3.015 2.98-.246-1.34-2.535-4.488-.324-.914-2.38-2.91-.01-.082 1.112 1.281 2.899 1.73-.414-1.37-1.473-1.531-1.453-2.04.063-.171-1.25-1.743q-.07-.528.304-.382l2.364 1.73-.372-1.555-.543-1.21c-.203.175-.87-.399-1.996-1.731q.47-.457.395-.07l.156-.266.227-.008c-.04-.183.02-.273.168-.265-.395-1.114-.598-1.61-.598-1.48l-.344-1.274ZM218.41 381.547l-.113.254-.328.789q.035-.024.023.27l-.394 1.34c.18-.302.328-.321.449-.067l-.156.27.097.109-.281.636c.05-.023.086.047.098.211l-.29.657q.323-.368.575-.075l-1.469 2.547 2.285-2.12-2.308 2.296.023.305-.293 1.574c.52-.719.879-1.148 1.078-1.297.125-.098.176-.027.164.215l-1.363 2.062-.055 1.09-.652 2.407.93-1.57c.398-.052.601-.005.61.132l-2.13 4.77-.387 1.25.004.062 2.825-1.937-1.125 1.183q.066-.031.113.207l1.867-1.273-1.898 1.34-.196.23q.147-.052.07.29l-.445.296-2 2.234-.226.375.343-.472q.194-.059.247.066l3.718-2.558-2.257 1.734q.346-.093-.32.547.087-.046.023.36l-.47.554-2.19 3.547-.016.172 2.39-3.09q.34-.06.25.246l-2.21 2.863 3.304-2.723-1.754 2.008-.03.075.929-.727-.961.902q.15-.066-.227.524l.153.226-.184.078.02.168-1.989 3.196-.054.695 4.472-4.465-2.043 2.074.133.153-.52 1.05q.089-.04-.023.325l-.172.175q-.28.54-.164.481l-.316.57-2.57 4.297-.126.508 1.188-1.441.828-.426 4.598-4.262q.82-.699.949-.64l-4.887 4.558.113.094.446-.453c.086-.016.144.015.183.101l-1.824 2.613c.18-.042.246.051.207.27l-2.855 3.926-.176 1.148q5.97-5.315 6.2-4.8l-2.747 2.347q.031-.019.008.203c-.055-.097-.55.352-1.496 1.352l-.278.312q.124-.046.07.27l-2.292 2.976-.461 2.157 2.953-2.559-2.996 2.758-.16.683 3.02-2.988q.279-.1.277.121l-2.328 2.594q.298-.06.234.25l-1.434 1.965.864-.875c.132.098.187.16.156.183l-.528.657.723-.051 8.262-7.016-4.813 4.407-3.343 2.609c13.199-.063 19.87-.156 20.027-.293l-1.516-1.172-4.289-4.691-1.367-1.961-.273-.559 4.648 5.11.203-.086c.434.425.676.562.727.402l2.355 2.238-.543-1.437-1.719-3.29-3.367-3.886 5.278 4.203.054-1.047-1.289-3.422-1.496-2.914q-.052-.298.024-.273l-.582-1.13-1.555-1.91-.031-.179 2.054 2 1.559 1.79-.367-1.974-2.13-4.093q-.601-1.266-.484-1.16l-1.066-1.668q-.029-.125.078-.137.059.234-2.765-3.985l-.008-.09 2.215 2.837.222.02 2.969 4.07-.383-2.754-.332-1.008-1.652-2.461-1.074-2.348q-.2-.388-.188-.254-.074-.334-.02-.304l-.55-.77.031-.172-.781-1.015 3.015 2.98-.246-1.34-2.535-4.488-.324-.914-2.379-2.91-.012-.082 1.114 1.28 2.898 1.731-.414-1.375-1.473-1.53-1.453-2.036.063-.176-1.25-1.738c-.047-.356.054-.48.304-.383l2.364 1.73-.371-1.554-.543-1.211q-.307.263-1.996-1.73.47-.458.394-.07l.156-.267.227-.007c-.04-.184.02-.274.168-.266q-.594-1.675-.602-1.48l-.344-1.278Zm0 0"
                        ></path>
                    </svg>
                    <div className="flex-1 bg-[#235161]"></div>
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
                        <p className="text-2xl md:text-3xl lg:text-4xl pt-[5%] px-4 text-center font-semibold font-cabin">&quot;Where Thoughts Find Understanding.&quot;</p>
                        <div className="flex-1 hidden p-6 xl:grid grid-cols-[auto_1fr_auto] gap-6 place-items-center">
                            <motion.div transition={{
                                delay: 0.10
                            }} initial={{ translateY: 50, opacity: 0 }} className="grid gap-4">

                                <p className="text-white text-2xl text-right">Not sure <br /> if you <br /> need <br /> therapy?</p>
                                <Button size="lg" variant="secondary" className="rounded-2xl text-lg">Do I need therapy? - Quiz</Button>
                            </motion.div>
                            <div className="flex h-full flex-col">
                                <div className="flex-1"></div>
                                <div className="mx-auto max-w-4xl grid grid-cols-3 gap-4 justify-center translate-y-5">
                                    <Link className="hover:scale-[1.01] transition-all" href="/individual">
                                        <motion.div transition={{
                                            delay: 0.05
                                        }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="rounded-2xl bg-white p-6">
                                            <p className="text-lg text-center">Individual</p>
                                            <div className="aspect-video">
                                                <IndividualImg className="mx-auto w-full h-full" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                    <Link className="hover:scale-[1.01] transition-all" href="/parental">
                                        <motion.div transition={{
                                            delay: 0.10
                                        }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="rounded-2xl bg-white p-6">
                                            <p className="text-lg text-center">Parental</p>
                                            <div className="aspect-video">
                                                <ParentalImg className="mx-auto w-full h-full" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                    <Link className="hover:scale-[1.01] transition-all" href="/child-and-teen">
                                        <motion.div transition={{
                                            delay: 0.15
                                        }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="rounded-2xl bg-white p-6">
                                            <p className="text-lg text-center">Child & Teen</p>
                                            <div className="aspect-video">
                                                <ChildImg className="mx-auto w-full h-full" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                </div>
                                <motion.div transition={{
                                    delay: 0.05
                                }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="grid place-items-center">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="lg" className="z-50 min-w-[40%] text-xl md:text-2xl py-7 md:py-8  px-12 md:px-14 font-semibold rounded-2xl hover:scale-[1.01] hover:bg-gray-950 transition-all">Book Your Session</Button>
                                        </DialogTrigger>
                                        <DialogContent className="text-left max-h-svh max-w-3xl overflow-y-scroll">
                                            <DialogHeader>
                                                <DialogTitle></DialogTitle>
                                                <DialogDescription></DialogDescription>
                                            </DialogHeader>
                                            <NewBooking isNested={true} />
                                        </DialogContent>
                                    </Dialog>
                                </motion.div>
                            </div>
                            <motion.div transition={{
                                delay: 0.10
                            }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="grid gap-4">
                                <p className="text-white text-2xl text-right">Not sure <br /> if you <br /> need <br /> therapy?</p>
                                <Link href="/dashboard/quiz">
                                    <Button size="lg" variant="secondary" className="rounded-2xl text-lg">Do I need therapy? - Quiz</Button>
                                </Link>
                            </motion.div>
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-center items-center gap-4 xl:hidden">
                            <div className="grid gap-4 w-full max-w-md">
                                <Link className="hover:scale-[1.01] transition-all" href="/individual">
                                    <motion.div transition={{
                                        delay: 0.05
                                    }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="rounded-2xl bg-white p-6 flex justify-between gap-6">
                                        <div className="space-y-2">
                                            <p className="text-lg">Individual</p>
                                            <p className="text-sm line-clamp-2">
                                                One-on-one therapy for those facing depression, anger, stress, and anxiety. Gain support in managing emotional struggles, building coping skills, and regaining control.
                                            </p>
                                        </div>
                                        <div className="aspect-square size-20">
                                            <IndividualImg className="mx-auto w-full h-full" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                            <div className="grid gap-4 w-full max-w-md">
                                <Link className="hover:scale-[1.01] transition-all" href="/individual">
                                    <motion.div transition={{
                                        delay: 0.05
                                    }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="rounded-2xl bg-white p-6 flex justify-between gap-6">
                                        <div className="space-y-2">
                                            <p className="text-lg">Parental</p>
                                            <p className="text-sm line-clamp-2">
                                                Enhance your parenting skills by addressing challenges like managing child and teen behavior, effective discipline, improving communication, navigating co-parenting, and fostering a supportive family environment.
                                            </p>
                                        </div>
                                        <div className="aspect-square size-20">
                                            <IndividualImg className="mx-auto w-full h-full" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                            <div className="grid gap-4 w-full max-w-md">
                                <Link className="hover:scale-[1.01] transition-all" href="/individual">
                                    <motion.div transition={{
                                        delay: 0.05
                                    }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="rounded-2xl bg-white p-6 flex justify-between gap-6">
                                        <div className="space-y-2">
                                            <p className="text-lg">Child & Teen</p>
                                            <p className="text-sm line-clamp-2">
                                                One-on-one therapy for children and teens dealing with anxiety, bullying, low self-esteem, and family conflicts. A safe space for emotional support and growth.
                                            </p>
                                        </div>
                                        <div className="aspect-square size-20">
                                            <ChildImg className="mx-auto w-full h-full" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                            <motion.div transition={{
                                delay: 0.10
                            }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="mt-4 grid gap-4">
                                <p className="text-white text-xl text-center">Not sure if you <br /> need therapy?</p>
                                <Link href="/dashboard/quiz">
                                    <Button size="lg" variant="secondary" className="rounded-2xl">Do I need therapy? - Quiz</Button>
                                </Link>
                            </motion.div>
                            <div className="bg-[#235161] xl:hidden">
                                <motion.div initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="pt-4 pb-6 grid place-items-center">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="lg" className="z-50 text-xl md:text-2xl py-7 md:py-8  px-12 md:px-14 font-semibold rounded-2xl hover:scale-[1.01] hover:bg-gray-950 transition-all">Book Your Session</Button>
                                        </DialogTrigger>
                                        <DialogContent className="text-left max-h-svh max-w-3xl overflow-y-scroll">
                                            <DialogHeader>
                                                <DialogTitle></DialogTitle>
                                                <DialogDescription></DialogDescription>
                                            </DialogHeader>
                                            <NewBooking isNested={true} />
                                        </DialogContent>
                                    </Dialog>
                                </motion.div>
                            </div>
                        </div>
                    </div>



                </div>
                <div className="bg-emerald-50">
                    <svg
                        className="w-full h-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 1439 150"
                    >
                        <g clipPath="url(#clip0_1013_2863)">
                            <mask
                                id="mask0_1013_2863"
                                width="1202"
                                height="116"
                                x="237"
                                y="0"
                                maskUnits="userSpaceOnUse"
                                style={{ maskType: "luminance" }}
                            >
                                <path fill="#fff" d="M237.834 0H1439v115.18H237.834z"></path>
                            </mask>
                            <g mask="url(#mask0_1013_2863)">
                                <mask
                                    id="mask1_1013_2863"
                                    width="1933"
                                    height="248"
                                    x="237"
                                    y="-118"
                                    maskUnits="userSpaceOnUse"
                                    style={{ maskType: "luminance" }}
                                >
                                    <path
                                        fill="#fff"
                                        d="M2169.56 102.396 265.299 129.138l-27.32-219.675L2142.24-117.28z"
                                    ></path>
                                </mask>
                                <g mask="url(#mask1_1013_2863)">
                                    <mask
                                        id="mask2_1013_2863"
                                        width="1933"
                                        height="248"
                                        x="237"
                                        y="-118"
                                        maskUnits="userSpaceOnUse"
                                        style={{ maskType: "luminance" }}
                                    >
                                        <path
                                            fill="#fff"
                                            d="M2169.56 102.396 265.299 129.138l-27.32-219.675L2142.24-117.28z"
                                        ></path>
                                    </mask>
                                    <g mask="url(#mask2_1013_2863)">
                                        <path
                                            fill="#C5DCE4"
                                            d="m2164.26 59.739-63.99-3.234c-63.99-3.303-191.96-9.767-318.23-2.581-126.26 7.257-250.82 28.236-376.26 42.105s-251.76 20.628-379.15 18.856c-127.384-1.772-255.83-12.076-384.807-26.645-128.977-14.57-258.484-33.405-323.236-42.822L253.831 36 238.096-90.55l63.471-.89c63.472-.893 190.415-2.675 317.358-4.458l380.829-5.348 380.826-5.348 380.83-5.348 317.36-4.457 63.47-.892z"
                                        ></path>
                                    </g>
                                </g>
                            </g>
                            <path
                                fill="#8CB0BC"
                                d="M1945.11 172.637V.766H-233.198V73.67c0 1.6-1.733 4.65.898 6.036 4.47 2.353 21.329 3.768 28.726 4.889 26.985 4.087 54.728 7.308 82.775 10.45 118.987 13.329 245.236 19.248 370.313 16.37 207.036-4.764 410.351-21.254 616.025-30.342 188.651-8.336 377.601-7.909 565.491 2.53 99.36 5.518 200.82 13.158 292.76 27.344 56.52 8.719 111.35 21.994 155.1 36.801 15.06 5.098 29.23 10.661 43.2 16.104 7.28 2.837 14.17 6.509 23.02 8.784"
                            ></path>
                            <mask
                                id="mask3_1013_2863"
                                width="1439"
                                height="73"
                                x="0"
                                y="0"
                                maskUnits="userSpaceOnUse"
                                style={{ maskType: "luminance" }}
                            >
                                <path fill="#fff" d="M0 0h1439v72.87H0z"></path>
                            </mask>
                            <g mask="url(#mask3_1013_2863)">
                                <mask
                                    id="mask4_1013_2863"
                                    width="4255"
                                    height="496"
                                    x="-183"
                                    y="-328"
                                    maskUnits="userSpaceOnUse"
                                    style={{ maskType: "luminance" }}
                                >
                                    <path
                                        fill="#fff"
                                        d="M-182.455-101.358 3941.4-327.373 4071.7-58.92-52.163 167.095z"
                                    ></path>
                                </mask>
                                <g mask="url(#mask4_1013_2863)">
                                    <mask
                                        id="mask5_1013_2863"
                                        width="4255"
                                        height="496"
                                        x="-183"
                                        y="-328"
                                        maskUnits="userSpaceOnUse"
                                        style={{ maskType: "luminance" }}
                                    >
                                        <path
                                            fill="#fff"
                                            d="M-182.455-101.358 3941.4-327.373 4071.7-58.92-52.163 167.095z"
                                        ></path>
                                    </mask>
                                    <g mask="url(#mask5_1013_2863)">
                                        <path
                                            fill="#235161"
                                            d="M3949.17-253.279c-119.06-25.857-260.7-29.335-396.76-18.617-152.21 11.895-283.54 41.429-410.37 70.978-133.19 31.091-268.7 63.824-429.02 77.037-153.55 12.697-289.15-2.79-427.25-24.488-122.4-19.18-247.88-39.356-386.23-36.929-128.68 2.336-245.74 23.079-353.22 45.539-111.44 23.406-218.79 50.577-342.74 66.252-155.83 19.78-316.489 9.804-470.609-6.881-167.688-18.038-337.796-43.02-517.757-38.485-141.73 3.486-282.491 26.286-350.717 69.805-7.144 4.38-4.263 8.358 3.275 11.206-2.908 2.227-3.412 4.759-.742 7.583l65.205 71.85c7.658 8.462 40.784 8.86 56.535 3.103C85.58 9.346 246.458 17.098 367.253 31.182 507.64 47.6 638.357 67.489 788.589 71.516c141.78 3.761 285.231-2.615 418.261-19.371 134.32-16.972 248.18-46.275 372.94-69.39 121.43-22.615 248.82-32.276 386.7-26.378 124.99 5.41 245.29 19.375 365.6 31.565 118.9 11.975 240.55 22.46 365.64 21.66 139.13-.81 267.67-18.804 386.08-42.3 136.9-27.015 261.77-61.668 408.66-82.736 137.37-19.789 295.07-29.48 432.6-4.49 25.99 4.633 47.19-3.46 45.58-11.235 1.48-1.42 2.14-2.912 2.15-4.689-6.13-34.406-11.83-68.835-17.97-103.267 10.23-4.085 12.1-10.245-5.66-14.164"
                                        ></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_1013_2863">
                                <path fill="#fff" d="M0 0h1439v272H0z"></path>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </section> */}


            <section className="content-evenly min-h-[calc(100svh_-_4rem)] bg-gradient-to-t from-emerald-200 to-emerald-100">
                <GridPattern
                    width={25}
                    height={25}
                    x={-1}
                    y={-1}
                    className={cn(
                        "[mask-image:linear-gradient(35deg,rgb(0,0,0,0)_0%,rgb(0,0,0,0.3)_60%,rgb(0,0,0,0.7)_70%,rgb(0,0,0,0.3)_90%)] ",
                    )}
                />

                <WordFadeIn delay={0.1} className="mx-auto px-2 pt-14 pb-6 max-w-md md:max-w-2xl lg:max-w-3xl text-3xl sm:text-4xl md:text-5xl" words="Your Journey to Mental Wellness Starts Here" />

                <motion.div transition={{
                    delay: 0.05
                }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="grid place-items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg" className="text-xl md:text-2xl py-7 md:py-8  px-12 md:px-14 font-semibold rounded-lg hover:scale-[1.01] transition-all">Book Your Session</Button>
                        </DialogTrigger>
                        <DialogContent className="text-left max-h-svh max-w-3xl overflow-y-scroll">
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <NewBooking isNested={true} />
                        </DialogContent>
                    </Dialog>
                </motion.div>
                <div className="px-[5%] py-16 grid gap-x-8 gap-y-12 lg:grid-cols-[1fr_25%_1fr] justify-center">
                    <div className="grid gap-4 max-w-lg lg:max-w-sm">
                        <Link href="/individual">
                            <motion.div transition={{
                                delay: 0.05
                            }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="p-6 rounded-2xl bg-white hover:backdrop-blur-sm hover:shadow-md flex gap-2 justify-between  bg-[length:25px_25px] [mask-image:radial-gradient(40rem_circle_at_30%_50%,white,transparent)] hover:[mask-image:radial-gradient(40rem_circle_at_45%_50%,white,transparent)] border border-emerald-300">
                                <div className="space-y-2">
                                    <p className="text-2xl">Individual</p>
                                    <p className="line-clamp-1">
                                        One-on-one therapy for those facing depression, anger, stress, and anxiety. Gain support in managing emotional struggles, building coping skills, and regaining control.
                                    </p>
                                </div>
                                <div>
                                </div>
                            </motion.div>
                        </Link>
                        <Link href="/parental">
                            <motion.div transition={{
                                delay: 0.10
                            }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="p-6 rounded-2xl bg-white/80 hover:backdrop-blur-sm hover:shadow-md flex gap-2 justify-between  bg-[length:25px_25px] [mask-image:radial-gradient(40rem_circle_at_30%_50%,white,transparent)] hover:[mask-image:radial-gradient(40rem_circle_at_45%_50%,white,transparent)] border border-emerald-300">
                                <div className="space-y-2">
                                    <p className="text-2xl">Parental</p>
                                    <p className="line-clamp-1">
                                        Enhance your parenting skills by addressing challenges like managing child and teen behavior, effective discipline, improving communication, navigating co-parenting, and fostering a supportive family environment.
                                    </p>
                                </div>
                                <div></div>
                            </motion.div>
                        </Link>
                        <Link href="/child-and-teen">
                            <motion.div transition={{
                                delay: 0.15
                            }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="p-6 rounded-2xl bg-white/80 hover:backdrop-blur-sm hover:shadow-md flex gap-2 justify-between  bg-[length:25px_25px] [mask-image:radial-gradient(40rem_circle_at_30%_50%,white,transparent)] hover:[mask-image:radial-gradient(40rem_circle_at_45%_50%,white,transparent)] border border-emerald-300">
                                <div className="space-y-2">
                                    <p className="text-2xl">Child & Teen</p>
                                    <p className="line-clamp-1">
                                        One-on-one therapy for children and teens dealing with anxiety, bullying, low self-esteem, and family conflicts. A safe space for emotional support and growth.
                                    </p>
                                </div>
                                <div></div>
                            </motion.div>
                        </Link>
                    </div>
                    <motion.img transition={{
                        delay: 0.10
                    }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="max-w-sm w-full place-self-center" src="/hero-image.svg" alt="hero image" />
                    <div className="grid gap-12 place-items-center">
                        <div className="space-y-12">
                            <div className="space-y-5">
                                <motion.p transition={{
                                    delay: 0.05
                                }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="text-3xl">Do I Need <br /> Therapy?</motion.p>
                                <motion.div transition={{
                                    delay: 0.10
                                }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="grid gap-4">
                                    <Link href="/services"><Button className="group border border-emerald-500 text-xl py-7 px-10 font-semibold rounded-lg hover:scale-[1.01] " variant="outline">
                                        Learn More
                                        <ArrowRight
                                            className="-me-1 ms-2 transition-transform group-hover:translate-x-1"
                                            size={22}
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                    </Button></Link>
                                    <Link href="/dashboard/quiz"><Button size="lg" className="text-xl py-7 px-10 font-semibold rounded-lg hover:scale-[1.01] transition-all">Take A Quiz</Button></Link>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
            <section className="px-4 py-12 space-y-12 bg-emerald-50 bg-xyz bg-cover">
                <p className="text-center text-3xl font-bold">Why Choose Us?</p>
                <div className="grid grid-cols-2 md:grid-cols-4 max-w-md md:max-w-4xl mx-auto gap-4 justify-center">
                    <motion.div transition={{
                        delay: 0.05
                    }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="flex flex-col gap-2 items-center justify-evenly bg-white rounded-xl p-8 space-y-4">
                        <div className="p-4 rounded-full bg-emerald-200">
                            <UserRound size={32} strokeWidth={1.5} />
                        </div>
                        <p className="text-center font-bold text-lg">Expert Therapists</p>
                    </motion.div>
                    <motion.div transition={{
                        delay: 0.10
                    }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="flex flex-col gap-2 items-center justify-evenly bg-white rounded-xl p-8 space-y-4">
                        <div className="p-4 rounded-full bg-emerald-200">
                            <CalendarDays size={32} strokeWidth={1.5} />
                        </div>
                        <p className="text-center font-bold text-lg">Flexible Schedules</p>
                    </motion.div>
                    <motion.div transition={{
                        delay: 0.15
                    }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="flex flex-col gap-2 items-center justify-evenly bg-white rounded-xl p-8 space-y-4">
                        <div className="p-4 rounded-full bg-emerald-200">
                            <ShieldCheck size={32} strokeWidth={1.5} />
                        </div>
                        <p className="text-center font-bold text-lg">Privacy & Security</p>
                    </motion.div>
                    <motion.div transition={{
                        delay: 0.20
                    }} initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="flex flex-col gap-2 items-center bg-white rounded-xl p-8 space-y-4">
                        <div className="p-4 rounded-full bg-emerald-200">
                            <MessagesSquare size={32} strokeWidth={1.5} />
                        </div>
                        <p className="text-center font-bold text-lg">24/7 Support</p>
                    </motion.div>
                </div>
            </section>
            <div className="flex gap-4 py-16 px-6 justify-around bg-emerald-300/80">
                <div className="flex gap-6 text-2xl break-words">
                    <p>
                        <motion.span onViewportEnter={() => sessionsSpring.set(750)} onViewportLeave={() => sessionsSpring.set(162)} className="text-4xl font-bold">{sessionsCount}</motion.span><span className="text-4xl pl-1 pr-2">+</span>
                        Sessions
                    </p>
                    <p>
                        <motion.span onViewportEnter={() => clientsSpring.set(62)} onViewportLeave={() => clientsSpring.set(34)} className="text-4xl font-bold">{clientsCount}</motion.span><span className="text-4xl pl-1 pr-2">+</span>
                        Happy clients
                    </p>
                </div>
            </div>
            <section className="px-4 py-16 grid gap-8 place-items-center">
                <div className="flex items-center gap-2">
                    <p className="text-emerald-500 text-3xl md:text-5xl font-montserrat font-semibold text-highlight-700 pr-2">At</p>
                    <svg className="h-10 md:h-12 mt-1" version="1"
                        viewBox="0 0 386.88 126.75"
                    >
                        <path d="M28.62 108.445q-7.02 0-11.079-6.093c-2.937-4.145-5.008-9.227-6.203-15.25-1.367-6.407-2.234-13.258-2.61-20.563q-.561-9.936-.562-21.578v-9.375c.07-2.633.11-5.422.11-8.36q-.891-.89-.891-2.25c0-.906.336-1.71 1.015-2.421q1.014-1.078 2.25-1.078 4.063 0 4.063 8.015-.001 5.206.578 19.657.563 14.453.563 19.656c.375.98.726 2.937 1.062 5.875q.516 4.406.516 7.219-.002 2.485.781 6.156a48 48 0 0 0 2.266 7.406q1.464 3.956 3.843 6.5 2.373 2.531 4.97 2.531 1.576.002 2.655-1.015 1.08-1.015 1.407-2.938.686-3.153.687-6.219V72.305q0-4.185-.797-10.625-.673-7.109-.672-10.719v-.797q-.001-1.81-.125-3.281l-.109-3.266q-.002-3.17-.344-9.609-.438-5.748-.437-9.703-.002-1.248 1.297-2.156a4.9 4.9 0 0 1 2.875-.907l2.828 2.61v1.906q-.002 1.36-.453 3.281-.456 3.175-.454 3.61 0 10.282 1.125 28.359 1.015 18.973 1.016 29.484 0 5.643-1.125 9.938-.675 2.594-1.86 4.187c-.792 1.055-1.866 1.953-3.218 2.703q-1.922 1.125-4.969 1.125M67.357 107.774q-1.127 0-1.985-.797c-.562-.524-.843-1.16-.843-1.922l.234-10.953q.328-7.343.328-10.953-.001-3.28-1.016-9.72c-.75-4.218-1.125-7.491-1.125-9.827q-.001-4.28-1.25-9.813a78 78 0 0 0-3.156-10.625q-1.814-4.857-3.062-10.453c-.825-3.726-1.235-6.984-1.235-9.766q-.001-.796.907-1.359a3.57 3.57 0 0 1 1.921-.562q1.249.002 2.375 2.593 1.36 2.941 2.594 8.25 1.247 5.315 1.469 6.328l1.469 7.782 1.125 4.984c.226-1.207.422-2.789.578-4.75.445-6.25 1.008-11.445 1.687-15.594.532-2.851 1.133-5.035 1.813-6.547.75-1.656 1.648-2.484 2.703-2.484q3.047 0 3.047 1.125-.001 6.44-2.703 18.984-2.72 12.534-2.72 19.079l-.218 1.812q-.236 1.705-.11 2.031v1.813q0 4.862.329 14.906l.234 15.031.219 2.594.234 2.703v2.828q-.002 1.362-1.14 2.313-1.126.967-2.703.969M100.795 107.086q-2.158 0-3.735-.562-1.921-.562-1.922-3.157V37.742q-.002-1.921-.671-5.765-.797-3.498-.797-5.766v-.328q1.92-3.17 2.828-4.078 1.574 0 4.187-.438 2.355-.451 4.172-.453 1.811 0 3.5 1.078 1.701 1.067 1.703 2.532 0 3.39-5.203 3.39h-1.578c-.46-.07-.984-.11-1.578-.11-.68 0-1.094.04-1.25.11 0 2.563.148 5.653.453 9.266l.219 3.156.234 6.219q-.002 2.143-.344 6.547l-.218 6.328 1.578-.344c1.508-.445 2.754-.672 3.734-.672q1.23 0 2.25.969 1.015.956 1.016 2.187 0 1.36-.844 2.438-.845 1.063-2.094 1.062l-1.359-.109h-1.453q-1.707 0-2.375.797v34.89l6.328-.328q6.435.001 6.437 2.938v.453q-.689 1.348-2.5 2.203c-1.199.563-2.367.914-3.5 1.063l-3.718.11ZM136.03 107.664q-1.472 0-2.657-1.078-1.188-1.077-1.187-2.547c0-.676.148-1.504.453-2.484q.341-1.577.343-2.375 0-10.043-1.125-38.625-1.125-24.388-1.125-38.516-.002-1.014.782-1.64.797-.623 1.922-.625c.906 0 1.695.324 2.375.968q1.014.955 1.015 2.313 0 6.783.672 20.328.563 15.033.563 20.328l.125 1.36v2.718q.327 9.831.328 29.36v2.937h8.703q2.374 1.705 2.375 3.39c0 .837-.29 1.571-.86 2.204q-.843.954-1.968.953-.344 0-1.235-.219l-.453-.11q-.691.111-2.156.11h-1.922c-.523-.07-1.121-.11-1.797-.11q-1.144 1.36-3.172 1.36M169.351 107.664q-1.471 0-2.656-1.078-1.189-1.077-1.188-2.547-.002-1.014.454-2.484.341-1.577.343-2.375 0-10.043-1.125-38.625-1.125-24.388-1.125-38.516-.002-1.014.782-1.64.796-.623 1.921-.625c.907 0 1.696.324 2.375.968q1.015.955 1.016 2.313 0 6.783.672 20.328.562 15.033.562 20.328l.125 1.36v2.718q.33 9.831.329 29.36v2.937h8.703q2.374 1.705 2.375 3.39c0 .837-.29 1.571-.86 2.204q-.843.954-1.968.953-.344 0-1.235-.219l-.453-.11q-.691.111-2.156.11h-1.922c-.523-.07-1.121-.11-1.797-.11q-1.144 1.36-3.172 1.36M204.595 106.305q-9.72 0-9.719-3.39 0-2.72 3.39-2.72h1.36c.301.086.64.125 1.016.125q.903 0 1.297-.562.406-.575.406-2.047c0-6.394-.383-15.129-1.14-26.203-.68-11.52-1.016-20.219-1.016-26.094q-.001-3.153.11-5.75l.124-5.765q-.002-3.734-.344-6.22c-.836.306-1.699.454-2.593.454-1.743 0-2.61-.898-2.61-2.703 0-.906.547-1.695 1.64-2.375q1.641-1.013 4.235-1.469c3.164-.531 5.844-.797 8.031-.797.895 0 1.66.305 2.297.906q.969.909.97 2.157-.001 1.237-.735 2.14-.737.908-1.86.907-.674 0-1.125-.11h-.906q-1.125 0-1.64.516c-.336.336-.5.95-.5 1.844q-.001 11.986 1.468 32.984 1.343 22.031 1.344 33.094v4.297c.531-.07 1.285-.11 2.266-.11q4.734.002 4.734 3.953v.672l-2.813 1.922c-.074 0-.304.024-.687.063q-.562.046-2.25.046-3.846.235-4.75.235M240.067 107.211q-1.707 0-2.656-1.64-.955-1.639-.954-4.016-.002-3.716.454-9.14l.218-2.938.22-5.985q-.002-3.967-.782-17.625-.797-13.67-.797-17.625 0-.34.047-1.297.06-.966.062-3 .124-2.25.125-5.53-.002-8.25-1.14-10.5-.675.001-2.938.343l-3.156.219q-1.472 0-2.61-.844-1.125-.844-1.124-2.203c0-.906.906-1.695 2.718-2.375q3.95-1.36 13.438-1.922 3.844-.218 4.64-.219c.895 0 1.72.305 2.47.906.757.594 1.14 1.344 1.14 2.25q0 1.36-.969 2.204-.956.843-2.422.843l-2.031-.109c-.605-.07-1.281-.11-2.031-.11h-1.125q.78 7.676.781 13.891l-.11 7.235c-.074 2.18-.109 4.62-.109 7.328q-.002 5.424.453 13 .563 9.375.563 12.984c0 2.867.148 6.258.453 10.172q.452 5.986.453 10.156 0 5.549-3.281 5.547M281.072 109.57c-2.03 0-3.883-.68-5.547-2.03-1.656-1.352-3.086-3.196-4.28-5.532-2.188-4.063-3.81-9.633-4.86-16.719q-1.125-7.34-1.688-16.937l-.125-5.985v-6.109a193 193 0 0 1-.11-7.11q0-6.778.563-11.968a44.5 44.5 0 0 1 2.266-10.735q1.794-4.638 5.188-6.546c1.351-.602 2.71-.907 4.078-.907q5.981 0 9.484 4.735 3.843 5.314 5.078 11.86 1.81 7.91 2.031 15.14.453 8.015.454 15.14v6.438q0 1.921-.563 7.219c-.305 2.793-.453 5.168-.453 7.125v.453q-.673 3.158-.672 7.453 0 3.159-1.36 6.547-1.359 3.392-3.843 5.765c-1.656 1.801-3.54 2.703-5.64 2.703m.22-6.203q2.26.001 3.843-4.187 1.359-3.716 1.969-9.078.62-5.372 1.078-12.157.234-2.934.234-7.562l-.125-10.39q-.22-6.093-1.344-15.25-.907-7.794-3.39-13.782-1.142-2.824-2.828-4.406-1.688-1.576-3.61-1.578-2.83 0-4.187 4.406-1.687 4.627-2.25 10.156-.692 6.001-.797 11.422l-.11 3.719c-.074 1.055-.109 2.484-.109 4.297v.453c0 5.043.523 11.258 1.578 18.64 1.195 10.012 2.969 17.125 5.313 21.344q2.25 3.954 4.734 3.953M331.114 108.445q-7.019 0-11.078-6.093-4.409-6.216-6.203-15.25c-1.368-6.407-2.235-13.258-2.61-20.563q-.562-9.936-.562-21.578v-9.375c.07-2.633.11-5.422.11-8.36q-.892-.89-.892-2.25c0-.906.336-1.71 1.016-2.421q1.014-1.078 2.25-1.078 4.062 0 4.063 8.015-.001 5.206.578 19.657.562 14.453.562 19.656.56 1.469 1.063 5.875.515 4.406.515 7.219c0 1.656.258 3.71.782 6.156a48 48 0 0 0 2.265 7.406q1.465 3.956 3.844 6.5 2.373 2.531 4.969 2.531 1.576.002 2.656-1.015 1.078-1.015 1.406-2.938.687-3.153.688-6.219V72.305q0-4.185-.797-10.625-.673-7.109-.672-10.719v-.797q-.001-1.81-.125-3.281l-.11-3.266c0-2.113-.117-5.316-.343-9.609q-.439-5.748-.438-9.703-.002-1.248 1.297-2.156a4.9 4.9 0 0 1 2.875-.907l2.828 2.61v1.906q0 1.36-.453 3.281-.454 3.175-.453 3.61 0 10.282 1.125 28.359 1.015 18.973 1.016 29.484 0 5.643-1.125 9.938-.675 2.594-1.86 4.187c-.793 1.055-1.867 1.953-3.218 2.703q-1.923 1.125-4.97 1.125M370.304 107.211q-1.705 0-2.656-1.64-.954-1.639-.953-4.016c0-2.477.148-5.524.453-9.14l.219-2.938.219-5.985q-.001-3.967-.782-17.625-.795-13.67-.796-17.625 0-.34.046-1.297.062-.966.063-3 .124-2.25.125-5.53c0-5.5-.383-9-1.14-10.5q-.675.001-2.938.343l-3.156.219q-1.472 0-2.61-.844-1.125-.844-1.125-2.203c0-.906.906-1.695 2.719-2.375q3.95-1.36 13.437-1.922 3.844-.218 4.641-.219c.895 0 1.719.305 2.469.906q1.139.891 1.14 2.25-.001 1.36-.968 2.204-.957.843-2.422.843l-2.031-.109c-.606-.07-1.282-.11-2.032-.11h-1.125q.781 7.676.782 13.891l-.11 7.235c-.074 2.18-.11 4.62-.11 7.328q-.001 5.424.454 13 .562 9.375.562 12.984-.002 4.3.454 10.172.452 5.986.453 10.156 0 5.549-3.282 5.547m0 0"></path>
                    </svg>
                </div>
                <motion.div initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }}>
                    <Table className="max-w-4xl mx-auto bg-white rounded-xl shadow">
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader className="border-b border-black">
                            <TableRow className="border-b border-black">
                                <TableHead className="w-1/2 font-semibold md:text-lg text-black">Key Features</TableHead>
                                <TableHead className="w-1/4 p-2 bg-emerald-100">  <svg className="h-6 md:h-8 mx-auto" version="1"
                                    viewBox="0 0 386.88 126.75"
                                >
                                    <path d="M28.62 108.445q-7.02 0-11.079-6.093c-2.937-4.145-5.008-9.227-6.203-15.25-1.367-6.407-2.234-13.258-2.61-20.563q-.561-9.936-.562-21.578v-9.375c.07-2.633.11-5.422.11-8.36q-.891-.89-.891-2.25c0-.906.336-1.71 1.015-2.421q1.014-1.078 2.25-1.078 4.063 0 4.063 8.015-.001 5.206.578 19.657.563 14.453.563 19.656c.375.98.726 2.937 1.062 5.875q.516 4.406.516 7.219-.002 2.485.781 6.156a48 48 0 0 0 2.266 7.406q1.464 3.956 3.843 6.5 2.373 2.531 4.97 2.531 1.576.002 2.655-1.015 1.08-1.015 1.407-2.938.686-3.153.687-6.219V72.305q0-4.185-.797-10.625-.673-7.109-.672-10.719v-.797q-.001-1.81-.125-3.281l-.109-3.266q-.002-3.17-.344-9.609-.438-5.748-.437-9.703-.002-1.248 1.297-2.156a4.9 4.9 0 0 1 2.875-.907l2.828 2.61v1.906q-.002 1.36-.453 3.281-.456 3.175-.454 3.61 0 10.282 1.125 28.359 1.015 18.973 1.016 29.484 0 5.643-1.125 9.938-.675 2.594-1.86 4.187c-.792 1.055-1.866 1.953-3.218 2.703q-1.922 1.125-4.969 1.125M67.357 107.774q-1.127 0-1.985-.797c-.562-.524-.843-1.16-.843-1.922l.234-10.953q.328-7.343.328-10.953-.001-3.28-1.016-9.72c-.75-4.218-1.125-7.491-1.125-9.827q-.001-4.28-1.25-9.813a78 78 0 0 0-3.156-10.625q-1.814-4.857-3.062-10.453c-.825-3.726-1.235-6.984-1.235-9.766q-.001-.796.907-1.359a3.57 3.57 0 0 1 1.921-.562q1.249.002 2.375 2.593 1.36 2.941 2.594 8.25 1.247 5.315 1.469 6.328l1.469 7.782 1.125 4.984c.226-1.207.422-2.789.578-4.75.445-6.25 1.008-11.445 1.687-15.594.532-2.851 1.133-5.035 1.813-6.547.75-1.656 1.648-2.484 2.703-2.484q3.047 0 3.047 1.125-.001 6.44-2.703 18.984-2.72 12.534-2.72 19.079l-.218 1.812q-.236 1.705-.11 2.031v1.813q0 4.862.329 14.906l.234 15.031.219 2.594.234 2.703v2.828q-.002 1.362-1.14 2.313-1.126.967-2.703.969M100.795 107.086q-2.158 0-3.735-.562-1.921-.562-1.922-3.157V37.742q-.002-1.921-.671-5.765-.797-3.498-.797-5.766v-.328q1.92-3.17 2.828-4.078 1.574 0 4.187-.438 2.355-.451 4.172-.453 1.811 0 3.5 1.078 1.701 1.067 1.703 2.532 0 3.39-5.203 3.39h-1.578c-.46-.07-.984-.11-1.578-.11-.68 0-1.094.04-1.25.11 0 2.563.148 5.653.453 9.266l.219 3.156.234 6.219q-.002 2.143-.344 6.547l-.218 6.328 1.578-.344c1.508-.445 2.754-.672 3.734-.672q1.23 0 2.25.969 1.015.956 1.016 2.187 0 1.36-.844 2.438-.845 1.063-2.094 1.062l-1.359-.109h-1.453q-1.707 0-2.375.797v34.89l6.328-.328q6.435.001 6.437 2.938v.453q-.689 1.348-2.5 2.203c-1.199.563-2.367.914-3.5 1.063l-3.718.11ZM136.03 107.664q-1.472 0-2.657-1.078-1.188-1.077-1.187-2.547c0-.676.148-1.504.453-2.484q.341-1.577.343-2.375 0-10.043-1.125-38.625-1.125-24.388-1.125-38.516-.002-1.014.782-1.64.797-.623 1.922-.625c.906 0 1.695.324 2.375.968q1.014.955 1.015 2.313 0 6.783.672 20.328.563 15.033.563 20.328l.125 1.36v2.718q.327 9.831.328 29.36v2.937h8.703q2.374 1.705 2.375 3.39c0 .837-.29 1.571-.86 2.204q-.843.954-1.968.953-.344 0-1.235-.219l-.453-.11q-.691.111-2.156.11h-1.922c-.523-.07-1.121-.11-1.797-.11q-1.144 1.36-3.172 1.36M169.351 107.664q-1.471 0-2.656-1.078-1.189-1.077-1.188-2.547-.002-1.014.454-2.484.341-1.577.343-2.375 0-10.043-1.125-38.625-1.125-24.388-1.125-38.516-.002-1.014.782-1.64.796-.623 1.921-.625c.907 0 1.696.324 2.375.968q1.015.955 1.016 2.313 0 6.783.672 20.328.562 15.033.562 20.328l.125 1.36v2.718q.33 9.831.329 29.36v2.937h8.703q2.374 1.705 2.375 3.39c0 .837-.29 1.571-.86 2.204q-.843.954-1.968.953-.344 0-1.235-.219l-.453-.11q-.691.111-2.156.11h-1.922c-.523-.07-1.121-.11-1.797-.11q-1.144 1.36-3.172 1.36M204.595 106.305q-9.72 0-9.719-3.39 0-2.72 3.39-2.72h1.36c.301.086.64.125 1.016.125q.903 0 1.297-.562.406-.575.406-2.047c0-6.394-.383-15.129-1.14-26.203-.68-11.52-1.016-20.219-1.016-26.094q-.001-3.153.11-5.75l.124-5.765q-.002-3.734-.344-6.22c-.836.306-1.699.454-2.593.454-1.743 0-2.61-.898-2.61-2.703 0-.906.547-1.695 1.64-2.375q1.641-1.013 4.235-1.469c3.164-.531 5.844-.797 8.031-.797.895 0 1.66.305 2.297.906q.969.909.97 2.157-.001 1.237-.735 2.14-.737.908-1.86.907-.674 0-1.125-.11h-.906q-1.125 0-1.64.516c-.336.336-.5.95-.5 1.844q-.001 11.986 1.468 32.984 1.343 22.031 1.344 33.094v4.297c.531-.07 1.285-.11 2.266-.11q4.734.002 4.734 3.953v.672l-2.813 1.922c-.074 0-.304.024-.687.063q-.562.046-2.25.046-3.846.235-4.75.235M240.067 107.211q-1.707 0-2.656-1.64-.955-1.639-.954-4.016-.002-3.716.454-9.14l.218-2.938.22-5.985q-.002-3.967-.782-17.625-.797-13.67-.797-17.625 0-.34.047-1.297.06-.966.062-3 .124-2.25.125-5.53-.002-8.25-1.14-10.5-.675.001-2.938.343l-3.156.219q-1.472 0-2.61-.844-1.125-.844-1.124-2.203c0-.906.906-1.695 2.718-2.375q3.95-1.36 13.438-1.922 3.844-.218 4.64-.219c.895 0 1.72.305 2.47.906.757.594 1.14 1.344 1.14 2.25q0 1.36-.969 2.204-.956.843-2.422.843l-2.031-.109c-.605-.07-1.281-.11-2.031-.11h-1.125q.78 7.676.781 13.891l-.11 7.235c-.074 2.18-.109 4.62-.109 7.328q-.002 5.424.453 13 .563 9.375.563 12.984c0 2.867.148 6.258.453 10.172q.452 5.986.453 10.156 0 5.549-3.281 5.547M281.072 109.57c-2.03 0-3.883-.68-5.547-2.03-1.656-1.352-3.086-3.196-4.28-5.532-2.188-4.063-3.81-9.633-4.86-16.719q-1.125-7.34-1.688-16.937l-.125-5.985v-6.109a193 193 0 0 1-.11-7.11q0-6.778.563-11.968a44.5 44.5 0 0 1 2.266-10.735q1.794-4.638 5.188-6.546c1.351-.602 2.71-.907 4.078-.907q5.981 0 9.484 4.735 3.843 5.314 5.078 11.86 1.81 7.91 2.031 15.14.453 8.015.454 15.14v6.438q0 1.921-.563 7.219c-.305 2.793-.453 5.168-.453 7.125v.453q-.673 3.158-.672 7.453 0 3.159-1.36 6.547-1.359 3.392-3.843 5.765c-1.656 1.801-3.54 2.703-5.64 2.703m.22-6.203q2.26.001 3.843-4.187 1.359-3.716 1.969-9.078.62-5.372 1.078-12.157.234-2.934.234-7.562l-.125-10.39q-.22-6.093-1.344-15.25-.907-7.794-3.39-13.782-1.142-2.824-2.828-4.406-1.688-1.576-3.61-1.578-2.83 0-4.187 4.406-1.687 4.627-2.25 10.156-.692 6.001-.797 11.422l-.11 3.719c-.074 1.055-.109 2.484-.109 4.297v.453c0 5.043.523 11.258 1.578 18.64 1.195 10.012 2.969 17.125 5.313 21.344q2.25 3.954 4.734 3.953M331.114 108.445q-7.019 0-11.078-6.093-4.409-6.216-6.203-15.25c-1.368-6.407-2.235-13.258-2.61-20.563q-.562-9.936-.562-21.578v-9.375c.07-2.633.11-5.422.11-8.36q-.892-.89-.892-2.25c0-.906.336-1.71 1.016-2.421q1.014-1.078 2.25-1.078 4.062 0 4.063 8.015-.001 5.206.578 19.657.562 14.453.562 19.656.56 1.469 1.063 5.875.515 4.406.515 7.219c0 1.656.258 3.71.782 6.156a48 48 0 0 0 2.265 7.406q1.465 3.956 3.844 6.5 2.373 2.531 4.969 2.531 1.576.002 2.656-1.015 1.078-1.015 1.406-2.938.687-3.153.688-6.219V72.305q0-4.185-.797-10.625-.673-7.109-.672-10.719v-.797q-.001-1.81-.125-3.281l-.11-3.266c0-2.113-.117-5.316-.343-9.609q-.439-5.748-.438-9.703-.002-1.248 1.297-2.156a4.9 4.9 0 0 1 2.875-.907l2.828 2.61v1.906q0 1.36-.453 3.281-.454 3.175-.453 3.61 0 10.282 1.125 28.359 1.015 18.973 1.016 29.484 0 5.643-1.125 9.938-.675 2.594-1.86 4.187c-.793 1.055-1.867 1.953-3.218 2.703q-1.923 1.125-4.97 1.125M370.304 107.211q-1.705 0-2.656-1.64-.954-1.639-.953-4.016c0-2.477.148-5.524.453-9.14l.219-2.938.219-5.985q-.001-3.967-.782-17.625-.795-13.67-.796-17.625 0-.34.046-1.297.062-.966.063-3 .124-2.25.125-5.53c0-5.5-.383-9-1.14-10.5q-.675.001-2.938.343l-3.156.219q-1.472 0-2.61-.844-1.125-.844-1.125-2.203c0-.906.906-1.695 2.719-2.375q3.95-1.36 13.437-1.922 3.844-.218 4.641-.219c.895 0 1.719.305 2.469.906q1.139.891 1.14 2.25-.001 1.36-.968 2.204-.957.843-2.422.843l-2.031-.109c-.606-.07-1.282-.11-2.032-.11h-1.125q.781 7.676.782 13.891l-.11 7.235c-.074 2.18-.11 4.62-.11 7.328q-.001 5.424.454 13 .562 9.375.562 12.984-.002 4.3.454 10.172.452 5.986.453 10.156 0 5.549-3.282 5.547m0 0"></path>
                                </svg></TableHead>
                                <TableHead className="w-1/4 font-semibold md:text-lg text-black text-center py-2"> Traditional In-Office Therapy</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {features.map((feature, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-semibold md:text-[1.1rem] text-gray-800">
                                        <motion.div initial={{ translateY: 30, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }} className="flex gap-2 md:gap-4 item-center">
                                            {feature.title}
                                            <Tooltip>
                                                <TooltipTrigger><Info className="h-4 w-4 md:h-6 md:w-6" /></TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{feature.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </motion.div>
                                    </TableCell>
                                    <TableCell className="bg-emerald-100">
                                        <motion.div initial={{ translateY: 30, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }}>
                                            {feature.our ? <Check className="stroke-green-500 mx-auto" /> : <X className="stroke-red-500 mx-auto" />}
                                        </motion.div>
                                    </TableCell>
                                    <TableCell>
                                        <motion.div initial={{ translateY: 23, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }}>
                                            {feature.others ? <Check className="stroke-green-500 mx-auto" /> : <X className="stroke-red-500 mx-auto" />}
                                        </motion.div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </motion.div>
            </section>
            <section className="bg-emerald-100 px-4 py-10 space-y-4">
                <p className="text-center text-xl font-semibold">Success Stories</p>
                <p className="text-center text-3xl font-semibold">Customer Voices</p>
                <div className="py-6 px-2 max-w-[94rem] mx-auto">
                    <Carousel className="w-full px-9">
                        <CarouselContent className="-ml-0.5 mr-0.5">
                            {[
                                "My breakup left me shattered. I tried everything—friends, hobbies, distractions—but nothing worked. I felt stuck in my pain. That’s when I decided to try therapy. For the first time, I felt truly heard. I could share my thoughts without filtering them. I finally feel like I’m moving forward.",

                                "In the last year, I switched jobs four times. No matter where I went, I felt like I wasn’t enough. My relationship was falling apart, and I was constantly anxious. My partner suggested therapy, and at first, I was skeptical. But now, I’m finally starting to understand myself—why I react the way I do, why I struggle with self-worth. It’s been eye-opening.",

                                "My partner never really understood my emotions. Whenever I tried to talk about my feelings, they brushed it off. It made me feel so alone, even in a relationship. Therapy helped me realize that my emotions are valid, and I deserve to be heard. I now know how to communicate my needs better, and I’ve gained the confidence to set boundaries.",

                                "I always felt like I was running behind in life. I’d put things off until the last minute and then hate myself for it. No productivity hack worked. Therapy helped me see that my procrastination wasn’t just laziness—it had deeper roots. Now, I’m learning to be kinder to myself and take small steps instead of drowning in guilt.",

                                "My family has always expected a lot from me. They had a plan for my life, and any time I wanted something different, I felt guilty. Therapy helped me realize that I don’t have to live my life for others. I’m learning to stand up for myself while still respecting my family’s feelings.",

                                "Day in and day out, I was studying for my board exams, but nothing was staying in my mind. The pressure was suffocating. Therapy gave me the space to talk about my fears and anxieties without being judged. I learned how to manage my stress better, and for the first time, I felt like I could breathe.",

                                "Every social interaction felt like a test I was failing. I’d overanalyze every conversation and assume people didn’t like me. It was exhausting. Therapy helped me challenge these thoughts and see things more rationally. I’m still a work in progress, but I’m learning to trust myself more.",

                                "I felt like I was just going through the motions—wake up, work, sleep, repeat. Nothing excited me anymore. I didn’t even know what I wanted from life. Therapy helped me reconnect with myself. I started asking the right questions and, for the first time in years, I feel like I have direction.",

                                "My parents and I never really understood each other. Every conversation turned into an argument. Therapy helped me see things from a new perspective. I learned how to communicate with them better, and while things aren’t perfect, we’re finally making progress.",

                                "I was always afraid of failing. I wouldn’t even try things unless I was sure I’d succeed. This fear was holding me back from so much. Therapy helped me realize that failure isn’t the end—it’s part of growth. I’m finally taking chances and living without so much fear."
                            ].map((text, index) => (
                                <CarouselItem key={index} className="pl-2 lg:basis-1/3">
                                    <div className="p-4 h-full rounded-xl bg-white">
                                        {/* <div className="flex items-center justify-center gap-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold text-lg">Parents Name</p>
                            </div> */}
                                        <div className="text-center">
                                            <p className="text-balance text-lg px-2 mt-4">
                                                <Quote className="inline fill-emerald-400 stroke-none rotate-180 -translate-y-1 size-8 mr-2" />
                                                {text}
                                                <Quote className="inline fill-emerald-400 stroke-none translate-y-1 size-8 ml-2" />
                                            </p>
                                        </div>
                                        {/* <div className="w-full flex justify-center mt-6">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className="fill-emerald-400 stroke-none inline size-5" />
                                ))}
                            </div> */}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0" />
                        <CarouselNext className="right-0" />
                    </Carousel>
                </div>
            </section>
            <section className="px-4 py-8 space-y-4" id="faqs">
                <p className="text-center text-2xl font-semibold">Frequently Asked Questions</p>
                <Accordion className="max-w-4xl mx-auto" type="single" collapsible>
                    {FAQs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger className="text-xl text-left font-bold">{faq.title}</AccordionTrigger>
                            <AccordionContent>
                                <Accordion className="max-w-4xl mx-auto px-4 bg-neutral-200/50 rounded-md" type="single" collapsible>
                                    {faq.questions.map((item, index) => (
                                        <AccordionItem key={index} value={`item-${index + 1}`}>
                                            <AccordionTrigger className="text-lg text-left font-semibold">
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-lg">
                                                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </main>
    );
}