"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useQuery({
        queryKey: ["session"],
        queryFn: () => authClient.getSession()
    });

    const pathName = usePathname();

    return (
        <>
            <header className={cn("py-4 px-2 md:px-[3%] lg:px-[5%] flex justify-between gap-2 items-center z-[1000]", pathName.split("/")[1] ? "" : "bg-emerald-100")}>
                <Link href="/">
                    <div className="flex gap-2 items-center">
                        <img className="size-8 md:size-9 sm:size-10" src="/logo.svg" alt="" />
                        <svg className="h-[1.1rem] md:h-6" viewBox="0 0 164 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.016 1.2V18H12.248V15.96C11.096 17.512 9.4 18.288 7.16 18.288C5.176 18.288 3.624 17.664 2.504 16.416C1.4 15.152 0.848 13.36 0.848 11.04V1.2H4.736V10.92C4.736 12.264 5.048 13.28 5.672 13.968C6.312 14.64 7.176 14.976 8.264 14.976C9.432 14.976 10.368 14.616 11.072 13.896C11.776 13.16 12.128 12.08 12.128 10.656V1.2H16.016ZM34.9998 1.2V12.744C34.9998 15.272 34.2958 17.208 32.8878 18.552C31.4798 19.912 29.5358 20.592 27.0558 20.592C25.6318 20.592 24.3278 20.392 23.1438 19.992C21.9598 19.608 20.9518 19.056 20.1198 18.336L21.6318 15.456C23.1518 16.688 24.9278 17.304 26.9598 17.304C28.3678 17.304 29.4078 16.952 30.0798 16.248C30.7678 15.528 31.1118 14.424 31.1118 12.936V11.904C29.9918 13.28 28.4078 13.968 26.3598 13.968C24.2318 13.968 22.5918 13.368 21.4398 12.168C20.3038 10.952 19.7358 9.208 19.7358 6.936V1.2H23.6238V6.696C23.6238 8.008 23.9358 9 24.5598 9.672C25.1838 10.344 26.0638 10.68 27.1998 10.68C28.3998 10.68 29.3518 10.328 30.0558 9.624C30.7598 8.92 31.1118 7.856 31.1118 6.432V1.2H34.9998ZM52.5716 16.56C51.7716 17.104 50.7636 17.528 49.5476 17.832C48.3476 18.136 47.0676 18.288 45.7076 18.288C44.0116 18.288 42.5716 18.08 41.3876 17.664C40.2036 17.232 39.3076 16.64 38.6996 15.888C38.0916 15.12 37.7876 14.248 37.7876 13.272C37.7876 12.376 38.0356 11.584 38.5316 10.896C39.0276 10.208 39.7076 9.696 40.5716 9.36C39.9156 9.008 39.4036 8.528 39.0356 7.92C38.6836 7.312 38.5076 6.632 38.5076 5.88C38.5076 4.968 38.7876 4.136 39.3476 3.384C39.9076 2.632 40.7556 2.032 41.8916 1.584C43.0276 1.136 44.4196 0.912 46.0676 0.912C47.1556 0.912 48.2196 1.024 49.2596 1.248C50.2996 1.456 51.2036 1.744 51.9716 2.112L50.8916 5.088C49.4196 4.4 47.8596 4.056 46.2116 4.056C44.9636 4.056 44.0196 4.248 43.3796 4.632C42.7556 5 42.4436 5.504 42.4436 6.144C42.4436 6.736 42.6516 7.192 43.0676 7.512C43.4996 7.816 44.1476 7.968 45.0116 7.968H49.5956V11.04H44.7716C43.7956 11.04 43.0436 11.208 42.5156 11.544C41.9876 11.88 41.7236 12.368 41.7236 13.008C41.7236 13.68 42.0596 14.208 42.7316 14.592C43.4196 14.96 44.4676 15.144 45.8756 15.144C46.8676 15.144 47.8596 15.016 48.8516 14.76C49.8436 14.488 50.6836 14.112 51.3716 13.632L52.5716 16.56ZM54.8514 1.2H58.7394V14.832H67.1634V18H54.8514V1.2ZM69.3358 1.2H73.2238V14.832H81.6478V18H69.3358V1.2ZM89.5801 4.32V14.88H92.4841V18H82.7641V14.88H85.6921V4.32H82.7641V1.2H92.4841V4.32H89.5801ZM107.662 5.904C106.222 5.072 104.678 4.536 103.03 4.296V18H99.1417V4.296C97.4937 4.536 95.9417 5.072 94.4857 5.904L93.1657 3C94.3177 2.312 95.5657 1.792 96.9097 1.44C98.2537 1.088 99.6377 0.912 101.062 0.912C102.502 0.912 103.894 1.088 105.238 1.44C106.598 1.792 107.846 2.312 108.982 3L107.662 5.904ZM118.628 18.288C116.884 18.288 115.308 17.912 113.9 17.16C112.508 16.408 111.412 15.376 110.612 14.064C109.828 12.736 109.436 11.248 109.436 9.6C109.436 7.952 109.828 6.472 110.612 5.16C111.412 3.832 112.508 2.792 113.9 2.04C115.308 1.288 116.884 0.912 118.628 0.912C120.372 0.912 121.94 1.288 123.332 2.04C124.724 2.792 125.82 3.832 126.62 5.16C127.42 6.472 127.82 7.952 127.82 9.6C127.82 11.248 127.42 12.736 126.62 14.064C125.82 15.376 124.724 16.408 123.332 17.16C121.94 17.912 120.372 18.288 118.628 18.288ZM118.628 14.976C119.62 14.976 120.516 14.752 121.316 14.304C122.116 13.84 122.74 13.2 123.188 12.384C123.652 11.568 123.884 10.64 123.884 9.6C123.884 8.56 123.652 7.632 123.188 6.816C122.74 6 122.116 5.368 121.316 4.92C120.516 4.456 119.62 4.224 118.628 4.224C117.636 4.224 116.74 4.456 115.94 4.92C115.14 5.368 114.508 6 114.044 6.816C113.596 7.632 113.372 8.56 113.372 9.6C113.372 10.64 113.596 11.568 114.044 12.384C114.508 13.2 115.14 13.84 115.94 14.304C116.74 14.752 117.636 14.976 118.628 14.976ZM145.766 1.2V18H141.998V15.96C140.846 17.512 139.15 18.288 136.91 18.288C134.926 18.288 133.374 17.664 132.254 16.416C131.15 15.152 130.598 13.36 130.598 11.04V1.2H134.486V10.92C134.486 12.264 134.798 13.28 135.422 13.968C136.062 14.64 136.926 14.976 138.014 14.976C139.182 14.976 140.118 14.616 140.822 13.896C141.526 13.16 141.878 12.08 141.878 10.656V1.2H145.766ZM161.99 5.904C160.55 5.072 159.006 4.536 157.358 4.296V18H153.47V4.296C151.822 4.536 150.27 5.072 148.814 5.904L147.494 3C148.646 2.312 149.894 1.792 151.238 1.44C152.582 1.088 153.966 0.912 155.39 0.912C156.83 0.912 158.222 1.088 159.566 1.44C160.926 1.792 162.174 2.312 163.31 3L161.99 5.904Z" fill="#333333" />
                        </svg>
                    </div>
                </Link>
                <nav className="hidden lg:flex gap-3 font-semibold">
                    <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/">Home</Link></ul>
                    <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/about-us">About Us</Link></ul>
                    <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/services">Services</Link></ul>
                    <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/dashboard/quiz">Quiz</Link></ul>
                    {/* <ul className="hover:text-foreground  transition-all hover:underline"><Link href="#">Blogs</Link></ul> */}
                    <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/#faqs">FAQs</Link></ul>
                    <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/contact">Get in Touch</Link></ul>
                </nav>
                <div className="flex gap-2 items-center">
                    {
                        session?.data?.user ?
                            <Link href="/dashboard">
                                <Button className="px-3 py-1.5 md:text-md bg-emerald-500 border-foreground font-semibold rounded-3xl">Go to Dashboard</Button>
                            </Link>
                            :
                            <>
                                <Link href="/login">
                                    <Button variant=
                                        "outline" className="px-3 py-1.5 md:text-md bg-inherit border-foreground font-semibold rounded-3xl">Login</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="px-3 py-1.5 md:text-md bg-emerald-500 border-foreground font-semibold rounded-3xl">Sign up</Button>
                                </Link>
                            </>
                    }
                    <Sheet>
                        <SheetTrigger>
                            <svg className="h-7 lg:hidden" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle></SheetTitle>
                                <SheetDescription></SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-3 font-semibold">
                                <ul className="hover:text-foreground  transition-all hover:underline"><Link href="#">Home</Link></ul>
                                <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/about-us">About Us</Link></ul>
                                <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/services">Services</Link></ul>
                                <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/dashboard/quiz">Quiz</Link></ul>
                                {/* <ul className="hover:text-foreground  transition-all hover:underline"><Link href="#">Blogs</Link></ul> */}
                                <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/#faqs">FAQs</Link></ul>
                                <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/contact">Get in Touch</Link></ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
            {children}
            <footer className={cn("px-4 pt-12 pb-6", pathName.split("/")[1] ? "bg-neutral-200" : "bg-emerald-200")}>
                <div className="flex justify-between gap-12">
                    <div className="space-y-2">
                        <svg className="h-5 mt-1" viewBox="0 0 164 21" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.016 1.2V18H12.248V15.96C11.096 17.512 9.4 18.288 7.16 18.288C5.176 18.288 3.624 17.664 2.504 16.416C1.4 15.152 0.848 13.36 0.848 11.04V1.2H4.736V10.92C4.736 12.264 5.048 13.28 5.672 13.968C6.312 14.64 7.176 14.976 8.264 14.976C9.432 14.976 10.368 14.616 11.072 13.896C11.776 13.16 12.128 12.08 12.128 10.656V1.2H16.016ZM34.9998 1.2V12.744C34.9998 15.272 34.2958 17.208 32.8878 18.552C31.4798 19.912 29.5358 20.592 27.0558 20.592C25.6318 20.592 24.3278 20.392 23.1438 19.992C21.9598 19.608 20.9518 19.056 20.1198 18.336L21.6318 15.456C23.1518 16.688 24.9278 17.304 26.9598 17.304C28.3678 17.304 29.4078 16.952 30.0798 16.248C30.7678 15.528 31.1118 14.424 31.1118 12.936V11.904C29.9918 13.28 28.4078 13.968 26.3598 13.968C24.2318 13.968 22.5918 13.368 21.4398 12.168C20.3038 10.952 19.7358 9.208 19.7358 6.936V1.2H23.6238V6.696C23.6238 8.008 23.9358 9 24.5598 9.672C25.1838 10.344 26.0638 10.68 27.1998 10.68C28.3998 10.68 29.3518 10.328 30.0558 9.624C30.7598 8.92 31.1118 7.856 31.1118 6.432V1.2H34.9998ZM52.5716 16.56C51.7716 17.104 50.7636 17.528 49.5476 17.832C48.3476 18.136 47.0676 18.288 45.7076 18.288C44.0116 18.288 42.5716 18.08 41.3876 17.664C40.2036 17.232 39.3076 16.64 38.6996 15.888C38.0916 15.12 37.7876 14.248 37.7876 13.272C37.7876 12.376 38.0356 11.584 38.5316 10.896C39.0276 10.208 39.7076 9.696 40.5716 9.36C39.9156 9.008 39.4036 8.528 39.0356 7.92C38.6836 7.312 38.5076 6.632 38.5076 5.88C38.5076 4.968 38.7876 4.136 39.3476 3.384C39.9076 2.632 40.7556 2.032 41.8916 1.584C43.0276 1.136 44.4196 0.912 46.0676 0.912C47.1556 0.912 48.2196 1.024 49.2596 1.248C50.2996 1.456 51.2036 1.744 51.9716 2.112L50.8916 5.088C49.4196 4.4 47.8596 4.056 46.2116 4.056C44.9636 4.056 44.0196 4.248 43.3796 4.632C42.7556 5 42.4436 5.504 42.4436 6.144C42.4436 6.736 42.6516 7.192 43.0676 7.512C43.4996 7.816 44.1476 7.968 45.0116 7.968H49.5956V11.04H44.7716C43.7956 11.04 43.0436 11.208 42.5156 11.544C41.9876 11.88 41.7236 12.368 41.7236 13.008C41.7236 13.68 42.0596 14.208 42.7316 14.592C43.4196 14.96 44.4676 15.144 45.8756 15.144C46.8676 15.144 47.8596 15.016 48.8516 14.76C49.8436 14.488 50.6836 14.112 51.3716 13.632L52.5716 16.56ZM54.8514 1.2H58.7394V14.832H67.1634V18H54.8514V1.2ZM69.3358 1.2H73.2238V14.832H81.6478V18H69.3358V1.2ZM89.5801 4.32V14.88H92.4841V18H82.7641V14.88H85.6921V4.32H82.7641V1.2H92.4841V4.32H89.5801ZM107.662 5.904C106.222 5.072 104.678 4.536 103.03 4.296V18H99.1417V4.296C97.4937 4.536 95.9417 5.072 94.4857 5.904L93.1657 3C94.3177 2.312 95.5657 1.792 96.9097 1.44C98.2537 1.088 99.6377 0.912 101.062 0.912C102.502 0.912 103.894 1.088 105.238 1.44C106.598 1.792 107.846 2.312 108.982 3L107.662 5.904ZM118.628 18.288C116.884 18.288 115.308 17.912 113.9 17.16C112.508 16.408 111.412 15.376 110.612 14.064C109.828 12.736 109.436 11.248 109.436 9.6C109.436 7.952 109.828 6.472 110.612 5.16C111.412 3.832 112.508 2.792 113.9 2.04C115.308 1.288 116.884 0.912 118.628 0.912C120.372 0.912 121.94 1.288 123.332 2.04C124.724 2.792 125.82 3.832 126.62 5.16C127.42 6.472 127.82 7.952 127.82 9.6C127.82 11.248 127.42 12.736 126.62 14.064C125.82 15.376 124.724 16.408 123.332 17.16C121.94 17.912 120.372 18.288 118.628 18.288ZM118.628 14.976C119.62 14.976 120.516 14.752 121.316 14.304C122.116 13.84 122.74 13.2 123.188 12.384C123.652 11.568 123.884 10.64 123.884 9.6C123.884 8.56 123.652 7.632 123.188 6.816C122.74 6 122.116 5.368 121.316 4.92C120.516 4.456 119.62 4.224 118.628 4.224C117.636 4.224 116.74 4.456 115.94 4.92C115.14 5.368 114.508 6 114.044 6.816C113.596 7.632 113.372 8.56 113.372 9.6C113.372 10.64 113.596 11.568 114.044 12.384C114.508 13.2 115.14 13.84 115.94 14.304C116.74 14.752 117.636 14.976 118.628 14.976ZM145.766 1.2V18H141.998V15.96C140.846 17.512 139.15 18.288 136.91 18.288C134.926 18.288 133.374 17.664 132.254 16.416C131.15 15.152 130.598 13.36 130.598 11.04V1.2H134.486V10.92C134.486 12.264 134.798 13.28 135.422 13.968C136.062 14.64 136.926 14.976 138.014 14.976C139.182 14.976 140.118 14.616 140.822 13.896C141.526 13.16 141.878 12.08 141.878 10.656V1.2H145.766ZM161.99 5.904C160.55 5.072 159.006 4.536 157.358 4.296V18H153.47V4.296C151.822 4.536 150.27 5.072 148.814 5.904L147.494 3C148.646 2.312 149.894 1.792 151.238 1.44C152.582 1.088 153.966 0.912 155.39 0.912C156.83 0.912 158.222 1.088 159.566 1.44C160.926 1.792 162.174 2.312 163.31 3L161.99 5.904Z" fill="#333333" />
                        </svg>
                        <p className="max-w-lg text-sm text-gray-700">Our services do not provide crisis intervention or emergency mental health support. If you&apos;re in crisis, please seek in-person help from a licensed professional or a crisis helpline.</p>
                    </div>
                    <div>
                        <nav className="flex justify-end gap-4 max-w-prose font-semibold flex-wrap">
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/">Home</Link></ul>
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/about-us">About Us</Link></ul>
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/services">Services</Link></ul>
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/dashboard/quiz">Quiz</Link></ul>
                            {/* <ul className="hover:text-foreground  transition-all hover:underline"><Link href="#">Blogs</Link></ul> */}
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/#faqs">FAQs</Link></ul>
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/contact">Get in Touch</Link></ul>
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/privacy-policy">Privacy-Policy</Link></ul>
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/terms-conditions">Terms-Conditions</Link></ul>
                            <ul className="hover:text-foreground  transition-all hover:underline"><Link href="/refund-policy">Refund-Policy</Link></ul>
                        </nav>
                    </div>
                </div>
                <footer className="text-center text-md mt-8">
                    <p>© 2024 Uyellitout. All rights reserved.</p>
                </footer>
            </footer>
        </>
    );
}
