"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "motion/react";

interface WordFadeInProps {
    words: string;
    className?: string;
    delay?: number;
    variants?: Variants;
}

function WordFadeIn({
    words,
    delay = 0.15,
    variants = {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: i * delay },
        }),
    },
    className,
}: WordFadeInProps) {
    const _words = words.split(" ");

    return (
        <motion.h1
            variants={variants}
            initial="hidden"
            animate="visible"
            className={cn(
                "font-display text-center text-3xl drop-shadow-sm",
                className,
            )}
        >
            {_words.map((word, i) => (
                <motion.span key={word} variants={variants} custom={i}>
                    {word}{" "}
                </motion.span>
            ))}
        </motion.h1>
    );
}

export { WordFadeIn };
