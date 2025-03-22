import { FormSubmissionsList } from "@/components/admin/messages/form-submissions-list";
import { AdminPageWrapper } from "@/components/admin/page-wraper";

export default function MessagesPage() {
    return (
        <AdminPageWrapper breadcrumb={[{
            title: "Messages"
        }]}>
            <h1 className="text-lg font-bold mb-4">Form Submissions</h1>
            <FormSubmissionsList />
        </AdminPageWrapper>
    );
}