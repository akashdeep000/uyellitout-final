import { getResources } from "@/actions/resource";
import AdminResourcesClient from "@/components/admin/AdminResourcesClient";
import { AdminPageWrapper } from "@/components/admin/page-wraper";

export default async function AdminResourcesPage() {
  const { data: resources, error } = await getResources();

  if (error) {
    return <div>Error loading resources: {error}</div>;
  }

  return (
    <AdminPageWrapper className="space-y-6" breadcrumb={[{ title: "Free Resources" }]}>
      <AdminResourcesClient initialResources={resources || []} />
    </AdminPageWrapper>
  );
}
