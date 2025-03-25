"use client";
import { NewBooking } from "@/components/bookings/new-booking";
import { SchoolContactForm } from "@/components/forms/school-contact-form";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    MorphingDialog,
    MorphingDialogClose,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogDescription,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import { packages, services } from "@/configs/data";
import { Triangle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const assessments = [
        {
            title: "Intelligent Tests (IQ Tests)",
            tests: [
                "Wechsler Adult Intelligence Scale (WAIS): ₹3,999",
                "Wechsler Intelligence Scale for Children (WISC): ₹3,999",
                "Raven's Progressive Matrices (Non-verbal test): ₹3,499",
                "Binet-Kamat Test of Intelligence (Indian adaptation): ₹2,999",
            ]
        },
        {
            title: "Personality Assesment",
            tests: [
                "Eysenck Personality Questionnaire (EPQ): ₹2,499",
                "16 Personality Factor Questionnaire (16PF): ₹2,799",
                "Thematic Apperception Test (TAT): ₹2,499",
            ]
        },
        {
            title: "Projective Tests",
            tests: [
                "Draw-A-Person Test: ₹1,999",
                "Sentence Completion Test: ₹1,999",
                "House-Tree-Person Test: ₹1,999",
            ]
        },
        {
            title: "Neuropsychological Assesments",
            tests: [
                "Trail Making Test (TMT): ₹1,799",
                "Clock Drawing Test: ₹1,799",
                "Bender Visual-Motor Gestalt Test: ₹1,999",
            ]
        },
        {
            title: "Behavioral Assesments",
            tests: [
                "Behavioral Assessment System for Children (BASC): ₹2,499",
                "Child Behavior Checklist (CBCL): ₹2,199",
            ]
        },
        {
            title: "Diagnostic & Symptom-Specific Assesments",
            tests: [
                "Beck Depression Inventory (BDI): ₹1,799",
                "Beck Anxiety Inventory (BAI): ₹1,800",
                "Children’s Depression Inventory (CDI): ₹1,799",
            ]
        },
        {
            title: "Cognitive & Memory Assesments",
            tests: [
                "Wechsler Memory Scale (WMS): ₹1,999",
                "Digit Span Test: ₹1,499",
                "CANTAB Cognitive Battery: ₹2,999",
            ]
        },
        {
            title: "Social & Emotional Assesments",
            tests: [
                "Social Skills Inventory: ₹1,999",
                "Emotional Intelligence Test (Bar-On EQ-i): ₹2,199",
            ]
        },
        {
            title: "Attention & Hyperactivity Test",
            tests: [
                "Conners Rating Scale: ₹1,999",
                "ADHD Rating Scale: ₹1,999",
            ]
        },
        {
            title: "Stress & Coping Assesments",
            tests: [
                "Perceived Stress Scale (PSS): ₹1,499",
                "Coping Inventory for Stressful Situations (CISS): ₹1,799",
            ]
        },
        {
            title: "Additional Services",
            tests: [
                "Individual Parent Consultation: ₹799",
                "Couples Therapy (Assessment & Therapy): ₹999",
            ]
        }
    ];

    const [activeService, setActiveService] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [showPriceMD, setShowPriceMD] = useState(false);
    const [activePackage, setActivePackage] = useState<number | null>(null);

    const toggleBox = (index: number) => {
        setActivePackage(activePackage === index ? null : index);
    };

    return (
        <main>
            <section>
                <div className="flex flex-col items-center justify-center gap-4 p-8 md:p-10 lg:p-12">
                    <h1 className="text-3xl text-center text-[#198A70]">SERVICES</h1>
                    <p className="text-center max-w-5xl">
                        At <b className="text-[#79C8AD]">Uyellitout</b>, we offer personalized services to support individual clients and schools in fostering emotional well-being, mental resilience, and growth. Whether you need therapy or want to create a supportive school environment, we are here to guide you.
                    </p>
                </div>
            </section>
            <section className="pb-6">
                <div className=" p-6 shadow-xl border-2 rounded-lg max-w-4xl mx-auto">
                    <div className="bg-background rounded-xl p-4 grid gap-2 md:grid-cols-2">
                        <div className="space-y-2">
                            {
                                services.map((service, index) => (
                                    <div key={index} className="space-y-2">
                                        <div onClick={() => {
                                            setActiveService(index);
                                            setShowPrice(false);
                                        }} className={`px-4 py-2 rounded-lg ${activeService === index ? "bg-[#79C8AD]" : "bg-[#79C8AD]/20"} transition-all flex justify-between items-center hover:bg-[#79C8AD]/40`}>
                                            <p className="font-semibold">{service.title}</p>
                                            <Button variant={"secondary"} className={`${activeService !== index ? "bg-[#79C8AD]" : "bg-[#c8ffec]"} hover:bg-[#79C8AD]/60 font-semibold`}>Details</Button>
                                        </div>
                                        {activeService === index &&
                                            <div className="p-4 bg-[#D8ECEE] rounded-lg md:hidden flex flex-col gap-2 justify-between">
                                                <div className="space-y-2">

                                                    <p className="text-lg font-semibold">{services[activeService].title}</p>
                                                    <p className="text-sm">{services[activeService].description}</p>
                                                    <div className="h-px bg-black" />
                                                    <div className="mt-4 space-y-1">
                                                        <p className="font-semibold">Benefits:</p>

                                                        {
                                                            services[activeService].benifits.map((benifit, index) => (
                                                                <div key={index} className="flex gap-2">
                                                                    <Triangle className="fill-teal-500 stroke-none size-3 rotate-90 translate-y-1" />
                                                                    <p className="text-sm">{benifit}</p>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                    <div className="mt-4 space-y-1">
                                                        <p className="font-semibold">What you will get:</p>

                                                        {
                                                            services[activeService].features.map((feature, index) => (
                                                                <div key={index} className="flex gap-2">
                                                                    <Triangle className="fill-teal-500 stroke-none size-3 rotate-90 translate-y-1" />
                                                                    <p className="text-sm">{feature}</p>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                </div>
                                                <div className="flex gap-3 flex-row-reverse items-end">
                                                    {
                                                        activeService < 4 &&
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button className="font-semibold h-10 rounded-lg">Book A Session</Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="text-left max-h-svh max-w-3xl overflow-y-scroll">
                                                                <DialogHeader>
                                                                    <DialogTitle></DialogTitle>
                                                                    <DialogDescription></DialogDescription>  Book a session
                                                                </DialogHeader>
                                                                <NewBooking defaultProductType="service" defaultProductId={activeService} isNested={true} />
                                                            </DialogContent>
                                                        </Dialog>
                                                    }
                                                    <DropdownMenu open={showPrice} onOpenChange={setShowPrice}>
                                                        <DropdownMenuTrigger className={`shadow-sm inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-background hover:bg-foreground/80 h-10 px-4 py-2 bg-emerald-500 font-semibold min-w-28 float-right ${showPrice ? "hover:bg-white bg-white text-gray-900 border border-emerald-500" : ""}`}>{showPrice ? <div className="flex gap-1 items-center justify-between"><Image className="h-full aspect-square border-t border-b border-emerald-500" width={40} height={40} src={`/service/${activeService + 1}.gif`} alt={`${services[activeService].compareTo}-logo`} /> <p>₹{services[activeService].price}</p></div> : "Get Price"}</DropdownMenuTrigger>
                                                        <DropdownMenuContent className="md:hidden px-4 py-1 flex gap-2 items-center bg-emerald-500 text-white rounded-full w-fit mx-auto">
                                                            <p>Less than a {services[activeService].compareTo}</p>
                                                            <Image className="size-6" width={40} height={40} src={`/service/${activeService + 1}.static.png`} alt={`${services[activeService].compareTo}-logo`} />
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="p-4 bg-[#D8ECEE] rounded-lg hidden md:flex flex-col gap-2 justify-between">
                            <div className="space-y-2">

                                <p className="text-lg font-semibold">{services[activeService].title}</p>
                                <p className="text-sm">{services[activeService].description}</p>
                                <div className="h-px bg-black" />
                                <div className="mt-4 space-y-1">
                                    <p className="font-semibold">Benefits:</p>

                                    {
                                        services[activeService].benifits.map((benifit, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Triangle className="fill-teal-500 stroke-none size-3 rotate-90 translate-y-1" />
                                                <p className="text-sm">{benifit}</p>
                                            </div>
                                        ))
                                    }

                                </div>
                                <div className="mt-4 space-y-1">
                                    <p className="font-semibold">What you will get:</p>

                                    {
                                        services[activeService].features.map((feature, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Triangle className="fill-teal-500 stroke-none size-3 rotate-90 translate-y-1" />
                                                <p className="text-sm">{feature}</p>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            <div className="flex gap-3 flex-row-reverse items-end">
                                {
                                    activeService < 4 &&
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="font-semibold h-10 rounded-lg">Book A Session</Button>
                                        </DialogTrigger>
                                        <DialogContent className="text-left max-h-svh max-w-3xl overflow-y-scroll">
                                            <DialogHeader>
                                                <DialogTitle></DialogTitle>
                                                <DialogDescription></DialogDescription>  Book a session
                                            </DialogHeader>
                                            <NewBooking defaultProductType="service" defaultProductId={activeService} isNested={true} />
                                        </DialogContent>
                                    </Dialog>
                                }
                                <DropdownMenu open={showPriceMD} onOpenChange={setShowPriceMD}>
                                    <DropdownMenuTrigger className={`shadow-sm inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-background hover:bg-foreground/80 h-10 px-4 py-2 bg-emerald-500 font-semibold min-w-28 float-right ${showPriceMD ? "hover:bg-white bg-white text-gray-900 border border-emerald-500" : ""}`}>{showPriceMD ? <div className="flex gap-1 items-center justify-between"><Image className="h-full aspect-square border-t border-b border-emerald-500" width={40} height={40} src={`/service/${activeService + 1}.gif`} alt={`${services[activeService].compareTo}-logo`} /> <p>₹{services[activeService].price}</p></div> : "Get Price"}</DropdownMenuTrigger>
                                    <DropdownMenuContent className="hidden px-4 py-1 md:flex gap-2 items-center bg-emerald-500 text-white rounded-full w-fit mx-auto">
                                        <p>Less than a {services[activeService].compareTo}</p>
                                        <Image className="size-6" width={40} height={40} src={`/service/${activeService + 1}.static.png`} alt={`${services[activeService].compareTo}-logo`} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-6 hidden">
                <p className="text-center text-3xl py-4 text-[#198A70]">Psychological Assesments</p>
                <p className="text-center max-w-5xl mx-auto">At <b className="text-[#79C8AD]">Uyellitout</b>, we offer a wide range of professional assessments tailored to provide valuable insights into your cognitive abilities, personality traits, mental health, and more. Our assessments help you understand yourself better, guide therapeutic interventions, and support personal growth. Explore the following specialized tests:</p>
                <div className="py-6 px-2 max-w-[94rem] mx-auto">
                    <Carousel className="w-full px-9">
                        <CarouselContent className="-ml-0.5 mr-0.5">
                            {assessments.map((assessment, index) => (
                                <CarouselItem key={index} className="pl-2 lg:basis-1/3">
                                    <div className="flex flex-col border h-full border-[#8CB0BC] rounded-xl">
                                        <div className="text-white font-semibold bg-[#8CB0BC] p-2 rounded-t-lg flex gap-2 items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="rounded-full border-2 border-white size-7 grid place-items-center">{index + 1}</div>
                                                <p>{assessment.title}</p>
                                            </div>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.0001 2.59375C12.6131 5.01075 12.5981 8.93003 15.0001 11.332L18.6681 15L16.4142 17.2539C18.1512 18.9919 18.9318 21.3506 18.7658 23.6406L23.0373 19.3691L26.713 15.6934C27.097 15.3104 27.096 14.6896 26.713 14.3066L19.3693 6.96289L15.0001 2.59375ZM11.2345 6.35938L6.96303 10.6309L6.83998 10.7559L3.2892 14.3047C2.9062 14.6887 2.9062 15.3094 3.2892 15.6934L13.9669 26.3711L15.0001 27.4062C17.3871 24.9893 17.4021 21.07 15.0001 18.668L11.3322 15L13.5861 12.7461C11.8491 11.0081 11.0685 8.64937 11.2345 6.35938Z" fill="white" />
                                            </svg>
                                        </div>
                                        <div className="bg-white rounded-b-xl px-4 py-2 flex-grow">
                                            <ul className="space-y-1 list-disc ml-4">
                                                {
                                                    assessment.tests.map((test, index) => (
                                                        <li key={index} className="text-sm"><b>{`${test.split(":")[0]}: `}</b>{test.split(":")[1]}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0" />
                        <CarouselNext className="right-0" />
                    </Carousel>
                </div>
            </section>
            <section className="mb-8 hidden">
                <p className="text-center text-3xl py-4 text-[#198A70]">Special Packages</p>
                <div className="flex flex-wrap justify-center gap-5 mt-6">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`group relative max-w-96 w-full h-72 rounded-2xl p-4 flex items-end transition-all duration-500 border cursor-pointer ${activePackage === index
                                ? "bg-gray-100 border-gray-400 scale-105"
                                : "bg-[#52869A] hover:bg-gray-100 text-white hover:text-[#52869A] hover:border-[#52869A] border-transparent"
                                }`}
                            onClick={() => toggleBox(index)}
                        >
                            {
                                activePackage !== index && (
                                    <div className="absolute top-10 text-zinc-300 left-10 w-24 aspect-square">
                                        {
                                            index === 0 ?
                                                <svg className="w-full h-full fill-white group-hover:fill-[#52869A]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 31.5" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="13622314b9"><path d="M 0.308594 14 L 12 14 L 12 25 L 0.308594 25 Z M 0.308594 14 " clipRule="nonzero" /></clipPath><clipPath id="5c1538e657"><path d="M 8 22 L 17 22 L 17 31.007812 L 8 31.007812 Z M 8 22 " clipRule="nonzero" /></clipPath><clipPath id="5206ac8183"><path d="M 22 19 L 29.765625 19 L 29.765625 28 L 22 28 Z M 22 19 " clipRule="nonzero" /></clipPath></defs><g clipPath="url(#13622314b9)"><path d="M 6.613281 24.496094 L 5.21875 24.496094 C 4.789062 24.496094 4.441406 24.152344 4.441406 23.726562 L 4.441406 22.179688 C 4.15625 22.058594 3.882812 21.902344 3.632812 21.714844 L 2.285156 22.488281 C 1.917969 22.699219 1.441406 22.574219 1.226562 22.207031 L 0.53125 21.003906 C 0.316406 20.632812 0.441406 20.164062 0.8125 19.949219 L 2.160156 19.175781 C 2.140625 19.023438 2.132812 18.867188 2.132812 18.710938 C 2.132812 18.554688 2.140625 18.402344 2.160156 18.246094 L 0.8125 17.472656 C 0.636719 17.371094 0.507812 17.207031 0.453125 17.003906 C 0.398438 16.808594 0.425781 16.597656 0.53125 16.421875 L 1.230469 15.21875 C 1.441406 14.851562 1.917969 14.722656 2.285156 14.9375 L 3.632812 15.710938 C 3.945312 15.476562 4.285156 15.292969 4.652344 15.164062 C 4.691406 15.148438 4.738281 15.136719 4.785156 15.136719 C 4.972656 15.136719 5.125 15.289062 5.125 15.476562 C 5.125 15.621094 5.03125 15.75 4.894531 15.796875 C 4.527344 15.925781 4.1875 16.121094 3.890625 16.375 C 3.78125 16.472656 3.621094 16.484375 3.496094 16.414062 L 1.945312 15.523438 C 1.902344 15.5 1.84375 15.515625 1.816406 15.558594 L 1.121094 16.761719 C 1.105469 16.789062 1.109375 16.816406 1.113281 16.832031 C 1.117188 16.84375 1.125 16.871094 1.152344 16.886719 L 2.703125 17.777344 C 2.832031 17.847656 2.894531 17.992188 2.867188 18.132812 C 2.832031 18.324219 2.816406 18.519531 2.816406 18.710938 C 2.816406 18.90625 2.832031 19.101562 2.867188 19.292969 C 2.894531 19.433594 2.832031 19.578125 2.703125 19.648438 L 1.152344 20.539062 C 1.109375 20.5625 1.09375 20.621094 1.121094 20.664062 L 1.816406 21.867188 C 1.84375 21.910156 1.902344 21.925781 1.945312 21.902344 L 3.496094 21.011719 C 3.621094 20.9375 3.78125 20.953125 3.890625 21.046875 C 4.1875 21.304688 4.527344 21.5 4.894531 21.628906 C 5.03125 21.675781 5.125 21.804688 5.125 21.949219 L 5.125 23.726562 C 5.125 23.777344 5.167969 23.820312 5.21875 23.820312 L 6.613281 23.820312 C 6.664062 23.820312 6.707031 23.777344 6.707031 23.726562 L 6.707031 21.949219 C 6.707031 21.804688 6.796875 21.675781 6.933594 21.628906 C 7.304688 21.5 7.644531 21.304688 7.941406 21.050781 C 8.050781 20.953125 8.210938 20.941406 8.335938 21.011719 L 9.886719 21.902344 C 9.914062 21.917969 9.941406 21.914062 9.957031 21.910156 C 9.96875 21.90625 9.996094 21.898438 10.011719 21.867188 L 10.625 20.816406 C 10.71875 20.652344 10.925781 20.597656 11.089844 20.691406 C 11.253906 20.785156 11.308594 20.992188 11.214844 21.15625 L 10.601562 22.207031 C 10.5 22.386719 10.332031 22.515625 10.132812 22.566406 C 9.933594 22.621094 9.722656 22.59375 9.542969 22.488281 L 8.195312 21.714844 C 7.945312 21.90625 7.675781 22.058594 7.386719 22.179688 L 7.386719 23.726562 C 7.386719 24.152344 7.042969 24.496094 6.613281 24.496094 Z M 6.613281 24.496094 " /></g><path d="M 5.914062 21.136719 C 4.574219 21.136719 3.480469 20.046875 3.480469 18.710938 C 3.480469 17.585938 4.246094 16.617188 5.34375 16.355469 C 5.527344 16.3125 5.710938 16.425781 5.753906 16.605469 C 5.800781 16.789062 5.6875 16.972656 5.503906 17.015625 C 4.714844 17.207031 4.160156 17.902344 4.160156 18.710938 C 4.160156 19.671875 4.949219 20.457031 5.914062 20.457031 C 6.660156 20.457031 7.324219 19.988281 7.570312 19.289062 C 7.632812 19.113281 7.828125 19.019531 8.007812 19.082031 C 8.183594 19.144531 8.277344 19.335938 8.214844 19.515625 C 7.875 20.484375 6.949219 21.136719 5.914062 21.136719 Z M 5.914062 21.136719 " /><g clipPath="url(#5c1538e657)"><path d="M 13.316406 31.003906 L 12.273438 31.003906 C 11.90625 31.003906 11.609375 30.707031 11.609375 30.34375 L 11.609375 29.242188 C 11.421875 29.160156 11.25 29.0625 11.085938 28.941406 L 10.128906 29.492188 C 9.972656 29.582031 9.792969 29.605469 9.621094 29.558594 C 9.449219 29.511719 9.308594 29.402344 9.21875 29.25 L 8.699219 28.351562 C 8.515625 28.035156 8.621094 27.628906 8.941406 27.449219 L 9.898438 26.898438 C 9.886719 26.796875 9.882812 26.699219 9.882812 26.597656 C 9.882812 26.496094 9.886719 26.398438 9.898438 26.296875 L 8.941406 25.746094 C 8.789062 25.660156 8.675781 25.515625 8.632812 25.347656 C 8.585938 25.175781 8.609375 24.996094 8.699219 24.84375 L 9.21875 23.945312 C 9.402344 23.628906 9.808594 23.523438 10.128906 23.703125 L 11.085938 24.253906 C 11.25 24.132812 11.421875 24.035156 11.609375 23.953125 L 11.609375 22.851562 C 11.609375 22.488281 11.90625 22.191406 12.273438 22.191406 L 13.316406 22.191406 C 13.683594 22.191406 13.980469 22.488281 13.980469 22.851562 L 13.980469 23.953125 C 14.164062 24.035156 14.339844 24.132812 14.503906 24.253906 L 15.460938 23.703125 C 15.613281 23.613281 15.792969 23.59375 15.964844 23.636719 C 16.136719 23.683594 16.28125 23.792969 16.371094 23.945312 L 16.890625 24.84375 C 17.074219 25.160156 16.964844 25.566406 16.648438 25.746094 L 15.691406 26.296875 C 15.699219 26.398438 15.707031 26.496094 15.707031 26.597656 C 15.707031 26.699219 15.699219 26.796875 15.691406 26.898438 L 16.648438 27.449219 C 16.800781 27.535156 16.910156 27.679688 16.957031 27.851562 C 17.003906 28.019531 16.980469 28.199219 16.890625 28.351562 L 16.371094 29.25 C 16.1875 29.566406 15.777344 29.675781 15.460938 29.492188 L 14.503906 28.941406 C 14.339844 29.0625 14.164062 29.160156 13.980469 29.242188 L 13.980469 30.34375 C 13.980469 30.707031 13.683594 31.003906 13.316406 31.003906 Z M 12.289062 30.324219 L 13.296875 30.324219 L 13.296875 29.011719 C 13.296875 28.867188 13.390625 28.742188 13.527344 28.691406 C 13.792969 28.601562 14.035156 28.460938 14.25 28.277344 C 14.359375 28.183594 14.519531 28.167969 14.644531 28.238281 L 15.789062 28.894531 L 16.292969 28.027344 L 15.148438 27.371094 C 15.023438 27.300781 14.957031 27.15625 14.984375 27.015625 C 15.011719 26.878906 15.023438 26.738281 15.023438 26.597656 C 15.023438 26.457031 15.011719 26.316406 14.984375 26.183594 C 14.957031 26.039062 15.023438 25.898438 15.148438 25.824219 L 16.292969 25.167969 L 15.789062 24.300781 L 14.644531 24.957031 C 14.519531 25.027344 14.359375 25.011719 14.25 24.917969 C 14.035156 24.734375 13.792969 24.59375 13.527344 24.503906 C 13.390625 24.457031 13.296875 24.328125 13.296875 24.183594 L 13.296875 22.871094 L 12.289062 22.871094 L 12.289062 24.183594 C 12.289062 24.328125 12.199219 24.457031 12.0625 24.503906 C 11.792969 24.59375 11.550781 24.734375 11.335938 24.917969 C 11.226562 25.011719 11.070312 25.027344 10.945312 24.957031 L 9.800781 24.300781 L 9.296875 25.167969 L 10.4375 25.824219 C 10.5625 25.898438 10.628906 26.039062 10.601562 26.183594 C 10.578125 26.316406 10.5625 26.457031 10.5625 26.597656 C 10.5625 26.738281 10.578125 26.878906 10.601562 27.015625 C 10.628906 27.15625 10.5625 27.300781 10.4375 27.371094 L 9.296875 28.027344 L 9.800781 28.894531 L 10.945312 28.238281 C 11.070312 28.167969 11.226562 28.183594 11.335938 28.277344 C 11.550781 28.460938 11.796875 28.601562 12.0625 28.691406 C 12.199219 28.742188 12.289062 28.867188 12.289062 29.011719 Z M 12.289062 30.324219 " /></g><path d="M 12.792969 28.199219 C 11.90625 28.199219 11.183594 27.480469 11.183594 26.597656 C 11.183594 25.714844 11.90625 24.996094 12.792969 24.996094 C 13.679688 24.996094 14.402344 25.714844 14.402344 26.597656 C 14.402344 27.480469 13.679688 28.199219 12.792969 28.199219 Z M 12.792969 25.675781 C 12.285156 25.675781 11.867188 26.089844 11.867188 26.597656 C 11.867188 27.105469 12.285156 27.519531 12.792969 27.519531 C 13.304688 27.519531 13.722656 27.105469 13.722656 26.597656 C 13.722656 26.089844 13.304688 25.675781 12.792969 25.675781 Z M 12.792969 25.675781 " /><path d="M 14.039062 21.804688 C 11.363281 21.804688 8.683594 20.792969 6.644531 18.765625 C 2.566406 14.707031 2.566406 8.109375 6.644531 4.054688 C 10.722656 0 17.359375 0 21.433594 4.054688 C 25.511719 8.109375 25.511719 14.710938 21.433594 18.765625 C 19.398438 20.792969 16.71875 21.804688 14.039062 21.804688 Z M 14.039062 1.691406 C 11.535156 1.691406 9.03125 2.636719 7.125 4.535156 C 3.316406 8.324219 3.316406 14.492188 7.125 18.285156 C 10.9375 22.074219 17.140625 22.074219 20.953125 18.285156 C 24.765625 14.492188 24.765625 8.324219 20.953125 4.535156 C 19.046875 2.636719 16.542969 1.691406 14.039062 1.691406 Z M 14.039062 1.691406 " /><path d="M 14.039062 19.746094 C 11.890625 19.746094 9.746094 18.933594 8.109375 17.308594 C 6.523438 15.730469 5.652344 13.636719 5.652344 11.410156 C 5.652344 9.179688 6.523438 7.085938 8.109375 5.511719 C 11.378906 2.257812 16.699219 2.257812 19.96875 5.511719 C 21.554688 7.085938 22.425781 9.179688 22.425781 11.410156 C 22.425781 13.636719 21.554688 15.730469 19.96875 17.308594 C 18.335938 18.933594 16.1875 19.746094 14.039062 19.746094 Z M 8.59375 5.992188 C 7.136719 7.4375 6.335938 9.363281 6.335938 11.410156 C 6.335938 13.457031 7.136719 15.378906 8.59375 16.828125 C 11.597656 19.816406 16.484375 19.816406 19.488281 16.828125 C 20.945312 15.378906 21.746094 13.457031 21.746094 11.410156 C 21.746094 9.363281 20.945312 7.4375 19.488281 5.992188 C 16.484375 3.003906 11.597656 3.003906 8.59375 5.992188 Z M 8.351562 5.75 Z M 8.351562 5.75 " /><path d="M 20.949219 20.539062 C 20.425781 20.539062 19.902344 20.363281 19.480469 20.007812 C 19.335938 19.886719 19.320312 19.671875 19.441406 19.53125 C 19.5625 19.386719 19.777344 19.371094 19.921875 19.492188 C 20.550781 20.019531 21.496094 19.980469 22.078125 19.402344 C 22.660156 18.824219 22.699219 17.882812 22.167969 17.257812 C 22.042969 17.117188 22.0625 16.902344 22.207031 16.78125 C 22.351562 16.660156 22.566406 16.675781 22.6875 16.820312 C 23.445312 17.710938 23.390625 19.054688 22.558594 19.878906 C 22.121094 20.316406 21.535156 20.539062 20.949219 20.539062 Z M 20.949219 20.539062 " /><path d="M 23.34375 21 C 23.253906 21 23.167969 20.96875 23.101562 20.902344 L 22.074219 19.882812 C 21.941406 19.75 21.941406 19.535156 22.074219 19.402344 C 22.207031 19.269531 22.425781 19.269531 22.558594 19.402344 L 23.582031 20.421875 C 23.714844 20.554688 23.714844 20.769531 23.582031 20.902344 C 23.515625 20.96875 23.429688 21 23.34375 21 Z M 23.34375 21 " /><g clipPath="url(#5206ac8183)"><path d="M 27.628906 27.042969 C 27.425781 27.042969 27.222656 26.96875 27.070312 26.8125 L 23.101562 22.867188 C 22.421875 22.191406 22.421875 21.09375 23.101562 20.421875 C 23.78125 19.746094 24.882812 19.746094 25.5625 20.421875 L 29.53125 24.367188 C 29.835938 24.671875 29.835938 25.171875 29.53125 25.476562 L 28.1875 26.8125 C 28.03125 26.96875 27.832031 27.042969 27.628906 27.042969 Z M 24.332031 20.59375 C 24.0625 20.59375 23.789062 20.695312 23.585938 20.902344 C 23.171875 21.308594 23.171875 21.976562 23.585938 22.386719 L 27.550781 26.332031 C 27.59375 26.375 27.664062 26.375 27.703125 26.332031 L 29.046875 25 C 29.085938 24.957031 29.085938 24.886719 29.046875 24.847656 L 25.078125 20.902344 C 24.875 20.695312 24.601562 20.59375 24.332031 20.59375 Z M 24.332031 20.59375 " /></g><path d="M 26.015625 25.625 C 25.929688 25.625 25.839844 25.59375 25.773438 25.527344 C 25.640625 25.394531 25.640625 25.179688 25.773438 25.046875 L 27.753906 23.082031 C 27.886719 22.949219 28.101562 22.949219 28.234375 23.082031 C 28.367188 23.210938 28.367188 23.429688 28.234375 23.558594 L 26.257812 25.527344 C 26.191406 25.59375 26.105469 25.625 26.015625 25.625 Z M 23.964844 23.585938 C 23.878906 23.585938 23.792969 23.554688 23.722656 23.488281 C 23.589844 23.355469 23.589844 23.140625 23.722656 23.007812 L 25.703125 21.042969 C 25.835938 20.910156 26.050781 20.910156 26.183594 21.042969 C 26.316406 21.171875 26.316406 21.386719 26.183594 21.519531 L 24.207031 23.488281 C 24.140625 23.554688 24.054688 23.585938 23.964844 23.585938 Z M 23.964844 23.585938 " /><path d="M 9.253906 13.015625 C 9.214844 13.015625 9.171875 13.007812 9.128906 12.992188 L 5.871094 11.722656 C 5.695312 11.65625 5.609375 11.460938 5.675781 11.285156 C 5.746094 11.109375 5.941406 11.023438 6.117188 11.09375 L 9.378906 12.359375 C 9.554688 12.429688 9.640625 12.625 9.574219 12.800781 C 9.519531 12.933594 9.390625 13.015625 9.253906 13.015625 Z M 11.488281 12.769531 C 11.378906 12.769531 11.269531 12.714844 11.207031 12.621094 C 11.097656 12.464844 11.140625 12.253906 11.296875 12.148438 L 13.03125 10.980469 C 13.1875 10.875 13.398438 10.917969 13.503906 11.070312 C 13.609375 11.226562 13.570312 11.4375 13.414062 11.542969 L 11.679688 12.710938 C 11.621094 12.75 11.554688 12.769531 11.488281 12.769531 Z M 17.574219 11.578125 C 17.554688 11.578125 17.53125 11.574219 17.507812 11.570312 L 15.445312 11.144531 C 15.261719 11.105469 15.144531 10.925781 15.183594 10.742188 C 15.21875 10.558594 15.402344 10.441406 15.585938 10.480469 L 17.644531 10.90625 C 17.828125 10.941406 17.949219 11.121094 17.910156 11.304688 C 17.875 11.464844 17.734375 11.578125 17.574219 11.578125 Z M 19.761719 10.988281 C 19.667969 10.988281 19.574219 10.949219 19.507812 10.875 C 19.382812 10.738281 19.394531 10.523438 19.53125 10.398438 L 24.140625 6.273438 C 24.277344 6.148438 24.496094 6.160156 24.621094 6.300781 C 24.746094 6.4375 24.734375 6.652344 24.59375 6.777344 L 19.988281 10.902344 C 19.925781 10.960938 19.84375 10.988281 19.761719 10.988281 Z M 19.761719 10.988281 " /><path d="M 10.4375 14.738281 C 9.550781 14.738281 8.828125 14.019531 8.828125 13.136719 C 8.828125 12.253906 9.546875 11.535156 10.4375 11.535156 C 11.324219 11.535156 12.046875 12.253906 12.046875 13.136719 C 12.046875 14.019531 11.324219 14.738281 10.4375 14.738281 Z M 10.4375 12.214844 C 9.925781 12.214844 9.507812 12.628906 9.507812 13.136719 C 9.507812 13.644531 9.925781 14.058594 10.4375 14.058594 C 10.949219 14.058594 11.363281 13.644531 11.363281 13.136719 C 11.363281 12.628906 10.949219 12.214844 10.4375 12.214844 Z M 10.4375 12.214844 " /><path d="M 14.273438 12.15625 C 13.386719 12.15625 12.664062 11.4375 12.664062 10.554688 C 12.664062 9.671875 13.382812 8.953125 14.273438 8.953125 C 15.160156 8.953125 15.882812 9.671875 15.882812 10.554688 C 15.882812 11.4375 15.160156 12.15625 14.273438 12.15625 Z M 14.273438 9.632812 C 13.761719 9.632812 13.34375 10.046875 13.34375 10.554688 C 13.34375 11.0625 13.761719 11.476562 14.273438 11.476562 C 14.785156 11.476562 15.203125 11.0625 15.203125 10.554688 C 15.203125 10.046875 14.785156 9.632812 14.273438 9.632812 Z M 14.273438 9.632812 " /><path d="M 18.816406 13.09375 C 17.929688 13.09375 17.207031 12.375 17.207031 11.492188 C 17.207031 10.609375 17.929688 9.890625 18.816406 9.890625 C 19.707031 9.890625 20.429688 10.609375 20.429688 11.492188 C 20.429688 12.378906 19.707031 13.09375 18.816406 13.09375 Z M 18.816406 10.570312 C 18.304688 10.570312 17.890625 10.984375 17.890625 11.496094 C 17.890625 12.003906 18.304688 12.417969 18.816406 12.417969 C 19.328125 12.417969 19.746094 12.003906 19.746094 11.496094 C 19.746094 10.984375 19.328125 10.570312 18.816406 10.570312 Z M 18.816406 10.570312 " /><path d="M 25.308594 7.285156 C 24.421875 7.285156 23.699219 6.566406 23.699219 5.683594 C 23.699219 4.796875 24.421875 4.082031 25.308594 4.082031 C 26.199219 4.082031 26.921875 4.800781 26.921875 5.683594 C 26.921875 6.566406 26.199219 7.285156 25.308594 7.285156 Z M 25.308594 4.761719 C 24.796875 4.761719 24.382812 5.175781 24.382812 5.683594 C 24.382812 6.191406 24.796875 6.605469 25.308594 6.605469 C 25.820312 6.605469 26.238281 6.191406 26.238281 5.683594 C 26.238281 5.175781 25.820312 4.761719 25.308594 4.761719 Z M 25.308594 4.761719 " /><path d="M 17.464844 5.730469 L 13.035156 5.730469 C 12.847656 5.730469 12.695312 5.578125 12.695312 5.390625 C 12.695312 5.203125 12.847656 5.050781 13.035156 5.050781 L 17.464844 5.050781 C 17.652344 5.050781 17.804688 5.203125 17.804688 5.390625 C 17.804688 5.578125 17.652344 5.730469 17.464844 5.730469 Z M 17.464844 5.730469 " /><path d="M 17.464844 7.433594 L 10.617188 7.433594 C 10.429688 7.433594 10.277344 7.28125 10.277344 7.09375 C 10.277344 6.90625 10.429688 6.753906 10.617188 6.753906 L 17.464844 6.753906 C 17.652344 6.753906 17.804688 6.90625 17.804688 7.09375 C 17.804688 7.28125 17.652344 7.433594 17.464844 7.433594 Z M 17.464844 7.433594 " /><path d="M 15.042969 16.0625 L 10.617188 16.0625 C 10.429688 16.0625 10.277344 15.910156 10.277344 15.722656 C 10.277344 15.535156 10.429688 15.382812 10.617188 15.382812 L 15.042969 15.382812 C 15.230469 15.382812 15.386719 15.535156 15.386719 15.722656 C 15.386719 15.910156 15.230469 16.0625 15.042969 16.0625 Z M 15.042969 16.0625 " /><path d="M 17.464844 17.765625 L 11.679688 17.765625 C 11.492188 17.765625 11.339844 17.613281 11.339844 17.425781 C 11.339844 17.238281 11.492188 17.085938 11.679688 17.085938 L 17.464844 17.085938 C 17.652344 17.085938 17.804688 17.238281 17.804688 17.425781 C 17.804688 17.613281 17.652344 17.765625 17.464844 17.765625 Z M 17.464844 17.765625 " /></svg>
                                                : index === 1 ?
                                                    <svg className="w-full h-full fill-white group-hover:fill-[#52869A]" xmlns="http://www.w3.org/2000/svg" zoomAndPan="magnify" viewBox="0 0 134.25 147.749995" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="c4f2515e7a"><path d="M 0.144531 12 L 103 12 L 103 147.214844 L 0.144531 147.214844 Z M 0.144531 12 " clipRule="nonzero" /></clipPath><clipPath id="75936d87a2"><path d="M 43 0.285156 L 60 0.285156 L 60 12 L 43 12 Z M 43 0.285156 " clipRule="nonzero" /></clipPath><clipPath id="1e4632d001"><path d="M 103 117 L 133.503906 117 L 133.503906 147.214844 L 103 147.214844 Z M 103 117 " clipRule="nonzero" /></clipPath></defs><path d="M 101.113281 122.636719 C 100.160156 122.636719 99.386719 121.863281 99.386719 120.914062 L 99.386719 84.378906 C 99.386719 83.429688 100.160156 82.660156 101.113281 82.660156 C 102.066406 82.660156 102.839844 83.429688 102.839844 84.378906 L 102.839844 120.914062 C 102.839844 121.863281 102.066406 122.636719 101.113281 122.636719 Z M 101.113281 122.636719 " /><g clipPath="url(#c4f2515e7a)"><path d="M 94.785156 147.210938 L 8.21875 147.210938 C 3.78125 147.210938 0.167969 143.605469 0.167969 139.175781 L 0.167969 20.371094 C 0.167969 15.941406 3.78125 12.335938 8.21875 12.335938 L 27.777344 12.335938 C 28.730469 12.335938 29.5 13.105469 29.5 14.058594 L 29.5 19.367188 C 29.5 20.15625 30.148438 20.800781 30.941406 20.800781 L 72.066406 20.800781 C 72.859375 20.800781 73.503906 20.15625 73.503906 19.367188 L 73.503906 14.058594 C 73.503906 13.105469 74.277344 12.335938 75.230469 12.335938 L 94.785156 12.335938 C 99.226562 12.335938 102.839844 15.941406 102.839844 20.371094 L 102.839844 76.96875 C 102.839844 77.921875 102.066406 78.691406 101.113281 78.691406 C 100.160156 78.691406 99.386719 77.921875 99.386719 76.96875 L 99.386719 20.371094 C 99.386719 17.839844 97.324219 15.777344 94.785156 15.777344 L 76.957031 15.777344 L 76.957031 19.367188 C 76.957031 22.054688 74.761719 24.246094 72.066406 24.246094 L 30.941406 24.246094 C 28.242188 24.246094 26.050781 22.054688 26.050781 19.367188 L 26.050781 15.777344 L 8.21875 15.777344 C 5.683594 15.777344 3.617188 17.839844 3.617188 20.371094 L 3.617188 139.175781 C 3.617188 141.707031 5.683594 143.765625 8.21875 143.765625 L 94.785156 143.765625 C 97.324219 143.765625 99.386719 141.707031 99.386719 139.175781 L 99.386719 128.324219 C 99.386719 127.371094 100.160156 126.601562 101.113281 126.601562 C 102.066406 126.601562 102.839844 127.371094 102.839844 128.324219 L 102.839844 139.175781 C 102.839844 143.605469 99.226562 147.210938 94.785156 147.210938 Z M 94.785156 147.210938 " /></g><path d="M 72.503906 24.246094 L 30.941406 24.246094 C 28.242188 24.246094 26.050781 22.054688 26.050781 19.367188 L 26.050781 13.339844 C 26.050781 10.648438 28.242188 8.460938 30.941406 8.460938 L 72.066406 8.460938 C 74.761719 8.460938 76.957031 10.648438 76.957031 13.339844 L 76.957031 19.800781 C 76.957031 22.25 74.957031 24.246094 72.503906 24.246094 Z M 30.941406 11.90625 C 30.148438 11.90625 29.5 12.546875 29.5 13.339844 L 29.5 19.367188 C 29.5 20.15625 30.148438 20.800781 30.941406 20.800781 L 72.503906 20.800781 C 73.054688 20.800781 73.503906 20.351562 73.503906 19.800781 L 73.503906 13.339844 C 73.503906 12.546875 72.859375 11.90625 72.066406 11.90625 Z M 30.941406 11.90625 " /><g clipPath="url(#75936d87a2)"><path d="M 57.605469 11.90625 L 45.402344 11.90625 C 44.449219 11.90625 43.675781 11.132812 43.675781 10.183594 L 43.675781 8.09375 C 43.675781 3.785156 47.1875 0.28125 51.503906 0.28125 C 55.820312 0.28125 59.328125 3.785156 59.328125 8.09375 L 59.328125 10.183594 C 59.328125 11.132812 58.558594 11.90625 57.605469 11.90625 Z M 47.128906 8.460938 L 55.878906 8.460938 L 55.878906 8.09375 C 55.878906 5.683594 53.914062 3.726562 51.503906 3.726562 C 49.089844 3.726562 47.128906 5.683594 47.128906 8.09375 Z M 47.128906 8.460938 " /></g><path d="M 43.644531 62.574219 C 43.523438 62.574219 43.398438 62.5625 43.277344 62.535156 C 42.484375 62.363281 41.917969 61.660156 41.917969 60.851562 L 41.917969 40.734375 L 38.027344 49.300781 C 37.746094 49.917969 37.132812 50.3125 36.457031 50.3125 L 18.527344 50.3125 C 17.574219 50.3125 16.800781 49.542969 16.800781 48.589844 C 16.800781 47.640625 17.574219 46.867188 18.527344 46.867188 L 35.34375 46.867188 L 42.074219 32.054688 C 42.410156 31.316406 43.214844 30.910156 44.011719 31.082031 C 44.804688 31.253906 45.371094 31.957031 45.371094 32.765625 L 45.371094 53.003906 L 47.742188 47.871094 C 48.023438 47.257812 48.636719 46.867188 49.308594 46.867188 L 58.214844 46.867188 L 64.082031 37.78125 C 64.496094 37.140625 65.285156 36.847656 66.019531 37.0625 C 66.753906 37.28125 67.257812 37.953125 67.257812 38.714844 L 67.257812 49.28125 L 68.214844 47.699219 C 68.53125 47.183594 69.089844 46.867188 69.695312 46.867188 L 85.917969 46.867188 C 86.871094 46.867188 87.644531 47.640625 87.644531 48.589844 C 87.644531 49.542969 86.871094 50.3125 85.917969 50.3125 L 70.667969 50.3125 L 67.011719 56.347656 C 66.609375 57.007812 65.816406 57.324219 65.070312 57.117188 C 64.324219 56.90625 63.808594 56.230469 63.808594 55.457031 L 63.808594 44.566406 L 60.605469 49.523438 C 60.289062 50.015625 59.742188 50.3125 59.15625 50.3125 L 50.414062 50.3125 L 45.210938 61.574219 C 44.925781 62.195312 44.308594 62.574219 43.644531 62.574219 Z M 43.644531 62.574219 " /><path d="M 23.703125 75.46875 L 18.527344 75.46875 C 17.574219 75.46875 16.800781 74.699219 16.800781 73.746094 C 16.800781 72.796875 17.574219 72.023438 18.527344 72.023438 L 23.703125 72.023438 C 24.65625 72.023438 25.429688 72.796875 25.429688 73.746094 C 25.429688 74.699219 24.65625 75.46875 23.703125 75.46875 Z M 23.703125 75.46875 " /><path d="M 80.261719 75.46875 L 32.332031 75.46875 C 31.378906 75.46875 30.605469 74.699219 30.605469 73.746094 C 30.605469 72.796875 31.378906 72.023438 32.332031 72.023438 L 80.261719 72.023438 C 81.214844 72.023438 81.988281 72.796875 81.988281 73.746094 C 81.988281 74.699219 81.214844 75.46875 80.261719 75.46875 Z M 80.261719 75.46875 " /><path d="M 23.886719 86.945312 L 18.710938 86.945312 C 17.757812 86.945312 16.984375 86.175781 16.984375 85.226562 C 16.984375 84.273438 17.757812 83.503906 18.710938 83.503906 L 23.886719 83.503906 C 24.839844 83.503906 25.613281 84.273438 25.613281 85.226562 C 25.613281 86.175781 24.839844 86.945312 23.886719 86.945312 Z M 23.886719 86.945312 " /><path d="M 65.402344 86.945312 L 32.515625 86.945312 C 31.5625 86.945312 30.789062 86.175781 30.789062 85.226562 C 30.789062 84.273438 31.5625 83.503906 32.515625 83.503906 L 65.402344 83.503906 C 66.355469 83.503906 67.128906 84.273438 67.128906 85.226562 C 67.128906 86.175781 66.355469 86.945312 65.402344 86.945312 Z M 65.402344 86.945312 " /><path d="M 23.886719 98.425781 L 18.710938 98.425781 C 17.757812 98.425781 16.984375 97.65625 16.984375 96.703125 C 16.984375 95.753906 17.757812 94.980469 18.710938 94.980469 L 23.886719 94.980469 C 24.839844 94.980469 25.613281 95.753906 25.613281 96.703125 C 25.613281 97.65625 24.839844 98.425781 23.886719 98.425781 Z M 23.886719 98.425781 " /><path d="M 82.605469 98.425781 L 66.691406 98.425781 C 65.738281 98.425781 64.964844 97.65625 64.964844 96.703125 C 64.964844 95.753906 65.738281 94.980469 66.691406 94.980469 L 82.605469 94.980469 C 83.558594 94.980469 84.328125 95.753906 84.328125 96.703125 C 84.328125 97.65625 83.558594 98.425781 82.605469 98.425781 Z M 82.605469 98.425781 " /><path d="M 60.113281 98.425781 L 32.515625 98.425781 C 31.5625 98.425781 30.789062 97.65625 30.789062 96.703125 C 30.789062 95.753906 31.5625 94.980469 32.515625 94.980469 L 60.113281 94.980469 C 61.066406 94.980469 61.839844 95.753906 61.839844 96.703125 C 61.839844 97.65625 61.066406 98.425781 60.113281 98.425781 Z M 60.113281 98.425781 " /><path d="M 23.886719 109.90625 L 18.710938 109.90625 C 17.757812 109.90625 16.984375 109.132812 16.984375 108.183594 C 16.984375 107.230469 17.757812 106.460938 18.710938 106.460938 L 23.886719 106.460938 C 24.839844 106.460938 25.613281 107.230469 25.613281 108.183594 C 25.613281 109.132812 24.839844 109.90625 23.886719 109.90625 Z M 23.886719 109.90625 " /><path d="M 89.074219 109.90625 L 66.601562 109.90625 C 65.648438 109.90625 64.875 109.132812 64.875 108.183594 C 64.875 107.230469 65.648438 106.460938 66.601562 106.460938 L 89.074219 106.460938 C 90.027344 106.460938 90.800781 107.230469 90.800781 108.183594 C 90.800781 109.132812 90.027344 109.90625 89.074219 109.90625 Z M 89.074219 109.90625 " /><path d="M 60.03125 109.90625 L 32.515625 109.90625 C 31.5625 109.90625 30.789062 109.132812 30.789062 108.183594 C 30.789062 107.230469 31.5625 106.460938 32.515625 106.460938 L 60.03125 106.460938 C 60.984375 106.460938 61.757812 107.230469 61.757812 108.183594 C 61.757812 109.132812 60.984375 109.90625 60.03125 109.90625 Z M 60.03125 109.90625 " /><path d="M 23.886719 121.382812 L 18.710938 121.382812 C 17.757812 121.382812 16.984375 120.613281 16.984375 119.660156 C 16.984375 118.710938 17.757812 117.941406 18.710938 117.941406 L 23.886719 117.941406 C 24.839844 117.941406 25.613281 118.710938 25.613281 119.660156 C 25.613281 120.613281 24.839844 121.382812 23.886719 121.382812 Z M 23.886719 121.382812 " /><path d="M 60.316406 121.382812 L 32.515625 121.382812 C 31.5625 121.382812 30.789062 120.613281 30.789062 119.660156 C 30.789062 118.710938 31.5625 117.941406 32.515625 117.941406 L 60.316406 117.941406 C 61.269531 117.941406 62.042969 118.710938 62.042969 119.660156 C 62.042969 120.613281 61.269531 121.382812 60.316406 121.382812 Z M 60.316406 121.382812 " /><path d="M 88.257812 133.066406 C 84.140625 133.066406 80.148438 132.261719 76.390625 130.675781 C 72.757812 129.140625 69.5 126.949219 66.699219 124.15625 C 63.902344 121.363281 61.703125 118.109375 60.167969 114.488281 C 58.578125 110.738281 57.769531 106.753906 57.769531 102.648438 C 57.769531 98.542969 58.578125 94.558594 60.167969 90.804688 C 61.703125 87.183594 63.902344 83.929688 66.699219 81.136719 C 69.5 78.34375 72.757812 76.152344 76.390625 74.621094 C 80.148438 73.03125 84.140625 72.226562 88.257812 72.226562 C 92.371094 72.226562 96.363281 73.03125 100.125 74.621094 C 103.753906 76.152344 107.015625 78.34375 109.8125 81.136719 C 112.613281 83.929688 114.808594 87.183594 116.34375 90.804688 C 117.933594 94.558594 118.742188 98.542969 118.742188 102.648438 C 118.742188 106.753906 117.933594 110.738281 116.34375 114.488281 C 114.808594 118.109375 112.613281 121.363281 109.8125 124.15625 C 107.015625 126.949219 103.753906 129.140625 100.125 130.675781 C 96.363281 132.261719 92.371094 133.066406 88.257812 133.066406 Z M 88.257812 75.671875 C 81.035156 75.671875 74.246094 78.476562 69.140625 83.574219 C 64.035156 88.667969 61.222656 95.441406 61.222656 102.648438 C 61.222656 109.851562 64.035156 116.625 69.140625 121.722656 C 74.246094 126.816406 81.035156 129.621094 88.257812 129.621094 C 95.476562 129.621094 102.265625 126.816406 107.371094 121.722656 C 112.480469 116.625 115.289062 109.851562 115.289062 102.648438 C 115.289062 95.441406 112.480469 88.667969 107.371094 83.574219 C 102.265625 78.476562 95.476562 75.671875 88.257812 75.671875 Z M 88.257812 75.671875 " /><path d="M 88.257812 126.6875 C 81.820312 126.6875 75.769531 124.1875 71.21875 119.648438 C 66.667969 115.105469 64.164062 109.070312 64.164062 102.648438 C 64.164062 96.226562 66.667969 90.1875 71.21875 85.648438 C 75.769531 81.105469 81.820312 78.605469 88.257812 78.605469 C 94.691406 78.605469 100.742188 81.105469 105.292969 85.648438 C 109.84375 90.1875 112.351562 96.226562 112.351562 102.648438 C 112.351562 109.070312 109.84375 115.105469 105.292969 119.648438 C 100.742188 124.1875 94.691406 126.6875 88.257812 126.6875 Z M 88.257812 82.050781 C 82.742188 82.050781 77.558594 84.191406 73.660156 88.082031 C 69.761719 91.972656 67.613281 97.144531 67.613281 102.648438 C 67.613281 108.148438 69.761719 113.320312 73.660156 117.210938 C 77.558594 121.101562 82.742188 123.246094 88.257812 123.246094 C 93.769531 123.246094 98.953125 121.101562 102.851562 117.210938 C 106.753906 113.320312 108.898438 108.148438 108.898438 102.648438 C 108.898438 97.144531 106.753906 91.972656 102.851562 88.082031 C 98.953125 84.191406 93.769531 82.050781 88.257812 82.050781 Z M 88.257812 82.050781 " /><g clipPath="url(#1e4632d001)"><path d="M 126.792969 147.210938 C 125.101562 147.210938 123.515625 146.554688 122.320312 145.359375 L 103.976562 127.058594 C 103.300781 126.386719 103.300781 125.292969 103.976562 124.621094 C 104.648438 123.949219 105.742188 123.949219 106.414062 124.621094 L 124.761719 142.925781 C 125.304688 143.46875 126.027344 143.765625 126.792969 143.765625 C 127.5625 143.765625 128.285156 143.46875 128.828125 142.925781 C 129.835938 141.917969 129.835938 140.28125 128.828125 139.273438 L 110.28125 120.765625 C 109.605469 120.09375 109.605469 119.003906 110.28125 118.332031 C 110.953125 117.660156 112.046875 117.660156 112.71875 118.332031 L 131.269531 136.839844 C 133.621094 139.1875 133.621094 143.011719 131.269531 145.359375 C 130.074219 146.554688 128.484375 147.210938 126.792969 147.210938 Z M 126.792969 147.210938 " /></g></svg>
                                                    : <svg className="w-full h-full fill-white group-hover:fill-[#52869A]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 38.249999" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="6ae1df0342"><path d="M 0.300781 0 L 29.710938 0 L 29.710938 37.515625 L 0.300781 37.515625 Z M 0.300781 0 " clipRule="nonzero" /></clipPath></defs><g clipPath="url(#6ae1df0342)"><path d="M 27.207031 3.75 L 21.890625 3.75 L 21.890625 3.128906 C 21.890625 2.785156 21.613281 2.507812 21.269531 2.507812 L 18.078125 2.507812 C 17.785156 1.074219 16.523438 0 15.007812 0 C 13.488281 0 12.230469 1.074219 11.941406 2.5 L 8.753906 2.5 C 8.40625 2.5 8.128906 2.777344 8.128906 3.121094 L 8.128906 3.75 L 2.804688 3.75 C 1.429688 3.75 0.304688 4.875 0.304688 6.25 L 0.304688 35.007812 C 0.304688 36.390625 1.429688 37.515625 2.804688 37.515625 L 27.207031 37.515625 C 28.589844 37.515625 29.707031 36.390625 29.707031 35.015625 L 29.707031 6.25 C 29.714844 4.875 28.589844 3.75 27.207031 3.75 Z M 9.375 3.75 L 12.507812 3.75 C 12.851562 3.75 13.128906 3.472656 13.128906 3.128906 C 13.128906 2.09375 13.96875 1.253906 15.007812 1.253906 C 16.042969 1.253906 16.882812 2.09375 16.882812 3.128906 C 16.882812 3.472656 17.160156 3.75 17.507812 3.75 L 20.636719 3.75 L 20.636719 6.25 L 9.375 6.25 Z M 28.460938 35.015625 C 28.460938 35.707031 27.898438 36.269531 27.207031 36.269531 L 2.804688 36.269531 C 2.113281 36.269531 1.550781 35.707031 1.550781 35.015625 L 1.550781 6.25 C 1.550781 5.558594 2.113281 4.996094 2.804688 4.996094 L 8.121094 4.996094 L 8.121094 6.871094 C 8.121094 7.21875 8.398438 7.496094 8.746094 7.496094 L 21.261719 7.496094 C 21.605469 7.496094 21.886719 7.21875 21.886719 6.871094 L 21.886719 4.996094 L 27.199219 4.996094 C 27.890625 4.996094 28.453125 5.558594 28.453125 6.25 L 28.453125 35.015625 Z M 26.539062 28.609375 C 25.8125 28.269531 24.976562 28.359375 24.347656 28.804688 C 23.71875 28.359375 22.882812 28.269531 22.15625 28.609375 C 21.621094 28.855469 21.222656 29.292969 21.019531 29.847656 C 20.921875 30.117188 20.878906 30.402344 20.894531 30.679688 L 18.65625 30.679688 L 17.078125 20.851562 L 17.078125 20.828125 C 17.070312 20.796875 17.058594 20.777344 17.050781 20.746094 C 17.035156 20.699219 17.027344 20.648438 16.996094 20.609375 C 16.972656 20.574219 16.945312 20.542969 16.914062 20.511719 C 16.890625 20.484375 16.867188 20.453125 16.839844 20.429688 C 16.792969 20.398438 16.742188 20.378906 16.695312 20.355469 C 16.671875 20.347656 16.660156 20.332031 16.636719 20.324219 C 16.636719 20.324219 16.628906 20.324219 16.628906 20.324219 C 16.582031 20.308594 16.539062 20.316406 16.484375 20.316406 C 16.449219 20.316406 16.410156 20.308594 16.375 20.308594 C 16.375 20.308594 16.367188 20.308594 16.367188 20.308594 C 16.335938 20.316406 16.3125 20.332031 16.285156 20.339844 C 16.238281 20.355469 16.191406 20.363281 16.148438 20.394531 C 16.109375 20.414062 16.089844 20.445312 16.058594 20.46875 C 16.027344 20.496094 15.996094 20.519531 15.96875 20.550781 C 15.9375 20.589844 15.921875 20.632812 15.90625 20.671875 C 15.894531 20.699219 15.871094 20.722656 15.863281 20.753906 L 13.910156 27.722656 L 11.890625 27.722656 L 11.34375 23.664062 C 11.335938 23.632812 11.320312 23.613281 11.3125 23.589844 C 11.296875 23.542969 11.289062 23.507812 11.265625 23.460938 C 11.253906 23.429688 11.230469 23.402344 11.207031 23.371094 C 11.175781 23.332031 11.15625 23.304688 11.117188 23.273438 C 11.085938 23.25 11.058594 23.238281 11.019531 23.214844 C 10.988281 23.199219 10.96875 23.175781 10.9375 23.160156 C 10.921875 23.152344 10.914062 23.160156 10.898438 23.152344 C 10.863281 23.140625 10.824219 23.140625 10.785156 23.132812 C 10.742188 23.125 10.695312 23.117188 10.660156 23.125 C 10.652344 23.125 10.636719 23.125 10.628906 23.125 C 10.597656 23.132812 10.578125 23.144531 10.554688 23.152344 C 10.507812 23.167969 10.472656 23.175781 10.425781 23.199219 C 10.390625 23.214844 10.359375 23.242188 10.328125 23.265625 C 10.300781 23.289062 10.269531 23.320312 10.238281 23.347656 C 10.207031 23.378906 10.195312 23.417969 10.171875 23.460938 C 10.15625 23.484375 10.132812 23.507812 10.125 23.527344 L 7.257812 31.0625 L 6.753906 29.464844 C 6.753906 29.457031 6.746094 29.449219 6.738281 29.433594 C 6.726562 29.390625 6.703125 29.359375 6.679688 29.320312 C 6.65625 29.292969 6.640625 29.253906 6.621094 29.230469 C 6.589844 29.203125 6.558594 29.179688 6.523438 29.15625 C 6.492188 29.132812 6.460938 29.109375 6.425781 29.097656 C 6.386719 29.082031 6.347656 29.074219 6.3125 29.058594 C 6.273438 29.050781 6.230469 29.035156 6.191406 29.035156 C 6.183594 29.035156 6.167969 29.027344 6.160156 29.027344 L 2.835938 29.027344 C 2.488281 29.027344 2.210938 29.304688 2.210938 29.652344 C 2.210938 29.996094 2.488281 30.273438 2.835938 30.273438 L 5.695312 30.273438 L 6.597656 33.15625 C 6.605469 33.171875 6.613281 33.179688 6.613281 33.191406 C 6.621094 33.214844 6.632812 33.238281 6.648438 33.269531 C 6.671875 33.3125 6.703125 33.351562 6.730469 33.386719 C 6.746094 33.410156 6.769531 33.425781 6.785156 33.441406 C 6.828125 33.476562 6.875 33.507812 6.925781 33.53125 C 6.941406 33.539062 6.949219 33.546875 6.964844 33.554688 C 6.972656 33.554688 6.972656 33.554688 6.980469 33.554688 C 7.046875 33.574219 7.113281 33.589844 7.191406 33.589844 C 7.25 33.589844 7.316406 33.582031 7.378906 33.558594 C 7.378906 33.558594 7.378906 33.558594 7.386719 33.558594 C 7.453125 33.539062 7.511719 33.5 7.574219 33.457031 C 7.589844 33.441406 7.609375 33.425781 7.625 33.410156 C 7.664062 33.371094 7.691406 33.335938 7.722656 33.289062 C 7.738281 33.269531 7.753906 33.246094 7.761719 33.222656 C 7.769531 33.207031 7.777344 33.199219 7.785156 33.183594 L 10.433594 26.269531 L 10.726562 28.445312 C 10.734375 28.472656 10.75 28.503906 10.757812 28.535156 C 10.765625 28.5625 10.773438 28.601562 10.785156 28.632812 C 10.808594 28.675781 10.832031 28.707031 10.863281 28.742188 C 10.882812 28.765625 10.898438 28.796875 10.921875 28.8125 C 10.960938 28.847656 11.003906 28.871094 11.050781 28.894531 C 11.070312 28.910156 11.09375 28.921875 11.117188 28.929688 C 11.191406 28.960938 11.265625 28.976562 11.351562 28.976562 L 14.390625 28.976562 C 14.464844 28.976562 14.542969 28.960938 14.617188 28.929688 C 14.640625 28.921875 14.660156 28.910156 14.675781 28.902344 C 14.722656 28.878906 14.765625 28.847656 14.804688 28.820312 C 14.828125 28.804688 14.839844 28.78125 14.855469 28.757812 C 14.886719 28.722656 14.917969 28.683594 14.9375 28.636719 C 14.953125 28.617188 14.96875 28.585938 14.976562 28.5625 C 14.984375 28.546875 14.992188 28.539062 15 28.519531 L 16.304688 23.835938 L 17.515625 31.390625 C 17.523438 31.421875 17.539062 31.445312 17.542969 31.472656 C 17.550781 31.503906 17.558594 31.542969 17.574219 31.570312 C 17.597656 31.617188 17.621094 31.648438 17.648438 31.683594 C 17.671875 31.707031 17.6875 31.730469 17.710938 31.753906 C 17.746094 31.789062 17.792969 31.8125 17.832031 31.835938 C 17.851562 31.851562 17.875 31.863281 17.898438 31.871094 C 17.972656 31.902344 18.046875 31.917969 18.128906 31.917969 L 21.398438 31.917969 C 22.109375 32.75 23.746094 34.054688 24.160156 34.167969 C 24.210938 34.183594 24.273438 34.191406 24.332031 34.191406 C 24.347656 34.191406 24.363281 34.191406 24.378906 34.191406 C 24.4375 34.191406 24.496094 34.183594 24.550781 34.167969 C 25.039062 34.03125 27.277344 32.21875 27.605469 31.503906 C 28.109375 30.425781 27.636719 29.117188 26.539062 28.609375 Z M 26.472656 30.988281 C 26.292969 31.324219 24.949219 32.472656 24.355469 32.878906 C 23.761719 32.472656 22.417969 31.324219 22.238281 30.996094 C 22.019531 30.527344 22.222656 29.964844 22.6875 29.75 C 22.816406 29.6875 22.949219 29.660156 23.085938 29.660156 C 23.378906 29.660156 23.664062 29.792969 23.84375 30.042969 C 24.078125 30.363281 24.625 30.363281 24.859375 30.042969 C 25.121094 29.679688 25.609375 29.554688 26.015625 29.742188 C 26.480469 29.960938 26.683594 30.523438 26.472656 30.988281 Z M 4 16.011719 L 5.875 16.011719 L 5.875 17.886719 C 5.875 18.230469 6.152344 18.507812 6.5 18.507812 L 9 18.507812 C 9.34375 18.507812 9.621094 18.230469 9.621094 17.886719 L 9.621094 16.011719 L 11.5 16.011719 C 11.84375 16.011719 12.125 15.734375 12.125 15.386719 L 12.125 12.890625 C 12.125 12.542969 11.84375 12.265625 11.5 12.265625 L 9.621094 12.265625 L 9.621094 10.390625 C 9.621094 10.046875 9.34375 9.769531 9 9.769531 L 6.507812 9.769531 C 6.160156 9.769531 5.882812 10.046875 5.882812 10.390625 L 5.882812 12.265625 L 4.007812 12.265625 C 3.660156 12.265625 3.382812 12.542969 3.382812 12.890625 L 3.382812 15.382812 C 3.375 15.726562 3.652344 16.011719 4 16.011719 Z M 4.628906 13.503906 L 6.507812 13.503906 C 6.851562 13.503906 7.128906 13.226562 7.128906 12.882812 L 7.128906 11.007812 L 8.382812 11.007812 L 8.382812 12.882812 C 8.382812 13.226562 8.660156 13.503906 9.007812 13.503906 L 10.882812 13.503906 L 10.882812 14.757812 L 9.007812 14.757812 C 8.660156 14.757812 8.382812 15.035156 8.382812 15.382812 L 8.382812 17.257812 L 7.128906 17.257812 L 7.128906 15.382812 C 7.128906 15.035156 6.851562 14.757812 6.507812 14.757812 L 4.628906 14.757812 Z M 16.003906 11.007812 C 16.003906 10.660156 16.285156 10.382812 16.628906 10.382812 L 26.015625 10.382812 C 26.359375 10.382812 26.636719 10.660156 26.636719 11.007812 C 26.636719 11.351562 26.359375 11.628906 26.015625 11.628906 L 16.628906 11.628906 C 16.285156 11.628906 16.003906 11.351562 16.003906 11.007812 Z M 16.003906 14.136719 C 16.003906 13.789062 16.285156 13.511719 16.628906 13.511719 L 26.015625 13.511719 C 26.359375 13.511719 26.636719 13.789062 26.636719 14.136719 C 26.636719 14.480469 26.359375 14.757812 26.015625 14.757812 L 16.628906 14.757812 C 16.285156 14.757812 16.003906 14.480469 16.003906 14.136719 Z M 16.003906 17.257812 C 16.003906 16.910156 16.285156 16.632812 16.628906 16.632812 L 26.015625 16.632812 C 26.359375 16.632812 26.636719 16.910156 26.636719 17.257812 C 26.636719 17.601562 26.359375 17.878906 26.015625 17.878906 L 16.628906 17.878906 C 16.285156 17.886719 16.003906 17.601562 16.003906 17.257812 Z M 16.003906 17.257812 " /></g></svg>
                                        }
                                    </div>
                                )
                            }
                            <span
                                className={`absolute text-xl font-bold bottom-6 left-6 transition-all mr-20 ${activePackage === index ? "left-1/2 transform -translate-x-[150%] hidden" : ""
                                    }`}
                            >
                                {pkg.title}
                            </span>

                            <div className="absolute bottom-3 right-3 flex items-center justify-center w-14 h-14">
                                <div className="absolute w-12 h-12 bg-gray-200 bg-opacity-50 border border-white rounded-full shadow-md"></div>
                                <div className="absolute w-7 h-7 bg-gray-200 bg-opacity-50 border-2 border-white rounded-full"></div>
                                <span className="absolute text-lg font-bold text-white">{activePackage === index ? "-" : "+"}</span>
                            </div>

                            {activePackage === index && (
                                <>
                                    <p className="text-xl font-bold absolute top-6 w-full text-center -ml-5 text-[#52869A]">{pkg.title}</p>
                                    <div className="absolute top-16 left-6">
                                        <p className="font-bold text-lg">Test Includes:</p>
                                        <ul className="list-disc text-[#52869A] text-sm pl-5 mt-1">
                                            {pkg.tests.map((test, i) => (
                                                <li key={i}>{test}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}

                            {activePackage === index && (
                                <button className="absolute bottom-4 left-20 transform -translate-x-1/2 bg-[#52869A] text-white text-sm font-medium px-4 py-2 rounded-2xl hover:bg-[#4A6E85]">
                                    Price: <span className="font-bold">{pkg.price}/-</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <section className="mb-8">
                <p className="text-center text-3xl pt-4 text-[#198A70]">For School</p>
                <p className="text-center max-w-3xl mx-auto py-2">At <b className="text-[#79C8AD]">Uyellitout</b>, we understand that creating a supportive, emotionally healthy school environment is key to student success. We work closely with schools to develop personalized programs that foster emotional resilience, enhance mental well-being, and equip students, teachers, and parents with the tools they need to thrive.</p>
                <div className="mx-auto max-w-6xl mt-4 flex flex-wrap justify-center gap-4">
                    {
                        [
                            {
                                "title": "Student Counseling Program",
                                "description": "Providing tailored emotional support through one-on-one and group counseling to help students handle academic and social pressures.",
                                "what": "The Student Counseling Program is a supportive service designed to help students navigate emotional, social, and academic challenges. It provides a safe, confidential environment where students can explore their feelings, develop coping strategies, and build emotional resilience. The program offers one-on-one counseling as well as group sessions tailored to the needs of the students.",
                                "sections": [
                                    {
                                        "title": "How It Works",
                                        "contents": [
                                            {
                                                "title": "Screening Process",
                                                "description": "Initial assessment using questionnaires and feedback from teachers/parents to identify emotional and academic needs."
                                            },
                                            {
                                                "title": "Group Counseling",
                                                "description": "Students are placed in group sessions to address common issues like stress, peer relationships, and emotional well-being."
                                            },
                                            {
                                                "title": "Individual Counseling",
                                                "description": "Students with specific concerns (e.g., trauma, anxiety) are given one-on-one counseling sessions for personalized support."
                                            },
                                            {
                                                "title": "Ongoing Monitoring",
                                                "description": "Regular check-ins with students, teachers, and parents to track progress and ensure continued support."
                                            },
                                            {
                                                "title": "Optional Continued Support",
                                                "description": "Students can choose to continue individual counseling if needed or attend occasional follow-up sessions for lighter support."
                                            }
                                        ]
                                    },
                                    {
                                        "title": "How It Helps Students",
                                        "contents": [
                                            {
                                                "title": "Emotional Growth",
                                                "description": "Recognizes and expresses emotions healthily, reduces stress, anxiety, and emotional turmoil, builds emotional resilience."
                                            },
                                            {
                                                "title": "Improved Focus & Academic Performance",
                                                "description": "Manages academic pressure effectively, enhances concentration and focus, improves grades and school performance."
                                            },
                                            {
                                                "title": "Enhanced Social Skills & Relationships",
                                                "description": "Strengthens communication and empathy, improves conflict resolution abilities, fosters healthier peer and teacher relationships."
                                            },
                                            {
                                                "title": "Stronger Self-Esteem & Confidence",
                                                "description": "Builds coping strategies and resilience, improves self-image and confidence, promotes a proactive, positive attitude."
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "title": "Teacher Empowering Workshop",
                                "description": "Training teachers to recognize emotional distress, manage classrooms, and create nurturing learning environments.",
                                "what": "The Teacher Empowering Workshop focuses on equipping teachers with practical strategies for addressing emotional well-being within their classrooms. The workshop covers topics like mental health awareness, identifying signs of emotional distress, and effective communication with students.",
                                "sections": [
                                    {
                                        "title": "Workshop Content",
                                        "contents": [
                                            {
                                                "title": "Mental Health Awareness",
                                                "description": "Understanding the importance of mental health, recognizing signs of emotional distress, and promoting a safe classroom environment."
                                            },
                                            {
                                                "title": "Emotional First Aid",
                                                "description": "Techniques for managing students' emotional needs in real-time, helping to de-escalate emotionally charged situations."
                                            },
                                            {
                                                "title": "Creating a Nurturing Environment",
                                                "description": "Developing a classroom culture that fosters emotional safety, trust, and support for all students."
                                            },
                                            {
                                                "title": "Interactive Activities",
                                                "description": "Practical exercises to help teachers practice their new skills and reinforce emotional awareness in the classroom."
                                            }
                                        ]
                                    },
                                    {
                                        "title": "Benefits for Teachers",
                                        "contents": [
                                            {
                                                "title": "Better Classroom Management",
                                                "description": "A deeper understanding of students' emotional and social challenges, leading to better classroom dynamics."
                                            },
                                            {
                                                "title": "Improved Teacher-Student Relationships",
                                                "description": "Teachers can build stronger, more supportive relationships with students by addressing emotional needs."
                                            },
                                            {
                                                "title": "Enhanced Confidence",
                                                "description": "Teachers feel more equipped and confident in handling emotional distress, mental health challenges, and other sensitive student issues."
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "title": "Academic Stress Management",
                                "description": "Fostering a supportive school environment through mental health training for staff, students, and parents.",
                                "what": "The Academic Stress Management program focuses on helping students manage the pressures of schoolwork, exams, and extracurricular activities. It aims to reduce stress levels, increase productivity, and help students find a healthy balance between their academic and personal lives.",
                                "sections": [
                                    {
                                        "title": "How It Works",
                                        "contents": [
                                            {
                                                "title": "Stress Assessment",
                                                "description": "Identifying sources of stress, from schoolwork to personal life, and creating an individualized stress management plan."
                                            },
                                            {
                                                "title": "Time Management Training",
                                                "description": "Offering students tools to plan their academic tasks, reduce procrastination, and prioritize self-care."
                                            },
                                            {
                                                "title": "Mindfulness and Relaxation Techniques",
                                                "description": "Teaching students techniques like deep breathing, meditation, and progressive muscle relaxation to manage stress."
                                            },
                                            {
                                                "title": "Ongoing Support",
                                                "description": "Regular follow-up sessions to review stress levels and provide continued guidance and support."
                                            }
                                        ]
                                    },
                                    {
                                        "title": "Benefits",
                                        "contents": [
                                            {
                                                "title": "Better Stress Management",
                                                "description": "Equips students with tools to handle stress effectively, leading to a more positive academic experience."
                                            },
                                            {
                                                "title": "Improved Focus and Productivity",
                                                "description": "Helps students prioritize tasks, focus better in class, and enhance productivity while reducing burnout."
                                            },
                                            {
                                                "title": "Increased Well-being",
                                                "description": "Encourages self-care practices that promote physical and mental well-being, ensuring students' overall health is prioritized."
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "title": "Parenting Support Seminars",
                                "description": "Equipping parents with tools to communicate effectively, support teens, and identify signs of emotional distress.",
                                "what": "The Parenting Support Seminar offers valuable guidance for parents on how to support their children's mental health, navigate difficult situations, and communicate effectively.",
                                "sections": [
                                    {
                                        "title": "Seminar Topics",
                                        "contents": [
                                            {
                                                "title": "Effective Communication",
                                                "description": "Understanding the importance of open communication, emotional listening, and encouraging children to express themselves."
                                            },
                                            {
                                                "title": "Recognizing Emotional Distress",
                                                "description": "Identifying early signs of emotional issues such as anxiety or depression in children and teens."
                                            },
                                            {
                                                "title": "Strategies for Handling Teen Issues",
                                                "description": "Providing support for teens through difficult topics like peer pressure, academic challenges, and identity issues."
                                            },
                                            {
                                                "title": "Parenting Techniques for Building Self-Esteem",
                                                "description": "Tips and strategies for boosting your child's self-confidence, independence, and emotional resilience."
                                            }
                                        ]
                                    },
                                    {
                                        "title": "Benefits",
                                        "contents": [
                                            {
                                                "title": "Improved Communication Skills",
                                                "description": "Strengthening the bond between parents and children through better communication."
                                            },
                                            {
                                                "title": "Better Understanding of Teen Behavior",
                                                "description": "Parents gain insight into their teens' behavior and how to offer constructive guidance."
                                            },
                                            {
                                                "title": "Enhanced Parenting Techniques",
                                                "description": "Learning new skills and strategies that help parents navigate difficult topics and situations effectively."
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "title": "Bullying Prevention & Awareness",
                                "description": "Empowering students to become empathetic peer mentors, supporting classmates with emotional and social challenges",
                                "what": "The Bullying Prevention and Awareness program helps raise awareness about bullying and equips students with strategies for preventing and addressing bullying in schools.",
                                "sections": [
                                    {
                                        "title": "Program Content",
                                        "contents": [
                                            {
                                                "title": "Understanding Bullying",
                                                "description": "Defining bullying, recognizing different forms (verbal, physical, social), and understanding its emotional impact."
                                            },
                                            {
                                                "title": "Building Empathy",
                                                "description": "Teaching students the importance of empathy and understanding others' feelings to reduce bullying."
                                            },
                                            {
                                                "title": "Peer Mentoring",
                                                "description": "Encouraging students to take on leadership roles by supporting peers who may be struggling with bullying or social isolation."
                                            },
                                            {
                                                "title": "Intervention Strategies",
                                                "description": "Providing students with tools to intervene if they witness bullying, and how to support those affected by it."
                                            }
                                        ]
                                    },
                                    {
                                        "title": "Benefits",
                                        "contents": [
                                            {
                                                "title": "Increased Awareness",
                                                "description": "Students become more aware of bullying issues, its effects, and how to prevent it."
                                            },
                                            {
                                                "title": "Empathetic Student Body",
                                                "description": "Building a more supportive, inclusive, and caring student community."
                                            },
                                            {
                                                "title": "Empowerment",
                                                "description": "Students feel empowered to take action against bullying and help create safer environments in schools."
                                            }
                                        ],
                                    },
                                ]
                            }
                        ].map((item, index) => (
                            <MorphingDialog
                                key={item.title}
                                transition={{
                                    type: "spring",
                                    bounce: 0.05,
                                    duration: 0.25,
                                }}
                            >
                                <MorphingDialogTrigger
                                    style={{
                                        borderRadius: "24px",
                                    }}
                                    className='max-w-72 flex flex-col overflow-hidden border bg-white'
                                >
                                    <div className="p-2.5 h-full space-y-1.5 flex flex-col justify-between">
                                        <div>
                                            <div>
                                                <img className="w-full p-2 aspect-video rounded-xl bg-[#ccddd4]" src={`/service/extra/${index + 1}.svg`} alt="" />
                                            </div>
                                            <div className="p-2">
                                                <p className="font-semibold">{item.title}</p>
                                                <p className="text-sm text-gray-800">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between pt-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button onClick={(event) => { event.stopPropagation(); }} className="bg-[#52869A] font-bold rounded-xl">BOOK NOW</Button>
                                                </DialogTrigger>
                                                <DialogContent className="overflow-y-scroll max-h-svh sm:max-h-[80svh]" onClick={(event) => { event.stopPropagation(); }}>
                                                    <DialogHeader>
                                                        <DialogTitle>Book a personalized programs for your school</DialogTitle>
                                                        <DialogDescription>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <SchoolContactForm defaultService={item.title} />
                                                </DialogContent>
                                            </Dialog>
                                            <Button className="font-bold" variant="ghost">Know More</Button>
                                        </div>
                                    </div>
                                </MorphingDialogTrigger>
                                <MorphingDialogContainer>
                                    <MorphingDialogContent
                                        style={{
                                            borderRadius: "24px",
                                        }}
                                        className='pointer-events-auto relative flex h-auto w-full flex-col border border-zinc-950/10 bg-white sm:w-[45rem] max-h-[80svh] overflow-scroll'
                                    >
                                        <div className='p-6 text-zinc-950 space-y-3'>
                                            <MorphingDialogTitle className='text-xl font-semibold'>
                                                {item.title}
                                            </MorphingDialogTitle>
                                            <MorphingDialogDescription
                                                disableLayoutAnimation
                                                variants={{
                                                    initial: { opacity: 0, scale: 0.8, y: 100 },
                                                    animate: { opacity: 1, scale: 1, y: 0 },
                                                    exit: { opacity: 0, scale: 0.8, y: 100 },
                                                }}
                                            >
                                                <div>
                                                    <p className="text-lg font-semibold">What is it?</p>
                                                    <p>{item.what}</p>
                                                </div>
                                                <div className="pt-3 space-y-4">
                                                    {
                                                        item.sections.map(section => (
                                                            <div key={section.title} className="space-y-1">
                                                                <p className="text-lg font-semibold">{section.title}:</p>
                                                                <ul className="list-disc pl-4">
                                                                    {
                                                                        section.contents.map(content => (
                                                                            <li className="" key={content.title}><b>{content.title}: </b>{content.description}</li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        ))

                                                    }
                                                </div>
                                            </MorphingDialogDescription>
                                        </div>
                                        <MorphingDialogClose className='text-zinc-950' />
                                    </MorphingDialogContent>
                                </MorphingDialogContainer>
                            </MorphingDialog>
                        ))
                    }
                </div>
            </section>
        </main>
    );
}
