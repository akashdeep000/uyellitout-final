import { NewBooking } from "@/components/bookings/new-booking";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

export default function Page() {
    return (
        <main>
            <section className="p-4 pt-10">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-3xl text-center text-[#198A70]">INDIVIDUAL THERAPY</h1>
                </div>
                <div className="grid lg:flex gap-8 p-4 mt-8 justify-around">
                    <div className="max-w-prose space-y-4">
                        <p className="text-2xl font-semibold">
                            Are you struggling with stress, anxiety, depression, or other life challenges?
                        </p>
                        <p>
                            You don&apos;t have to face them alone
                            <br />
                            <br />
                            Individual counseling is a personalized therapeutic process where you work one-on-one with a professional therapist. In these sessions, you&apos;ll explore your thoughts, feelings, and behaviors, and gain insights into the challenges you&apos;re facing.
                        </p>
                        <div className="bg-[#D5EEF2] rounded-xl p-6 space-y-2">
                            <p className="text-2xl">Key Issues Addressed:</p>
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
                    <div>
                        <svg className="mx-auto" width="435" height="591" viewBox="0 0 435 591" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M219.541 32.0695C219.242 16.6084 231.534 3.83262 246.995 3.53399L401.966 0.540744C417.427 0.242115 430.203 12.5337 430.501 27.9948L434.383 228.957C434.682 244.418 422.39 257.194 406.929 257.493L251.958 260.486C236.497 260.785 223.721 248.493 223.422 233.032L219.541 32.0695Z" fill="#CEE6A4" />
                            <path d="M0 192C0 176.536 12.536 164 28 164H183C198.464 164 211 176.536 211 192V393C211 408.464 198.464 421 183 421H28C12.536 421 0 408.464 0 393V192Z" fill="#79C8AD" />
                            <path d="M135 362C135 346.536 147.536 334 163 334H318C333.464 334 346 346.536 346 362V563C346 578.464 333.464 591 318 591H163C147.536 591 135 578.464 135 563V362Z" fill="#BCDAE0" />
                            <path d="M0 475.271L69.2 441L106 515.306L36.8 549.577L0 475.271Z" fill="#F3D7B7" />
                        </svg>

                    </div>
                </div>
            </section>
            <section className="p-4 mt-10">
                <div>
                    <p className="text-3xl text-center">Therapeutic Approaches</p>
                </div>
                <div className="mt-16 flex flex-wrap justify-center gap-4">
                    <div className="sm:max-w-64 p-4 bg-[#D5EEF2] rounded-xl">
                        <p className="text-xl font-semibold">
                            Cognitive Behavioral Therapy (CBT):
                        </p>
                        <p>
                            A practical approach that helps you identify and change negative thinking patterns, and develop healthier responses to life’s challenges.
                        </p>
                    </div>
                    <div className="lg:translate-y-12 sm:max-w-64 p-4 bg-[#D5EEF2] rounded-xl">
                        <p className="text-xl font-semibold">
                            Mindfulness-Based Stress Reduction (MBSR):
                        </p>
                        <p>
                            Learn mindfulness techniques to reduce anxiety, improve focus, and live more fully in the present moment.
                        </p>
                    </div>
                    <div className="sm:max-w-64 p-4 bg-[#D5EEF2] rounded-xl">
                        <p className="text-xl font-semibold">
                            Solution-Focused Therapy:
                        </p>
                        <p>
                            A goal-oriented approach that helps you find practical solutions to current problems, focusing on your strengths and progress.
                        </p>
                    </div>
                    <div className="lg:translate-y-12 sm:max-w-64 p-4 bg-[#D5EEF2] rounded-xl">
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
                <p className="text-3xl text-center">How It Work?</p>
                <div className="flex h-36 bg-neutral-200">
                    <div>

                    </div>
                </div>
            </section>
            <section className="my-10 p-4 space-y-4">
                <p className="text-3xl text-center">Not sure if therapy is right for you?</p>
                <p className="text-center">Take a quizz to understand if you need therapy</p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link href="/dashboard/quiz"><Button variant="default" size={"lg"} className="px-12 py-8 text-2xl font-semibold bg-emerald-500">Do i need therapy ?</Button></Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" size={"lg"} className="px-12 py-8 text-2xl font-semibold bg-emerald-500">Book my session</Button>
                        </DialogTrigger>
                        <DialogContent className="text-left max-h-svh max-w-2xl overflow-y-scroll">
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