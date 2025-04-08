"use client";

import { getPost } from "@/actions/blog";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { PostForm } from "../components/post-form";

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = use(params);
  const { data: post, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  if (isLoading || !post) return null;

  return (
    <AdminPageWrapper
      breadcrumb={[
        { title: "Blog Posts", href: "/admin/blog/posts" },
        { title: "Edit Post" },
      ]}
    >
      <div className="p-2">
        <PostForm post={post} />
      </div>
    </AdminPageWrapper>
  );
}