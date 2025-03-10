"use client";
import { Quiz } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { ChevronLeft, Share2 } from "lucide-react";
import { useEffect, useState } from "react";


export function Result({ percentage, quiz }: { percentage: number, quiz: Quiz }) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);
    const grade = quiz.grades.sort((a, b) => b.percent - a.percent).find(grade => percentage >= grade.percent);


    return (
        <div className="fixed sm:rounded-lg rounded-none sm:relative z-[500000] sm:z-[50] top-0 left-0 w-full h-full bg-[#9ed6b7] flex flex-col">
            {
                current !== 1 && (
                    <div className="flex justify-end p-2">
                        <Button variant="ghost" className="rounded-full font-semibold text-white hover:text-[#9ed6b7] [&_svg]:size-5"><Share2 className="rotate-180 stroke-2" /> Share</Button>
                    </div>
                )
            }
            <Carousel setApi={setApi} className="flex-1 h-full sm:w-[calc(100svw_-_14rem)]">
                <CarouselContent className="h-full">
                    <CarouselItem className="h-full p-4 pl-8">
                        <div className="h-full max-w-prose mx-auto flex flex-col justify-center">
                            <img className="w-full" src="/result/page-1/image-1.svg" />
                            <div className="p-12 text-gray-800">
                                <p className="text-2xl">Your <span className="font-semibold text-4xl">Brain’s</span></p>
                                <p className="text-3xl font-semibold">Cheat Sheet</p>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="h-full p-4 pl-8">
                        <div className="h-full max-w-md mx-auto flex flex-col justify-center gap-8">
                            <div className="flex">
                                <div className="aspect-square w-[35%] -mt-10">
                                    <svg
                                        className="fill-yellow-100 scale-125"
                                        viewBox="0 0 200 200"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M48.7,-20.7C55.3,4.4,47.4,29.4,31.2,40.7C15,51.9,-9.5,49.4,-29.3,36.1C-49.1,22.7,-64.2,-1.5,-58.5,-25.4C-52.8,-49.2,-26.4,-72.7,-2.7,-71.9C21.1,-71,42.2,-45.8,48.7,-20.7Z"
                                            transform="translate(100 100)"
                                        />
                                        <text
                                            x="95"
                                            y="90"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontWeight="bold"
                                            fontSize="40"
                                            className="fill-gray-800"
                                        >
                                            {percentage.toFixed(0)}
                                        </text>
                                    </svg>
                                </div>
                                <div className="w-[65%]">
                                    <img className="w-full" src="/result/page-2/emmotions/image-1.svg" />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl text-gray-800 font-semibold tracking-tighter">
                                    {grade?.title}
                                </p>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="h-full p-4 pl-8">
                        <div className="h-full max-w-md mx-auto flex flex-col justify-center gap-8">
                            <div className="flex">
                                <div className="aspect-square w-[40%] -mt-10">
                                    <svg
                                        className="fill-yellow-100 scale-125"
                                        viewBox="0 0 200 200"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M48.7,-20.7C55.3,4.4,47.4,29.4,31.2,40.7C15,51.9,-9.5,49.4,-29.3,36.1C-49.1,22.7,-64.2,-1.5,-58.5,-25.4C-52.8,-49.2,-26.4,-72.7,-2.7,-71.9C21.1,-71,42.2,-45.8,48.7,-20.7Z"
                                            transform="translate(100 100)"
                                        />
                                        <text
                                            x="95"
                                            y="90"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontWeight="bold"
                                            fontSize="40"
                                            className="fill-gray-800"
                                        >
                                            {percentage.toFixed(0)}
                                        </text>
                                    </svg>
                                </div>
                                <div className="w-[60%]">
                                    <img className="w-full" src="/result/page-3/emmotions/image-1.svg" />
                                </div>
                            </div>
                            <div className="text-gray-800 tracking-tighter space-y-4">
                                <p className="text-2xl">
                                    {grade?.description}
                                </p>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="h-full p-4 pl-8">
                        <div className="h-full max-w-prose mx-auto flex flex-col justify-center">
                            <div className="h-[60%] w-full grid place-items-center">
                                <img className="h-full" src="/result/page-4/image-1.svg" />
                            </div>
                            <div className="p-12 text-gray-800">
                                <p className="font-semibold text-6xl text-white">Pro - tip </p>
                                <p className="text-4xl">protin</p>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        5
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className="flex justify-center">
                {
                    current !== 1 && <Button variant="secondary" size="lg">BOOK YOUR SESSION</Button>
                }
            </div>
            <div className="p-2 flex gap-1 justify-between sm:judstify-around items-center">
                <Button disabled={current === 1} onClick={() => api?.scrollPrev()} variant="ghost" size="icon" className="border-2 border-white rounded-full text-white hover:text-[#9ed6b7]"><ChevronLeft className="stroke-[4]" /></Button>
                <div className="flex gap-1">
                    {
                        Array.from({ length: count }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-2.5 h-2.5 rounded-full ${current === index + 1 ? "bg-white" : "bg-white/50"
                                    }`}
                            />
                        ))
                    }
                </div>
                <Button disabled={current === count} onClick={() => api?.scrollNext()} variant="ghost" size="icon" className="border-2 border-white rounded-full text-white hover:text-[#9ed6b7]"><ChevronLeft className="rotate-180 stroke-[4]" /></Button>
            </div>
        </div >
    );
}