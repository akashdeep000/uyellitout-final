"use client";

import { getPosts } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PostActions } from "./post-actions";

export function PostsTable() {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  });

  if (!posts) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/blog/posts/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-center">Views</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function PostRow({ post }: { post: PostWithCategories }) {
  const categories = post.categories?.map((c) => c.category);

  return (
    <TableRow>
      <TableCell>
        <div>
          <Link
            href={`/admin/blog/posts/${post.id}`}
            className="font-medium hover:underline"
          >
            {post.title}
          </Link>
          {post.featured && (
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>
        <div className="text-sm text-muted-foreground">{post.slug}</div>
      </TableCell>
      <TableCell>
        <span
          className={cn(
            "inline-block px-2 py-0.5 text-xs rounded",
            post.published
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          )}
        >
          {post.published ? "Published" : "Draft"}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {categories?.map((category) => (
            <span
              key={category.id}
              className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded"
            >
              {category.name}
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell>
        {new Date(post.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-center">
        {post.views}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <PostActions post={post} />
        </div>
      </TableCell>
    </TableRow>
  );
}

interface PostWithCategories {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  views: number;
  categories: Array<{
    category: {
      id: string;
      name: string;
    };
  }>;
}