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
                            <p className="text-xs">
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
                <p className="text-4xl text-center text-[#198A70]">SUPPORTING SCHOOLS</p>
                <p className="text-xl text-center text-[#198A70]"> Fostering Emotional Well-being & Resilience</p>
                <p className="text-sm text-center max-w-4xl mx-auto mt-3">
                    <b className="text-[#79C8AD]">At UYellItOut</b>, our mission is to help schools create supportive, holistic environments that nurture emotional well-being and resilience for students, educators, and parents alike.<br /><br />Here’s how we help schools create a thriving community:
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
            <section className="space-y-4">
                <div className="text-4xl text-center text-[#198A70] flex justify-center items-center gap-3">
                    <p>Our Approch</p>
                </div>
                <p className="text-sm text-center max-w-4xl mx-auto mt-3">At UYellItOut, we know every school community is unique, with its own challenges and goals. That’s why we offer customized solutions designed to meet your specific needs.</p>

                <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto p-6">
                    {
                        ["Tailored", "Compassionate", "Effective"].map((item, index) => (
                            <div key={index} className="space-y-4">
                                <p className="text-sm sm:text-lg md:text-xl text-[#198a70f1] font-semibold text-center">{item}</p>
                                <div className="w-full aspect-video grid place-items-center text-neutral-500">
                                    <img className="w-full h-full" src={`/about/c-${index + 1}.svg`} alt="" />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="bg-[#8fdeb3] p-6 grid gap-6">
                    <div className="text-4xl text-center font-semibold text-[#198A70] flex justify-center items-center gap-3">
                        <p className="text-4xl text-white"><span className="text-lg">Our</span> PROMISES</p>
                    </div>
                    <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto mt-6">
                        {
                            ["Results-Driven Mental Wellness", "100% Private & Confidential", "Safe Judgement-Free Space", "Tailored Therapy Plans"].map((item, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="w-full max-w-32 mx-auto aspect-video grid place-items-center text-neutral-500">
                                        <img className="w-full h-full" src={`/about/d-${index + 1}.svg`} alt="" />
                                    </div>
                                    <p className="text-sm sm:text-md md:text-lg text-white font-semibold text-center">{item}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}
