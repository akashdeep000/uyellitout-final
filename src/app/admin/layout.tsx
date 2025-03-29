import { AdminSidebar } from "@/components/admin/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { ReactQueryProviders } from "@/providers/react-query";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Admin",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user.role !== "admin") {
        redirect("/login");
    }
    return (
        <ReactQueryProviders>
            <SidebarProvider defaultOpen={true}>
                <AdminSidebar />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </ReactQueryProviders>
    );
}
