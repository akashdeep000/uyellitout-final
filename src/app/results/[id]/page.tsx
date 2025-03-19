import { getQuizResultById } from "@/actions/quiz";
import { Result } from "../../dashboard/quiz/[id]/result";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const result = await getQuizResultById(id);

    if (!result) {
        return <div>Result not found</div>;
    }

    if (!result.quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="h-svh w-svw border">
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                <Result id={id} percentage={(result.mark / result.total) * 100} quiz={result.quiz} />
            }
        </div>
    );
}