import { getCategories } from "@/actions/blog";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CategoryActions } from "./components/category-actions";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <AdminPageWrapper breadcrumb={[{ title: "Blog Categories" }]}>
      <div className="p-2">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Categories</h1>
          <Button asChild>
            <Link href="/admin/blog/categories/new">
              <Plus className="w-4 h-4 mr-2" />
              New Category
            </Link>
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div>
                      <Link
                        href={`/admin/blog/categories/${category.id}/edit`}
                        className="font-medium hover:underline"
                      >
                        {category.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">/{category.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="text-sm text-muted-foreground truncate">
                      {category.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <CategoryActions category={category} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminPageWrapper>
  );
}