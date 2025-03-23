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
                    <h1 className="text-4xl text-center text-[#198A70]">INDIVIDUAL THERAPY</h1>
                </div>
                <div className="grid md:grid-cols-[4fr_3fr] gap-8 p-4 mt-8">
                    <div className="space-y-4">
                        <p className="text-2xl font-semibold">
                            Are you struggling with stress, anxiety, depression, or other life challenges?
                        </p>
                        <p>
                            You don&apos;t have to face them alone
                            <br />
                            <br />
                            Individual counseling is a personalized therapeutic process where you work one-on-one with a professional therapist. In these sessions, you&apos;ll explore your thoughts, feelings, and behaviors, and gain insights into the challenges you&apos;re facing.
                        </p>
                        <div className="bg-[#9ED6B7] rounded-xl p-6 space-y-2">
                            <p className="text-2xl font-semibold">Key Issues Addressed:</p>
                            <ul className="pl-4">
                                <li className="list-disc">
                                    Anxiety & Stress (including panic attacks)
                                </li>
                                <li className="list-disc">
                                    Depression & Low Mood
                                </li>
                                <li className="list-disc">
                                    Anger Management
                                </li>
                                <li className="list-disc">
                                    Trauma & PTSD
                                </li>
                                <li className="list-disc">
                                    Relationship Issues (family, friends, romantic)
                                </li>
                                <li className="list-disc">
                                    Self-Esteem & Confidence
                                </li>
                                <li className="list-disc">
                                    Grief & Loss
                                </li>
                                <li className="list-disc">
                                    Life Transitions (career change, relocation)
                                </li>
                                <li className="list-disc">
                                    Addiction (substance abuse, behavioral)
                                </li>
                                <li className="list-disc">
                                    Personal Growth & Self-Discovery
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full grid place-items-center">
                        <img className="max-w-md w-full h-auto" src="/therapies/individual/1.svg" alt="" />
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
                            A practical approach that helps you identify and change negative thinking patterns, and develop healthier responses to life’s challenges.
                        </p>
                    </div>
                    <div className="lg:translate-y-12 sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Mindfulness-Based Stress Reduction (MBSR):
                        </p>
                        <p>
                            Learn mindfulness techniques to reduce anxiety, improve focus, and live more fully in the present moment.
                        </p>
                    </div>
                    <div className="sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Solution-Focused Therapy:
                        </p>
                        <p>
                            A goal-oriented approach that helps you find practical solutions to current problems, focusing on your strengths and progress.
                        </p>
                    </div>
                    <div className="lg:translate-y-12 sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Psychodynamic Therapy:
                        </p>
                        <p>
                            Explore how past experiences influence your present behavior and emotions, providing deep insight into your patterns and relationships.
                        </p>
                    </div>
                </div>
            </section>
            <section className="mt-10 lg:mt-20 p-4 space-y-4">
                <p className="text-3xl text-center">How It Works?</p>
                <div className="hidden lg:flex gap-2 items-center">
                    {
                        ["Goal Settings", "personalized Approach", "Ongoing Support", "Monitor Progress", "Follow-up"].map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="flex-1 flex flex-col items-center justify-center gap-2">
                                        <div className="size-32">
                                            <img className="w-full h-full" src={`/therapies/individual/a-${index + 1}.svg`} alt="" />
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
                        {["Goal Settings", "personalized Approach", "Ongoing Support", "Monitor Progress", "Follow-up"].map((item, index) => (
                            <CarouselItem key={index} className="pl-2">
                                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                                    <div className="size-32">
                                        <img className="w-full h-full" src={`/therapies/individual/a-${index + 1}.svg`} alt="" />
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
                            <NewBooking defaultProductType="service" defaultProductId={0} isNested={true} />
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
        </main>
    );
}