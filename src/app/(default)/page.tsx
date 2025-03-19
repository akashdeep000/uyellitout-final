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

    const clientsSpring = useSpring(114, { mass: 0.8, stiffness: 75, damping: 15 });
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
            <section className="grid content-evenly min-h-[calc(100svh_-_4rem)] bg-gradient-to-t from-emerald-200 to-emerald-100">
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
                        <DialogContent className="text-left max-h-svh max-w-2xl overflow-y-scroll">
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
                        <motion.span onViewportEnter={() => sessionsSpring.set(275)} onViewportLeave={() => sessionsSpring.set(162)} className="text-4xl font-bold">{sessionsCount}</motion.span>{" "}
                        Sessions
                    </p>
                    <p>
                        <motion.span onViewportEnter={() => clientsSpring.set(150)} onViewportLeave={() => clientsSpring.set(114)} className="text-4xl font-bold">{clientsCount}</motion.span><span className="text-4xl pl-1 pr-2">+</span>
                        Happy clients
                    </p>
                </div>
            </div>
            <section className="px-4 py-16 grid gap-8 place-items-center">
                <div className="flex items-center gap-2">
                    <p className="text-3xl md:text-5xl font-montserrat font-semibold text-highlight-700 pr-2">At</p>
                    <svg className="h-6 md:h-9 mt-1" viewBox="0 0 164 21" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.016 1.2V18H12.248V15.96C11.096 17.512 9.4 18.288 7.16 18.288C5.176 18.288 3.624 17.664 2.504 16.416C1.4 15.152 0.848 13.36 0.848 11.04V1.2H4.736V10.92C4.736 12.264 5.048 13.28 5.672 13.968C6.312 14.64 7.176 14.976 8.264 14.976C9.432 14.976 10.368 14.616 11.072 13.896C11.776 13.16 12.128 12.08 12.128 10.656V1.2H16.016ZM34.9998 1.2V12.744C34.9998 15.272 34.2958 17.208 32.8878 18.552C31.4798 19.912 29.5358 20.592 27.0558 20.592C25.6318 20.592 24.3278 20.392 23.1438 19.992C21.9598 19.608 20.9518 19.056 20.1198 18.336L21.6318 15.456C23.1518 16.688 24.9278 17.304 26.9598 17.304C28.3678 17.304 29.4078 16.952 30.0798 16.248C30.7678 15.528 31.1118 14.424 31.1118 12.936V11.904C29.9918 13.28 28.4078 13.968 26.3598 13.968C24.2318 13.968 22.5918 13.368 21.4398 12.168C20.3038 10.952 19.7358 9.208 19.7358 6.936V1.2H23.6238V6.696C23.6238 8.008 23.9358 9 24.5598 9.672C25.1838 10.344 26.0638 10.68 27.1998 10.68C28.3998 10.68 29.3518 10.328 30.0558 9.624C30.7598 8.92 31.1118 7.856 31.1118 6.432V1.2H34.9998ZM52.5716 16.56C51.7716 17.104 50.7636 17.528 49.5476 17.832C48.3476 18.136 47.0676 18.288 45.7076 18.288C44.0116 18.288 42.5716 18.08 41.3876 17.664C40.2036 17.232 39.3076 16.64 38.6996 15.888C38.0916 15.12 37.7876 14.248 37.7876 13.272C37.7876 12.376 38.0356 11.584 38.5316 10.896C39.0276 10.208 39.7076 9.696 40.5716 9.36C39.9156 9.008 39.4036 8.528 39.0356 7.92C38.6836 7.312 38.5076 6.632 38.5076 5.88C38.5076 4.968 38.7876 4.136 39.3476 3.384C39.9076 2.632 40.7556 2.032 41.8916 1.584C43.0276 1.136 44.4196 0.912 46.0676 0.912C47.1556 0.912 48.2196 1.024 49.2596 1.248C50.2996 1.456 51.2036 1.744 51.9716 2.112L50.8916 5.088C49.4196 4.4 47.8596 4.056 46.2116 4.056C44.9636 4.056 44.0196 4.248 43.3796 4.632C42.7556 5 42.4436 5.504 42.4436 6.144C42.4436 6.736 42.6516 7.192 43.0676 7.512C43.4996 7.816 44.1476 7.968 45.0116 7.968H49.5956V11.04H44.7716C43.7956 11.04 43.0436 11.208 42.5156 11.544C41.9876 11.88 41.7236 12.368 41.7236 13.008C41.7236 13.68 42.0596 14.208 42.7316 14.592C43.4196 14.96 44.4676 15.144 45.8756 15.144C46.8676 15.144 47.8596 15.016 48.8516 14.76C49.8436 14.488 50.6836 14.112 51.3716 13.632L52.5716 16.56ZM54.8514 1.2H58.7394V14.832H67.1634V18H54.8514V1.2ZM69.3358 1.2H73.2238V14.832H81.6478V18H69.3358V1.2ZM89.5801 4.32V14.88H92.4841V18H82.7641V14.88H85.6921V4.32H82.7641V1.2H92.4841V4.32H89.5801ZM107.662 5.904C106.222 5.072 104.678 4.536 103.03 4.296V18H99.1417V4.296C97.4937 4.536 95.9417 5.072 94.4857 5.904L93.1657 3C94.3177 2.312 95.5657 1.792 96.9097 1.44C98.2537 1.088 99.6377 0.912 101.062 0.912C102.502 0.912 103.894 1.088 105.238 1.44C106.598 1.792 107.846 2.312 108.982 3L107.662 5.904ZM118.628 18.288C116.884 18.288 115.308 17.912 113.9 17.16C112.508 16.408 111.412 15.376 110.612 14.064C109.828 12.736 109.436 11.248 109.436 9.6C109.436 7.952 109.828 6.472 110.612 5.16C111.412 3.832 112.508 2.792 113.9 2.04C115.308 1.288 116.884 0.912 118.628 0.912C120.372 0.912 121.94 1.288 123.332 2.04C124.724 2.792 125.82 3.832 126.62 5.16C127.42 6.472 127.82 7.952 127.82 9.6C127.82 11.248 127.42 12.736 126.62 14.064C125.82 15.376 124.724 16.408 123.332 17.16C121.94 17.912 120.372 18.288 118.628 18.288ZM118.628 14.976C119.62 14.976 120.516 14.752 121.316 14.304C122.116 13.84 122.74 13.2 123.188 12.384C123.652 11.568 123.884 10.64 123.884 9.6C123.884 8.56 123.652 7.632 123.188 6.816C122.74 6 122.116 5.368 121.316 4.92C120.516 4.456 119.62 4.224 118.628 4.224C117.636 4.224 116.74 4.456 115.94 4.92C115.14 5.368 114.508 6 114.044 6.816C113.596 7.632 113.372 8.56 113.372 9.6C113.372 10.64 113.596 11.568 114.044 12.384C114.508 13.2 115.14 13.84 115.94 14.304C116.74 14.752 117.636 14.976 118.628 14.976ZM145.766 1.2V18H141.998V15.96C140.846 17.512 139.15 18.288 136.91 18.288C134.926 18.288 133.374 17.664 132.254 16.416C131.15 15.152 130.598 13.36 130.598 11.04V1.2H134.486V10.92C134.486 12.264 134.798 13.28 135.422 13.968C136.062 14.64 136.926 14.976 138.014 14.976C139.182 14.976 140.118 14.616 140.822 13.896C141.526 13.16 141.878 12.08 141.878 10.656V1.2H145.766ZM161.99 5.904C160.55 5.072 159.006 4.536 157.358 4.296V18H153.47V4.296C151.822 4.536 150.27 5.072 148.814 5.904L147.494 3C148.646 2.312 149.894 1.792 151.238 1.44C152.582 1.088 153.966 0.912 155.39 0.912C156.83 0.912 158.222 1.088 159.566 1.44C160.926 1.792 162.174 2.312 163.31 3L161.99 5.904Z" fill="#333333" />
                    </svg>
                </div>
                <motion.div initial={{ translateY: 50, opacity: 0 }} whileInView={{ translateY: 0, opacity: 1 }}>
                    <Table className="max-w-4xl mx-auto bg-white rounded-xl shadow">
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader className="border-b border-black">
                            <TableRow className="border-b border-black">
                                <TableHead className="w-1/2 font-semibold md:text-lg text-black">Key Features</TableHead>
                                <TableHead className="w-1/4 p-2 bg-emerald-100">  <svg className="h-2.5 md:h-4 mx-auto" fill="red" viewBox="0 0 164 21" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.016 1.2V18H12.248V15.96C11.096 17.512 9.4 18.288 7.16 18.288C5.176 18.288 3.624 17.664 2.504 16.416C1.4 15.152 0.848 13.36 0.848 11.04V1.2H4.736V10.92C4.736 12.264 5.048 13.28 5.672 13.968C6.312 14.64 7.176 14.976 8.264 14.976C9.432 14.976 10.368 14.616 11.072 13.896C11.776 13.16 12.128 12.08 12.128 10.656V1.2H16.016ZM34.9998 1.2V12.744C34.9998 15.272 34.2958 17.208 32.8878 18.552C31.4798 19.912 29.5358 20.592 27.0558 20.592C25.6318 20.592 24.3278 20.392 23.1438 19.992C21.9598 19.608 20.9518 19.056 20.1198 18.336L21.6318 15.456C23.1518 16.688 24.9278 17.304 26.9598 17.304C28.3678 17.304 29.4078 16.952 30.0798 16.248C30.7678 15.528 31.1118 14.424 31.1118 12.936V11.904C29.9918 13.28 28.4078 13.968 26.3598 13.968C24.2318 13.968 22.5918 13.368 21.4398 12.168C20.3038 10.952 19.7358 9.208 19.7358 6.936V1.2H23.6238V6.696C23.6238 8.008 23.9358 9 24.5598 9.672C25.1838 10.344 26.0638 10.68 27.1998 10.68C28.3998 10.68 29.3518 10.328 30.0558 9.624C30.7598 8.92 31.1118 7.856 31.1118 6.432V1.2H34.9998ZM52.5716 16.56C51.7716 17.104 50.7636 17.528 49.5476 17.832C48.3476 18.136 47.0676 18.288 45.7076 18.288C44.0116 18.288 42.5716 18.08 41.3876 17.664C40.2036 17.232 39.3076 16.64 38.6996 15.888C38.0916 15.12 37.7876 14.248 37.7876 13.272C37.7876 12.376 38.0356 11.584 38.5316 10.896C39.0276 10.208 39.7076 9.696 40.5716 9.36C39.9156 9.008 39.4036 8.528 39.0356 7.92C38.6836 7.312 38.5076 6.632 38.5076 5.88C38.5076 4.968 38.7876 4.136 39.3476 3.384C39.9076 2.632 40.7556 2.032 41.8916 1.584C43.0276 1.136 44.4196 0.912 46.0676 0.912C47.1556 0.912 48.2196 1.024 49.2596 1.248C50.2996 1.456 51.2036 1.744 51.9716 2.112L50.8916 5.088C49.4196 4.4 47.8596 4.056 46.2116 4.056C44.9636 4.056 44.0196 4.248 43.3796 4.632C42.7556 5 42.4436 5.504 42.4436 6.144C42.4436 6.736 42.6516 7.192 43.0676 7.512C43.4996 7.816 44.1476 7.968 45.0116 7.968H49.5956V11.04H44.7716C43.7956 11.04 43.0436 11.208 42.5156 11.544C41.9876 11.88 41.7236 12.368 41.7236 13.008C41.7236 13.68 42.0596 14.208 42.7316 14.592C43.4196 14.96 44.4676 15.144 45.8756 15.144C46.8676 15.144 47.8596 15.016 48.8516 14.76C49.8436 14.488 50.6836 14.112 51.3716 13.632L52.5716 16.56ZM54.8514 1.2H58.7394V14.832H67.1634V18H54.8514V1.2ZM69.3358 1.2H73.2238V14.832H81.6478V18H69.3358V1.2ZM89.5801 4.32V14.88H92.4841V18H82.7641V14.88H85.6921V4.32H82.7641V1.2H92.4841V4.32H89.5801ZM107.662 5.904C106.222 5.072 104.678 4.536 103.03 4.296V18H99.1417V4.296C97.4937 4.536 95.9417 5.072 94.4857 5.904L93.1657 3C94.3177 2.312 95.5657 1.792 96.9097 1.44C98.2537 1.088 99.6377 0.912 101.062 0.912C102.502 0.912 103.894 1.088 105.238 1.44C106.598 1.792 107.846 2.312 108.982 3L107.662 5.904ZM118.628 18.288C116.884 18.288 115.308 17.912 113.9 17.16C112.508 16.408 111.412 15.376 110.612 14.064C109.828 12.736 109.436 11.248 109.436 9.6C109.436 7.952 109.828 6.472 110.612 5.16C111.412 3.832 112.508 2.792 113.9 2.04C115.308 1.288 116.884 0.912 118.628 0.912C120.372 0.912 121.94 1.288 123.332 2.04C124.724 2.792 125.82 3.832 126.62 5.16C127.42 6.472 127.82 7.952 127.82 9.6C127.82 11.248 127.42 12.736 126.62 14.064C125.82 15.376 124.724 16.408 123.332 17.16C121.94 17.912 120.372 18.288 118.628 18.288ZM118.628 14.976C119.62 14.976 120.516 14.752 121.316 14.304C122.116 13.84 122.74 13.2 123.188 12.384C123.652 11.568 123.884 10.64 123.884 9.6C123.884 8.56 123.652 7.632 123.188 6.816C122.74 6 122.116 5.368 121.316 4.92C120.516 4.456 119.62 4.224 118.628 4.224C117.636 4.224 116.74 4.456 115.94 4.92C115.14 5.368 114.508 6 114.044 6.816C113.596 7.632 113.372 8.56 113.372 9.6C113.372 10.64 113.596 11.568 114.044 12.384C114.508 13.2 115.14 13.84 115.94 14.304C116.74 14.752 117.636 14.976 118.628 14.976ZM145.766 1.2V18H141.998V15.96C140.846 17.512 139.15 18.288 136.91 18.288C134.926 18.288 133.374 17.664 132.254 16.416C131.15 15.152 130.598 13.36 130.598 11.04V1.2H134.486V10.92C134.486 12.264 134.798 13.28 135.422 13.968C136.062 14.64 136.926 14.976 138.014 14.976C139.182 14.976 140.118 14.616 140.822 13.896C141.526 13.16 141.878 12.08 141.878 10.656V1.2H145.766ZM161.99 5.904C160.55 5.072 159.006 4.536 157.358 4.296V18H153.47V4.296C151.822 4.536 150.27 5.072 148.814 5.904L147.494 3C148.646 2.312 149.894 1.792 151.238 1.44C152.582 1.088 153.966 0.912 155.39 0.912C156.83 0.912 158.222 1.088 159.566 1.44C160.926 1.792 162.174 2.312 163.31 3L161.99 5.904Z" fill="#333333" />
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