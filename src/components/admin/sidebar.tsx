import { CalendarCheck, CalendarCog, Home, Library, MessageCircle, Settings, Users } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: Users,
    },
    {
        title: "Bookings",
        url: "/admin/bookings",
        icon: CalendarCheck,
    },
    {
        title: "Shedule",
        url: "/admin/shedule",
        icon: CalendarCog,
    },
    {
        title: "Quizzes",
        url: "/admin/quizzes",
        icon: Library,
    },
    {
        title: "Messeges",
        url: "/admin/messages",
        icon: MessageCircle,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="select-none">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-bold py-7">uyellitout <span className="ml-2 text-sm px-2 py-0.5 rounded-lg border bg-background">admin</span></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
