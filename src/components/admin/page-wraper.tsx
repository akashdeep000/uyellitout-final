"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { MaxWidthWrapper } from "./max-with-wraper";

interface AdminPageWrapperProps {
    className?: string;
    children: ReactNode;
    breadcrumb?: {
        title: string,
        href?: string
    }[]
}

export function AdminPageWrapper({ className, breadcrumb, children }: AdminPageWrapperProps) {
    const { isMobile, open } = useSidebar();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="w-full flex flex-col h-svh">
            <header className="bg-background flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem key="default">
                                <BreadcrumbLink href="/admin">
                                    Admin
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {
                                breadcrumb && (
                                    <BreadcrumbSeparator key="init-seperator" />
                                )
                            }
                            {
                                breadcrumb?.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        {
                                            item.href ? (
                                                <>
                                                    <BreadcrumbLink href={item.href}>
                                                        {item.title}
                                                    </BreadcrumbLink>
                                                </>
                                            ) : (
                                                <BreadcrumbPage>
                                                    {item.title}
                                                </BreadcrumbPage>
                                            )
                                        }
                                        {
                                            index !== breadcrumb.length - 1 && (
                                                <BreadcrumbSeparator />
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Button onClick={() => setLogoutDialogOpen(true)} className="rounded-full" variant="outline"><LogOut /> Log out</Button>
                <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <p>You will be logged out. Do you want to proceed?</p>
                        <DialogFooter className="gap-2">
                            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={() => {
                                authClient.signOut();
                                setLogoutDialogOpen(false);
                                router.push("/login");
                            }}>Log out</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>
            <ScrollArea className="grow">
                <main>
                    <MaxWidthWrapper className={cn(isMobile === undefined ? "w-full" : isMobile ? "w-screen" : open ? "w-[calc(100svw_-_16rem)]" : "w-[calc(100vw_-_3rem)]", className)}>
                        {children}
                    </MaxWidthWrapper>
                </main>
            </ScrollArea>
        </div>
    );
}
