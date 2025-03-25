import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingScreen() {

    return (
        <Skeleton className="rounded-lg w-full h-full" />
    );
}