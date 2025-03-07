import { Button } from "@/components/ui/button"
import Link from "next/link"
import quizes from "./quizes.json"
export default function Page() {
    const colours = ["#BBCA97", "#AACDC1", "#F6EAA1", "#B3D9BE", "#F0AA97"]
    return (
        <div className="md:pt-3 lg:pt:4">
            <div className="grid gap-4 max-w-4xl mx-auto">
                {
                    quizes.map((quiz, index) => {
                        return (
                            <Link key={index} href={`/dashboard/quiz/${index + 1}`}>
                                <div className={`bg-[${colours[index % 5]}] p-4 rounded-xl grid gap-4 grid-cols-[1fr_auto] items-center hover:scale-[1.02] transition-all`}>
                                    <div className="text-lg font-semibold self-center">{quiz.topicTitle}</div>
                                    <Button className={`bg-white hover:bg-white/70 font-semibold text-black shadow-lg`}>Start</Button>
                                </div>
                            </Link>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}