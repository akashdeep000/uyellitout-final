import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { CategoryForm } from "../components/category-form";

export default async function NewCategoryPage() {
  return (
    <AdminPageWrapper
      breadcrumb={[
        { title: "Blog Categories", href: "/admin/blog/categories" },
        { title: "New Category" },
      ]}
    >
      <div className="max-w-2xl p-2">
        <CategoryForm />
      </div>
    </AdminPageWrapper>
  );
}