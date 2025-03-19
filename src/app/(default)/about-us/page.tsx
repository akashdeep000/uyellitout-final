"use client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CheckCheck, ChevronLeft, ChevronRight, CircleCheck, CircleCheckBig, Instagram, Linkedin, Mail, PhoneCall, Quote, Triangle } from "lucide-react";
import { motion, useSpring, useTransform } from "motion/react";
import { useState } from "react";

export default function Page() {
    const schoolSpring = useSpring(23, { mass: 0.8, stiffness: 75, damping: 15 });
    const schoolCount = useTransform(schoolSpring, (current) =>
        Math.round(current).toLocaleString()
    );

    const parentsSpring = useSpring(17, { mass: 0.8, stiffness: 75, damping: 15 });
    const parentsCount = useTransform(parentsSpring, (current) =>
        Math.round(current).toLocaleString()
    );

    const clientsSpring = useSpring(12, { mass: 0.8, stiffness: 75, damping: 15 });
    const clientsCount = useTransform(clientsSpring, (current) =>
        Math.round(current).toLocaleString()
    );

    const [animationParent] = useAutoAnimate();
    const [list, setList] = useState([1, 2, 3]);

    const listsDetails = [
        {
            "title": "Tailored Student Counselling programs",
            "features": ["Personalized counseling sessions (one-on-one & group)", "Address stress, bullying, and emotional challenges", "Focus on coping strategies and resilience"],
            "benifits": ["Better emotional regulation and well-being", "Improved coping skills for tough situations", "Enhanced academic performance and growth"]
        },
        {
            "title": "Empowering Educators for Student Well-Being",
            "features": ["Conduct workshops on emotional distress recognition", "Teach effective classroom management techniques", "Promote nurturing learning environments"],
            "benifits": ["Enhanced teacher-student emotional support", "Reduced teacher stress and burnout", "Improved empathy and classroom dynamics"]
        },
        {
            "title": "Building Stronger Parent-Teen Connections",
            "features": ["Offer tools for effective communication with teens", "Help parents manage adolescent emotional challenges", "Educate on recognizing signs of emotional distress"],
            "benifits": ["Strengthened parent-child relationships", "Improved communication and understanding", "Early identification of emotional challenges"]
        },
        {
            "title": "Creating a Mentally Healthy School Environment",
            "features": ["Provide training for staff, students, and parents", "Enhance emotional intelligence across the school community", "Promote mental health awareness and reduce stigma"],
            "benifits": ["Increased awareness and understanding of mental health", "Reduced stigma surrounding emotional well-being", "Improved overall student well-being"]
        },
        {
            "title": "Empowering Peer Support Leaders",
            "features": ["Train students to be empathetic peer mentors", "Equip students with leadership and emotional support skills", "Foster a supportive school environment through peer mentoring"],
            "benifits": ["Enhanced leadership and empathy skills", "Stronger peer support network", "A more connected and compassionate school community"]
        }
    ];

    return (
        <main>
            <section>
                <div className="flex flex-col items-center justify-center gap-4 p-8 md:p-10 lg:p-12">
                    <h1 className="text-4xl text-center text-[#198A70]">ABOUT US</h1>
                    <p className="text-center max-w-5xl [&_b]:text-[#79C8AD]">
                        At <b>UYellItOut</b>, we create a <b>safe space</b> for self-expression, <b>healing</b>, and  <b>growth</b>. Our approach blends compassion with <b>evidence-based techniques</b> to help you navigate life’s challenges. Whether it’s stress, anxiety, relationships, or personal growth, <b>we’re here</b> to guide you every step of the way.                    </p>
                </div>
            </section>
            <section className="bg-[#C5DCE4] md:flex md:flex-row-reverse md:justify-evenly items-center gap-4 p-4 md:p-6 lg:p-8">
                <div className="p-10 pt-2">
                    <div className="mx-auto w-60 aspect-square rounded-full bg-neutral-200 relative">
                        <img className="w-full h-full" src="/founder.svg" alt="" />
                        <div className="group absolute top-[15%] p-2 rounded-full bg-background hover:bg-[#E1306C] transition-all">
                            <a href="https://www.instagram.com/uyellitout"><Instagram className="group-hover:stroke-white" /></a>
                        </div>
                        <div className="group absolute top-[10%] right-[5%] p-2 rounded-full bg-background hover:bg-black transition-all">
                            <a href="tel:+918584034584"><PhoneCall className="group-hover:stroke-white p-0.5" /></a>
                        </div>
                        <div className="group absolute top-[55%] left-[-6%] p-2.5 rounded-full bg-background hover:bg-blue-600 transition-all">
                            <a href="https://www.linkedin.com/in/srishti-singh-611142218"><Linkedin className="group-hover:stroke-white" size={20} /></a>
                        </div>
                        <div className="group absolute top-[45%] right-[-7%] p-2 rounded-full bg-background hover:bg-black transition-all">
                            <a href="mailto:uyellitout@gmail.com"><Mail className="group-hover:stroke-white" /></a>
                        </div>
                    </div>
                </div>
                <div className="space-y-2 max-w-prose">
                    <div className="grid place-items-center">
                        <div className="relative text-4xl">
                            Meet The Founder
                            {/* <motion.svg className="absolute top-[-0.6rem] left-[-0.4rem] h-14" viewBox="0 0 177 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    d="M136.738 22.0442C120.251 22.0442 104.961 17.0293 88.7386 16.1281C76.0759 15.4246 59.9558 20.9766 48.3303 26.0627C35.5899 31.6366 15.1421 38.9869 10.6009 53.7458C8.84756 59.4442 10.9912 64.7517 15.5124 68.3687C22.9789 74.3419 32.2367 86.9938 42.1909 88.238C59.9723 90.4607 75.8589 92.3682 94.0966 92.3682C111.337 92.3682 127.794 92.4942 144.328 87.2334C151.007 85.1083 168.968 78.0133 172.458 71.3826C178.027 60.8 172.546 43.4854 162.635 37.1136C146.293 26.6082 126.653 26.5808 107.492 28.5185C79.8162 31.3171 41.6232 35.4767 19.5309 54.0807C13.3333 59.2997 -1.8822 75.0896 3.01039 84.3311C12.1273 101.552 47.5235 110.451 65.5206 110.451C87.6474 110.451 106.715 107.718 125.575 95.4937C143.785 83.6911 174.345 57.4486 164.421 31.644C158.807 17.0494 129.487 1.95166 114.747 1.95166C100.562 1.95166 90.7939 3.55699 82.4876 16.0164" stroke="black" strokeWidth="3" strokeLinecap="round" />
                            </motion.svg> */}
                        </div>
                    </div>
                    <p className="pt-6 [&_b]:font-semibold [&_b]:text-xl">
                        Hello!<br /><br /> I’m <b>Srishti Singh</b>, a  Psychologist and the founder of <b>UYellItOut</b>, where I’m passionate about making mental health support both <b>accessible</b> and <b>transformative</b>.<br /><br /> With a background in Clinical Psychology, I combine evidence-based practices like <b>CBT</b>, <b>Expressive Arts</b>, and <b>Mindfulness</b> to help individuals and schools navigate emotional challenges, build resilience, and unlock their true potential. <br /><br /> My approach isn’t about offering quick fixes; it’s about creating a safe space for self-discovery, growth, and real transformation.<br /><br />My mission is simple: To make sure everyone feels heard, supported, and equipped to overcome life’s hurdles with confidence and resilience.
                    </p>
                </div>

            </section>
            <section className="pt-10 space-y-6">
                <p className="px-6 py-4 text-3xl text-center">
                    <Quote className="inline fill-emerald-400 stroke-none rotate-180 -translate-y-2 mr-1" />
                    Your Voice Matters, We Are Here To Help You Thrive
                    <Quote className="inline fill-emerald-400 stroke-none -translate-y-2 ml-1" />
                </p>
                <p className="px-6 py-4 text-4xl text-center text-[#198A70]">OUR EXPERTISE</p>
                <div className="px-6 pb-8 flex flex-wrap gap-6 justify-center">
                    <div className="w-80 bg-[#8DAA64] rounded-2xl text-background p-4 space-y-2  grid content-between">
                        <div className="space-y-1">
                            <CircleCheckBig className=" stroke-background rounded-full" />
                            <p className="font-semibold">Holistic Mental Health Care</p>
                            <p className="text-xs">With expertise and experience, we provide compassionate, effective psychological support.</p>
                        </div>
                        <div className="">
                            <div className="h-px bg-background mb-4" />
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Healing through Expressive Arts</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Transforming Thoughts with CBT</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Practical Goal Strategies</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Mindfulness for Balance</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Client-Driven Growth</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-80 bg-[#8DAA64] rounded-2xl text-background p-4 space-y-2 grid content-between">
                        <div className="space-y-1">
                            <CircleCheckBig className=" stroke-background rounded-full" />
                            <p className="font-semibold">Youth and School Counselling</p>
                            <p className="text-xs">Years of guiding students through challenges, building resilience, and fostering emotional growth.</p>
                        </div>

                        <div className="">
                            <div className="h-px bg-background mb-4" />
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Building Confidence in Young Minds</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Academic Stress Management</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Nurturing Positive Self-Image</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Addressing Emotional Needs</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Supporting Personal Growth</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-80 bg-[#8DAA64] rounded-2xl text-background p-4 space-y-2 grid content-between">
                        <div className="space-y-1">
                            <CircleCheckBig className=" stroke-background rounded-full" />
                            <p className="font-semibold">Evidence based techniques</p>
                            6``         <p className="text-xs">
                                Diverse range of therapeutic techniques tailored to meet the unique needs of each individual.
                            </p>
                        </div>
                        <div className="">
                            <div className="h-px bg-background mb-4" />
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Cognitive Behavioral Therapy (CBT)</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Expressive Arts Therapy</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Workshops and Training for Educators</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">School-Based Mental Health Programs</p>
                            </div>
                            <div className="flex gap-2">
                                <Triangle className="fill-background size-3 rotate-90 translate-y-1" />
                                <p className="text-sm">Anxiety And Depression Management</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-6 md:flex md:gap-10 md:space-y-0 space-y-6 text-2xl justify-center content-center py-12 bg-[#79C8AD]">
                    <p className="text-center">
                        <motion.span onViewportEnter={() => schoolSpring.set(53)} onViewportLeave={() => schoolSpring.set(25)} className="text-4xl">{schoolCount}</motion.span>{"+ "}
                        Workshops
                    </p>
                    <p className="text-center">
                        <motion.span onViewportEnter={() => parentsSpring.set(37)} onViewportLeave={() => parentsSpring.set(18)} className="text-4xl">{parentsCount}</motion.span>{"+ "}
                        Parent seminars
                    </p>
                    <p className="text-center">
                        <motion.span onViewportEnter={() => clientsSpring.set(28)} onViewportLeave={() => clientsSpring.set(12)} className="text-4xl">{clientsCount}</motion.span>{"+ "}
                        Training sessions
                    </p>
                </div>
            </section>
            <section className="px-4 py-10 space-y-4">
                <p className="text-4xl text-center text-[#198A70]">WHY CHOOSE US?</p>
                <p className="mx-auto text-center max-w-prose"><b className="text-[#79C8AD]">At UYellItOut</b>, we deliver personalized, evidence-based mental health support that drives real change. Here’s what sets us apart.</p>
                <div className="space-y-12 pt-10">
                    {
                        [
                            {
                                title: "Goal-Oriented Therapy",
                                description: "Our structured, results-driven approach ensures measurable progress with clear goals and actionable plans.",
                                icon: <CircleCheckBig />
                            },
                            {
                                title: "Specialized Support for Children & Teens",
                                description: "We use Expressive Arts Therapy to build resilience and focus on boosting confidence, emotional intelligence, and social skills in children and teens.",
                                icon: <CircleCheckBig />
                            },
                            {
                                title: "Impactful Workshops for Schools",
                                description: "Our tailored sessions help students manage bullying, social anxiety, and academic stress, while empowering parents to recognize signs of distress and offer support.",
                                icon: <CircleCheckBig />
                            },
                            {
                                title: "Personalized & Inclusive Approach",
                                description: "Every therapeutic plan and workshop is uniquely designed to meet specific needs and deliver meaningful results.",
                                icon: <CircleCheckBig />
                            },
                            {
                                title: "Fostering Positive School Environments",
                                description: "We help schools create supportive spaces that boost self-esteem, improve social skills, and enhance communication.",
                                icon: <CircleCheckBig />
                            },
                            {
                                title: "Proven Impact",
                                description: "Our collaborations with schools and families have led to significant improvements in emotional regulation, communication, and overall well-being.",
                                icon: <CircleCheckBig />
                            }
                        ].map((item, index) => (
                            <div key={index} className={`flex flex-wrap justify-evenly items-center gap-4 ${index % 2 ? null : "sm:flex-row-reverse"}`}>
                                <div className="sm:w-52 w-[50%] aspect-video grid place-items-center text-neutral-500">
                                    <img className="w-full h-full" src={`/about/a-${index + 1}.svg`} alt="" />
                                </div>
                                <div className="space-y-1 max-w-sm">
                                    <p className={`text-xl font-semibold ${index % 2 ? "sm:text-right" : null}`}>{`${index + 1}. ${item.title}`}</p>
                                    <p className={`text-sm ${index % 2 ? "sm:text-right" : null}`}>{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section className="px-4 py-10">
                <p className="text-3xl text-center font-semibold text-[#198A70]">SUPPORTING SCHOOLS</p>
                <p className="text-xl text-center text-[#198A70]"> Fostering Emotional Well-being & Resilience</p>
                <p className="text-sm text-center max-w-4xl mx-auto mt-3">
                    <b className="text-[#79C8AD]">At UYellItOut</b>, our mission is to help schools create supportive, holistic environments that nurture emotional well-being and resilience for students, educators, and parents alike.<br />Here’s how we help schools create a thriving community:
                </p>
                <Carousel className="w-full max-w-lg mx-auto mt-8 lg:hidden px-9">
                    <CarouselContent className="-ml-0.5 mr-0.5">
                        {listsDetails.map((listDetail, index) => (
                            <CarouselItem key={index} className="rounded-xl pl-2 lg:basis-1/3">
                                <div className="h-full flex flex-col rounded-xl bg-neutral-200">
                                    <div className="w-full aspect-video p-4">
                                        <img className="w-full h-full" src={`/about/b-${index + 1}.svg`} />
                                    </div>
                                    <p className="font-semibold p-2 text-center text-white bg-teal-700">{`${index + 1}. ${listDetail.title}`}</p>
                                    <div className="w-full flex-1 rounded-b-xl aspect-video bg-teal-600 text-background py-2">
                                        <p className="px-4 py-1 text-sm font-semibold">What We Do:</p>
                                        {
                                            listDetail.features.map((feature, index) => (
                                                <div key={index} className="grid grid-cols-[auto_1fr] gap-1.5 px-4 p-0.5">
                                                    <CircleCheck className="size-3.5 mt-0.5" strokeWidth={3} />
                                                    <p className="text-xs">{feature}</p>
                                                </div>
                                            ))
                                        }
                                        <p className="px-4 py-1 pt-2 text-sm font-semibold">Benefits:</p>
                                        {
                                            listDetail.benifits.map((feature, index) => (
                                                <div key={index} className="grid grid-cols-[auto_1fr] gap-1.5 px-4 p-0.5">
                                                    <CheckCheck className="size-3.5 mt-0.5" strokeWidth={3} />
                                                    <p className="text-xs">{feature}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                </Carousel>
                <div className="hidden lg:block relative px-10 max-w-4xl mx-auto py-14">
                    <div className="grid grid-cols-3 gap-8" ref={animationParent}>
                        {
                            list.map((item, index) => (
                                <div key={item} className={`bg-neutral-200 rounded-lg transition-all ${index === 1 ? "scale-110" : null}`}>
                                    <div className="w-full aspect-video p-4">
                                        <img className="w-full h-full" src={`/about/b-${item}.svg`} />
                                    </div>
                                    <p className="font-semibold p-2 text-center text-white bg-teal-700">{`${item}. ${listsDetails[item - 1].title}`}</p>
                                    <div className="w-full rounded-b-lg aspect-video bg-teal-600 text-background py-2">
                                        <p className="px-4 py-1 text-sm font-semibold">What We Do:</p>
                                        {
                                            listsDetails[item - 1].features.map((feature, index) => (
                                                <div key={index} className="grid grid-cols-[auto_1fr] gap-1.5 px-4 p-0.5">
                                                    <CircleCheck className="size-3.5 mt-0.5" strokeWidth={3} />
                                                    <p className="text-xs">{feature}</p>
                                                </div>
                                            ))
                                        }
                                        <p className="px-4 py-1 pt-2 text-sm font-semibold">Benefits:</p>
                                        {
                                            listsDetails[item - 1].benifits.map((feature, index) => (
                                                <div key={index} className="grid grid-cols-[auto_1fr] gap-1.5 px-4 p-0.5">
                                                    <CheckCheck className="size-3.5 mt-0.5" strokeWidth={3} />
                                                    <p className="text-xs">{feature}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Button className="absolute top-[calc(50%_-1.25rem)] -left-2 w-10 h-10 p-2 rounded-full" variant={"secondary"} onClick={() => {
                        setList([(list[0] === 1 ? 5 : list[0] - 1), list[0], list[1]]);
                    }}>
                        <ChevronLeft />
                    </Button>
                    <Button className="absolute top-[calc(50%_-1.25rem)] -right-2 w-10 h-10 p-2 rounded-full" variant={"secondary"} onClick={() => {
                        setList([list[1], list[2], (list[2] === 5 ? 1 : (list[2] + 1))]);
                    }}>
                        <ChevronRight />
                    </Button>
                </div>
            </section>
            <section className="pb-10">
                <div className="text-3xl text-center font-semibold text-[#198A70] flex justify-center items-center gap-3">
                    <p>THE</p>
                    <svg className="h-7 pt-1" viewBox="0 0 164 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.016 1.2V18H12.248V15.96C11.096 17.512 9.4 18.288 7.16 18.288C5.176 18.288 3.624 17.664 2.504 16.416C1.4 15.152 0.848 13.36 0.848 11.04V1.2H4.736V10.92C4.736 12.264 5.048 13.28 5.672 13.968C6.312 14.64 7.176 14.976 8.264 14.976C9.432 14.976 10.368 14.616 11.072 13.896C11.776 13.16 12.128 12.08 12.128 10.656V1.2H16.016ZM34.9998 1.2V12.744C34.9998 15.272 34.2958 17.208 32.8878 18.552C31.4798 19.912 29.5358 20.592 27.0558 20.592C25.6318 20.592 24.3278 20.392 23.1438 19.992C21.9598 19.608 20.9518 19.056 20.1198 18.336L21.6318 15.456C23.1518 16.688 24.9278 17.304 26.9598 17.304C28.3678 17.304 29.4078 16.952 30.0798 16.248C30.7678 15.528 31.1118 14.424 31.1118 12.936V11.904C29.9918 13.28 28.4078 13.968 26.3598 13.968C24.2318 13.968 22.5918 13.368 21.4398 12.168C20.3038 10.952 19.7358 9.208 19.7358 6.936V1.2H23.6238V6.696C23.6238 8.008 23.9358 9 24.5598 9.672C25.1838 10.344 26.0638 10.68 27.1998 10.68C28.3998 10.68 29.3518 10.328 30.0558 9.624C30.7598 8.92 31.1118 7.856 31.1118 6.432V1.2H34.9998ZM52.5716 16.56C51.7716 17.104 50.7636 17.528 49.5476 17.832C48.3476 18.136 47.0676 18.288 45.7076 18.288C44.0116 18.288 42.5716 18.08 41.3876 17.664C40.2036 17.232 39.3076 16.64 38.6996 15.888C38.0916 15.12 37.7876 14.248 37.7876 13.272C37.7876 12.376 38.0356 11.584 38.5316 10.896C39.0276 10.208 39.7076 9.696 40.5716 9.36C39.9156 9.008 39.4036 8.528 39.0356 7.92C38.6836 7.312 38.5076 6.632 38.5076 5.88C38.5076 4.968 38.7876 4.136 39.3476 3.384C39.9076 2.632 40.7556 2.032 41.8916 1.584C43.0276 1.136 44.4196 0.912 46.0676 0.912C47.1556 0.912 48.2196 1.024 49.2596 1.248C50.2996 1.456 51.2036 1.744 51.9716 2.112L50.8916 5.088C49.4196 4.4 47.8596 4.056 46.2116 4.056C44.9636 4.056 44.0196 4.248 43.3796 4.632C42.7556 5 42.4436 5.504 42.4436 6.144C42.4436 6.736 42.6516 7.192 43.0676 7.512C43.4996 7.816 44.1476 7.968 45.0116 7.968H49.5956V11.04H44.7716C43.7956 11.04 43.0436 11.208 42.5156 11.544C41.9876 11.88 41.7236 12.368 41.7236 13.008C41.7236 13.68 42.0596 14.208 42.7316 14.592C43.4196 14.96 44.4676 15.144 45.8756 15.144C46.8676 15.144 47.8596 15.016 48.8516 14.76C49.8436 14.488 50.6836 14.112 51.3716 13.632L52.5716 16.56ZM54.8514 1.2H58.7394V14.832H67.1634V18H54.8514V1.2ZM69.3358 1.2H73.2238V14.832H81.6478V18H69.3358V1.2ZM89.5801 4.32V14.88H92.4841V18H82.7641V14.88H85.6921V4.32H82.7641V1.2H92.4841V4.32H89.5801ZM107.662 5.904C106.222 5.072 104.678 4.536 103.03 4.296V18H99.1417V4.296C97.4937 4.536 95.9417 5.072 94.4857 5.904L93.1657 3C94.3177 2.312 95.5657 1.792 96.9097 1.44C98.2537 1.088 99.6377 0.912 101.062 0.912C102.502 0.912 103.894 1.088 105.238 1.44C106.598 1.792 107.846 2.312 108.982 3L107.662 5.904ZM118.628 18.288C116.884 18.288 115.308 17.912 113.9 17.16C112.508 16.408 111.412 15.376 110.612 14.064C109.828 12.736 109.436 11.248 109.436 9.6C109.436 7.952 109.828 6.472 110.612 5.16C111.412 3.832 112.508 2.792 113.9 2.04C115.308 1.288 116.884 0.912 118.628 0.912C120.372 0.912 121.94 1.288 123.332 2.04C124.724 2.792 125.82 3.832 126.62 5.16C127.42 6.472 127.82 7.952 127.82 9.6C127.82 11.248 127.42 12.736 126.62 14.064C125.82 15.376 124.724 16.408 123.332 17.16C121.94 17.912 120.372 18.288 118.628 18.288ZM118.628 14.976C119.62 14.976 120.516 14.752 121.316 14.304C122.116 13.84 122.74 13.2 123.188 12.384C123.652 11.568 123.884 10.64 123.884 9.6C123.884 8.56 123.652 7.632 123.188 6.816C122.74 6 122.116 5.368 121.316 4.92C120.516 4.456 119.62 4.224 118.628 4.224C117.636 4.224 116.74 4.456 115.94 4.92C115.14 5.368 114.508 6 114.044 6.816C113.596 7.632 113.372 8.56 113.372 9.6C113.372 10.64 113.596 11.568 114.044 12.384C114.508 13.2 115.14 13.84 115.94 14.304C116.74 14.752 117.636 14.976 118.628 14.976ZM145.766 1.2V18H141.998V15.96C140.846 17.512 139.15 18.288 136.91 18.288C134.926 18.288 133.374 17.664 132.254 16.416C131.15 15.152 130.598 13.36 130.598 11.04V1.2H134.486V10.92C134.486 12.264 134.798 13.28 135.422 13.968C136.062 14.64 136.926 14.976 138.014 14.976C139.182 14.976 140.118 14.616 140.822 13.896C141.526 13.16 141.878 12.08 141.878 10.656V1.2H145.766ZM161.99 5.904C160.55 5.072 159.006 4.536 157.358 4.296V18H153.47V4.296C151.822 4.536 150.27 5.072 148.814 5.904L147.494 3C148.646 2.312 149.894 1.792 151.238 1.44C152.582 1.088 153.966 0.912 155.39 0.912C156.83 0.912 158.222 1.088 159.566 1.44C160.926 1.792 162.174 2.312 163.31 3L161.99 5.904Z" fill="#333333" />
                    </svg>
                    <p>APPROCH</p>
                </div>
                <p className="mx-auto text-center text-2xl max-w-prose text-[#198A70]">Tailored, Compassionate, and Effective</p>
                <p className="text-sm text-center max-w-4xl mx-auto mt-3">At UYellItOut, we know every school community is unique, with its own challenges and goals. That’s why we offer customized solutions designed to meet your specific needs.</p>
                <div className="p-4 grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                    <div className="space-y-2">
                        <p className="text-lg">What We Do:</p>
                        <div className="space-y-2">
                            <p className="px-4 py-5 bg-neutral-200 rounded-lg">Personalized Therapy for students, addressing their unique emotional needs.</p>
                            <p className="px-4 py-5 bg-neutral-200 rounded-lg">Empower Teachers with tools to create supportive and emotionally intelligent classrooms.</p>
                            <p className="px-4 py-5 bg-neutral-200 rounded-lg">Support Parents to better understand and guide their children’s emotional development.</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg">Our Promises:</p>
                        <div className="space-y-2">
                            <p className="px-4 py-5 bg-neutral-200 rounded-lg">Emotional Wellness integrated with academic success.</p>
                            <p className="px-4 py-5 bg-neutral-200 rounded-lg">Action-Oriented solutions with measurable results.</p>
                            <p className="px-4 py-5 bg-neutral-200 rounded-lg">A Thriving, Inclusive Community where every student feels safe and supported.</p>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-center max-w-4xl mx-auto mt-3">                Working with UYellItOut means creating a school environment where emotional health and academic growth go hand-in-hand, giving every student the opportunity to thrive.
                </p>
            </section>
        </main>
    );
}
