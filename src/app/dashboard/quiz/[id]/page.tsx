import { use } from "react";
import { QuizList } from "./quiz";

export default function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);

    return (
        <div className="min-h-full grid">
            <QuizList id={id} />
        </div>
    );
}