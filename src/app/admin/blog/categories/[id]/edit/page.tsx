import { getCategory } from "@/actions/blog";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { notFound } from "next/navigation";
import { CategoryForm } from "../../components/category-form";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {

  const category = await getCategory((await params).id);

  if (!category) {
    notFound();
  }

  return (
    <AdminPageWrapper
      breadcrumb={[
        { title: "Blog Categories", href: "/admin/blog/categories" },
        { title: "Edit Category" },
      ]}
    >
      <div className="max-w-2xl p-2">
        <CategoryForm category={category} />
      </div>
    </AdminPageWrapper>
  );
}