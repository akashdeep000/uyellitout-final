import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { FormSubmissionsList } from "@/components/admin/messages/form-submissions-list";

export default function MessagesPage() {
    return (
        <AdminPageWrapper>
            <h1 className="text-2xl font-bold mb-4">Form Submissions</h1>
            <FormSubmissionsList />
        </AdminPageWrapper>
    );
}