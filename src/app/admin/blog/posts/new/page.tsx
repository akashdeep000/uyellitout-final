"use client";

import { getCategories } from "@/actions/blog";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { useQuery } from "@tanstack/react-query";
import { PostForm } from "../components/post-form";

export default function NewPostPage() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  });

  if (isLoading || !categories) return null;

  return (
    <AdminPageWrapper
      breadcrumb={[
        { title: "Blog Posts", href: "/admin/blog/posts" },
        { title: "New Post" },
      ]}
    >
      <div className="p-2">
        <PostForm />
      </div>
    </AdminPageWrapper>
  );
}