"use client";
import { getQuizById, getRecomendedQuiz } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export function Result({ id, percentage, quiz }: { id: string, percentage: number, quiz: Awaited<ReturnType<typeof getQuizById>> }) {
    const [api, setApi] = useState<CarouselApi>();
    const { toast } = useToast();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const imgCat = ["general", "emmotions", "growth", "parental", "relationship", "work"].find((cat) => quiz.categoryName?.toLowerCase().includes(cat)) || "general";
    const pathname = usePathname();

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

    const { data: recomendedQuiz, isLoading: recomendedQuizLoading } = useQuery({
        queryKey: ["random-quiz", id],
        queryFn: async () => {
            return await getRecomendedQuiz(id);
        }
    });

    return (
        <div className="fixed sm:rounded-lg rounded-none sm:relative z-[500000] sm:z-[50] top-0 left-0 bottom-0 right-0 w-full h-full bg-[#9ed6b7] flex flex-col">
            {
                current !== 1 && (
                    <div className="flex justify-end p-2">
                        <Button onClick={async () => {
                            if (navigator.share) {
                                await navigator.share({
                                    title: "Uyellitout - Brain's Cheat Sheet",
                                    text: `I got ${percentage}% on the ${quiz.title} quiz!`,
                                    url: `${window.location.origin}/results/${id}`
                                });
                            } else if (navigator.clipboard) {
                                await navigator.clipboard.writeText(`${window.location.origin}/results/${id}`);
                                toast({
                                    title: "Link copied to clipboard",
                                    description: "Share this link with your friends to show them your results!"
                                });
                            }

                        }} variant="ghost" className="rounded-full font-semibold text-white hover:text-[#9ed6b7] [&_svg]:size-5"><Share2 className="rotate-180 stroke-2" /> Share</Button>
                    </div>
                )
            }
            <Carousel setApi={setApi} className={cn("flex-1 h-full overflow-y-scroll", pathname.includes("dashboard") ? "sm:w-[calc(100svw_-_14rem)]" : "")}>
                <CarouselContent className="h-full">
                    <CarouselItem className="h-full p-4 pl-8">
                        <div className="h-full max-w-prose mx-auto flex flex-col justify-center">
                            <img className="w-full" src="/result/page-1/image-1.svg" />
                            <div className="p-12 text-gray-800">
                                <p className="text-4xl">Your <span className="font-semibold text-5xl">Brain’s</span></p>
                                <p className="text-5xl font-semibold">Cheat Sheet</p>
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
                                    <img className="w-full" src={`/result/page-2/${imgCat}/image-1.svg`} />
                                </div>
                            </div>
                            <div>
                                <p className="text-3xl text-gray-800 font-semibold tracking-tighter">
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
                                    <img className="w-full" src={`/result/page-3/${imgCat}/image-1.svg`} />
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
                                <p className="font-semibold text-7xl text-white">Pro - tip </p>
                                <p className="text-5xl">potion</p>
                            </div>
                        </div>
                    </CarouselItem>
                    {
                        grade?.tips.map((tip, index) => (
                            <CarouselItem key={index} className="h-full p-4 pl-8">
                                <div className="h-full max-w-prose mx-auto flex gap-8 flex-col justify-center">
                                    <div className="h-[50%] w-full grid place-items-center">
                                        <img className="h-full" src={tip.image} />
                                    </div>
                                    <div className="text-gray-800 tracking-tighter space-y-4">
                                        <p className="font-semibold text-2xl" dangerouslySetInnerHTML={{ __html: tip.title.replaceAll("{", "<span class=\"text-3xl\">").replaceAll("}", "</span>").replaceAll("[", "<span class=\"text-white\">").replaceAll("]", "</span>") }} />
                                        <p className="text-2xl" dangerouslySetInnerHTML={{ __html: tip.description.replaceAll("{", "<span class=\"text-3xl\">").replaceAll("}", "</span>").replaceAll("[", "<span class=\"text-white\">").replaceAll("]", "</span>") }} />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    }
                    <CarouselItem className="h-full p-4 pl-8">
                        <div className="h-full max-w-prose mx-auto flex flex-col gap-8">
                            <div className="h-[50%] w-full flex flex-col space-y-2">
                                <p className="text-xl font-semibold text-left">
                                    Think you have figured out yourself ...?
                                </p>
                                <p className="text-2xl text-white font-semibold text-left">
                                    Try another !
                                </p>
                                <div className="flex-1">
                                    <div className="grid grid-cols-2 gap-4 h-full ">
                                        <div className="rounded-xl shadow-xl p-4 h-[70%] bg-neutral-50 flex flex-col">
                                            <img className="flex-1 mx-auto" src={`/result/page-8/${imgCat}/image-1.svg`} />
                                            <p className="text-gray-800 translate-y-4">{recomendedQuiz?.sameCatQuiz?.title}</p>
                                            {
                                                !recomendedQuizLoading &&
                                                <Link className="mx-auto translate-y-8" href={`/dashboard/quizzes/${recomendedQuiz?.sameCatQuiz?.id}`}>
                                                    <Button className="" variant="default">Start now</Button>
                                                </Link>
                                            }
                                        </div>
                                        <div className="rounded-xl shadow-xl p-4 h-[70%] mt-[27%] bg-neutral-50 flex flex-col">
                                            <img className="flex-1 mx-auto" src={`/result/page-8/${imgCat}/image-2.svg`} />
                                            <p className="text-gray-800 translate-y-4">{recomendedQuiz?.diffCatQuiz?.title}</p>
                                            {
                                                !recomendedQuizLoading &&
                                                <Link className="mx-auto translate-y-8" href={`/dashboard/quizzes/${recomendedQuiz?.diffCatQuiz?.id}`}>
                                                    <Button className="" variant="default">Start now</Button>
                                                </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <p className="pt-6 text-xl font-semibold text-center">Need more <span className="text-white">HELP?</span></p>
                            </div>

                            <div className="flex-1 grid place-items-center">
                                <div className="h-full aspect-square bg-[url(/blog-thumb.svg)] bg-cover bg-top rounded-2xl">
                                    <div className="h-full py-[20%] flex flex-row items-end font-semibold w-[60%] lg:text-xl md:text-sm sm:text-2xl px-4">
                                        <div className="space-y-4">
                                            <p className="">How to deal with<br />anxiety?</p>
                                            <button className="scale-90 ml-[-5%] bg-white shadow-xl px-3 py-1 rounded-xl">Read</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className="flex justify-center">
                {
                    current !== 1 && <Button variant="secondary" size="lg">BOOK YOUR SESSION</Button>
                }
            </div>
            <div className="p-2 flex gap-1 justify-around sm:judstify-around items-center">
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