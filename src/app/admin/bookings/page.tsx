import { AdminPageWrapper } from "@/components/admin/page-wraper";

export default function Page() {
    return (
        <AdminPageWrapper className="space-y-2" breadcrumb={[{ title: "Bookings" }]}>
            <div></div>
        </AdminPageWrapper>
    );
}
