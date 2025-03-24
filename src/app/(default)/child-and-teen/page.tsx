"use client";
import { NewBooking } from "@/components/bookings/new-booking";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
    return (
        <main>
            <section className="p-4 pt-10">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-4xl text-center text-[#198A70]">Child & Teen Counseling</h1>
                </div>
                <div className="grid  max-w-7xl mx-auto md:grid-cols-[4fr_3fr] gap-8 p-4 mt-8">
                    <div className="max-w-prose space-y-4">
                        <p className="text-2xl font-semibold">
                            Is your child or teen struggling with issues like academic pressure, social anxiety, or self-confidence?
                        </p>
                        <p>
                            Today’s young people face unique challenges, and counseling can provide the tools they need to thrive.
                        </p>
                        <div className="bg-[#9ED6B7] rounded-xl p-6 space-y-2">
                            <p className="text-2xl font-semibold">Key Issues Addressed:</p>
                            <ul className="pl-4">
                                <li className="list-disc">
                                    Academic Pressure and Performance Anxiety
                                </li>
                                <li className="list-disc">
                                    Technology and Screen-Time Balance
                                </li>
                                <li className="list-disc">
                                    Social Anxiety and Peer Relationships
                                </li>
                                <li className="list-disc">
                                    Emotional Self-Regulation and Anger Management
                                </li>
                                <li className="list-disc">
                                    Self-Esteem and Body Image
                                </li>
                                <li className="list-disc">
                                    Identity and Independence
                                </li>
                                <li className="list-disc">
                                    Family Changes and Conflict
                                </li>
                                <li className="list-disc">
                                    Behavioral Issues
                                </li>
                                <li className="list-disc">
                                    Mental Health Concerns
                                </li>
                                <li className="list-disc">
                                    Transitions and Life Adjustments
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full grid place-items-center">
                        <img className="max-w-md w-full h-auto" src="/therapies/child/1.svg" alt="" />
                    </div>
                </div>
            </section>
            <section className="p-4 mt-10">
                <div>
                    <p className="text-3xl text-center">Therapeutic Approaches</p>
                </div>
                <div className="mt-16 flex flex-wrap justify-center gap-4">
                    <div className="sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Cognitive Behavioral Therapy (CBT):
                        </p>
                        <p>
                            Helps young people identify and change unhelpful thoughts and behaviors, managing stress and negative self-talk.
                        </p>
                    </div>
                    <div className="lg:translate-y-12 sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Play and Art Therapy:
                        </p>
                        <p>
                            For younger children, creative methods help express and process complex feelings in a non-verbal way.
                        </p>
                    </div>
                    <div className="sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Mindfulness-Based Techniques:
                        </p>
                        <p>
                            Practical exercises that teach children and teens to stay present, reduce stress, and respond calmly to challenging situations.
                        </p>
                    </div>
                    <div className="lg:translate-y-12 sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Family Systems Therapy:
                        </p>
                        <p>
                            Involving family members to improve communication, set healthy boundaries, and support the child’s growth.
                        </p>
                    </div>

                </div>
            </section>
            <section className="mt-10 lg:mt-20 p-4 space-y-4">
                <p className="text-3xl text-center">How It Works?</p>
                <div className="hidden max-w-7xl mx-auto lg:flex gap-2 items-center">
                    {
                        ["Private & Confidential Space", "Personaized Goal Settings", "Ongoing Skill-Building  Excercises", "Regular Progress Reviews", "Continued Support"].map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="flex-1 flex flex-col items-center justify-center gap-2">
                                        <div className="size-32">
                                            <img className="w-full h-full" src={`/therapies/child/a-${index + 1}.svg`} alt="" />
                                        </div>
                                        <p className="text-center">{item}</p>
                                    </div>
                                    {
                                        index !== 4 && <ArrowRight />
                                    }
                                </React.Fragment>
                            );
                        })
                    }
                </div>
                <Carousel className="lg:hidden w-full max-w-md mx-auto px-9" plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}>
                    <CarouselContent className="-ml-0.5 mr-0.5">
                        {["Private & Confidential Space", "Personaized Goal Settings", "Ongoing Skill-Building  Excercises", "Regular Progress Reviews", "Continued Support"].map((item, index) => (
                            <CarouselItem key={index} className="pl-2">
                                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                                    <div className="size-32">
                                        <img className="w-full h-full" src={`/therapies/child/a-${index + 1}.svg`} alt="" />
                                    </div>
                                    <p className="text-center">Step {index + 1} - {item}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                </Carousel>
            </section>
            <section className="my-10 p-4 space-y-4">
                <p className="text-3xl text-center">Not sure if therapy is right for you?</p>
                <p className="text-center">Take a quiz to understand if you need therapy</p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link href="/dashboard/quiz"><Button variant="default" size={"lg"} className="px-12 py-8 text-2xl rounded-xl font-semibold bg-emerald-500">Do I need therapy ?</Button></Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" size={"lg"} className="px-12 py-8 text-2xl rounded-xl font-semibold">Book your session</Button>
                        </DialogTrigger>
                        <DialogContent className="text-left max-h-svh max-w-3xl overflow-y-scroll">
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <NewBooking defaultProductType="service" defaultProductId={2} isNested={true} />
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
        </main>
    );
}