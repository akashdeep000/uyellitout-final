import { AdminPageWrapper } from "@/components/admin/page-wraper";

interface Artwork {
    artist: string
    art: string
}

const works: Artwork[] = [
    {
        artist: "Ornella Binni",
        art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    },
    {
        artist: "Tom Byrom",
        art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    },
];

export default function Page() {
    return (
        <AdminPageWrapper className="space-y-2">
            <div className="aspect-video w-full bg-muted/50 rounded"></div>
            <div className="aspect-video w-full bg-muted/50 rounded"></div>
            <div className="aspect-video w-full bg-muted/50 rounded"></div>
            <div className="aspect-video w-full bg-muted/50 rounded"></div>
        </AdminPageWrapper>
    );
}
