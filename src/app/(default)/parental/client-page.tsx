"use client";
import { NewBooking } from "@/components/bookings/new-booking";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export function ClientPage() {
    return (
        <main>
            <section className="p-4 pt-10">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-4xl text-center text-[#198A70]">Parental Counseling</h1>
                </div>
                <div className="grid max-w-7xl mx-auto md:grid-cols-[4fr_3fr] gap-8 p-4 mt-8">
                    <div className="max-w-prose space-y-4">
                        <p className="text-2xl font-semibold">
                            Are you facing challenges in parenting, navigating your child’s behavior, or managing family dynamics?
                        </p>
                        <p>
                            Parenting can be overwhelming, but with guidance, it can also be a deeply rewarding journey.
                            <br />
                            <br />
                            Parental counseling provides you with support, strategies, and insights to address your unique family needs. In these sessions, you&apos;ll learn effective parenting techniques, build better communication with your child, and develop the tools to create a nurturing, positive environment at home.
                        </p>
                        <div className="bg-[#9ED6B7] rounded-xl p-6 space-y-2">
                            <p className="text-2xl font-semibold">Key Issues Addressed:</p>
                            <ul className="pl-4">
                                <li className="list-disc">
                                    Child and Teen Behavior Management
                                </li>
                                <li className="list-disc">
                                    Communication Challenges with Children
                                </li>
                                <li className="list-disc">
                                    Discipline and Boundaries
                                </li>
                                <li className="list-disc">
                                    Co-Parenting and Blended Families
                                </li>
                                <li className="list-disc">
                                    Building Healthy Parent-Child Relationships
                                </li>
                                <li className="list-disc">
                                    Managing Parenting Stress and Burnout
                                </li>
                                <li className="list-disc">
                                    Support for Parents of Children with Special Needs
                                </li>
                                <li className="list-disc">
                                    Navigating Major Transitions (such as divorce or relocation)
                                </li>
                                <li className="list-disc">
                                    Parenting Through Emotional and Behavioral Issues
                                </li>
                                <li className="list-disc">
                                    Work-Life Balance and Family Dynamics
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full grid place-items-center">
                        <img className="max-w-md w-full h-auto" src="/therapies/parental/1.svg" alt="" />
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
                            Positive Parenting Techniques:
                        </p>
                        <p>
                            Learn research-backed methods to encourage good behavior, set boundaries, and build mutual respect with your child.
                        </p>
                    </div>
                    <div className="lg:translate-y-12 sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Cognitive Behavioral Therapy (CBT) for Parenting:
                        </p>
                        <p>
                            Understand and adjust unhelpful thought patterns to promote calm, constructive reactions to parenting challenges.
                        </p>
                    </div>
                    <div className="sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Mindfulness-Based Parenting:
                        </p>
                        <p>
                            Practice mindfulness techniques to stay present, manage stress, and respond more thoughtfully in difficult moments.
                        </p>
                    </div>
                    <div className="lg:translate-y-12 sm:max-w-64 p-4 bg-[#D8ECEE] rounded-xl">
                        <p className="text-xl font-semibold">
                            Family Systems Therapy:
                        </p>
                        <p>
                            Explore the family’s influence on each individual’s behavior, helping you understand and address complex family dynamics.
                        </p>
                    </div>
                </div>
            </section>
            <section className="mt-10 lg:mt-20 p-4 space-y-4">
                <p className="text-3xl text-center">How It Works?</p>
                <div className="hidden max-w-7xl mx-auto lg:flex gap-2 items-center">
                    {
                        ["Colaborative Goal Setting", "Customized Parenting Strategies", "Resources for Growth", "Progress Monitoring", "Follow-up"].map((item, index) => {
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
                        {["Colaborative Goal Setting", "Customized Parenting Strategies", "Resources for Growth", "Progress Monitoring", "Follow-up"].map((item, index) => (
                            <CarouselItem key={index} className="pl-2">
                                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                                    <div className="size-32">
                                        <img className="w-full h-full" src={`/therapies/parental/a-${index + 1}.svg`} alt="" />
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
                            <NewBooking defaultProductType="service" defaultProductId={1} isNested={true} />
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
        </main>
    );
}