import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
    className?: string;
    children: ReactNode;
}

export function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
    return (
        <div className={cn("mx-auto p-2", className)}>{children}</div>
    );
}
