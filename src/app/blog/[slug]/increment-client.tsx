"use client";

import { useEffect } from "react";
import { incrementViewCount } from "./action";

export function IncrementCount({ id }: { id: string }) {
    // Increment view count if not viewed within the hour
    useEffect(() => {
        const lastViewed = localStorage.getItem(`viewed-${id}`);
        const currentTime = new Date().getTime();

        // If post was not viewed in the last hour
        if (!lastViewed || currentTime - parseInt(lastViewed) > 3600000) {
            // Mark post as viewed
            localStorage.setItem(`viewed-${id}`, currentTime.toString());

            // Call server action to increment view count
            incrementViewCount(id);

        }
    }, [id]);
    return <div></div>;
}