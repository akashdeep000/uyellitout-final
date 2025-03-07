import { QuizList } from "./quiz";

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const topicIndex = (await params).id - 1;

    return (
        <div className="min-h-full grid">
            <QuizList topicIndex={topicIndex} />
        </div>
    );
}