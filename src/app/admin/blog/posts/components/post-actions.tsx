"use client";

import { deletePost, togglePostStatus } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, MoreHorizontal, Pencil, Star, StarOff, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostActionsProps {
  post: {
    id: string;
    published: boolean;
    featured: boolean;
  };
}

export function PostActions({ post }: PostActionsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const publishMutation = useMutation({
    mutationFn: () => togglePostStatus(post.id, "published"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", post.id] });
    }
  });

  const featureMutation = useMutation({
    mutationFn: () => togglePostStatus(post.id, "featured"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", post.id] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.refresh();
      router.push("/admin/blog/posts");
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/admin/blog/posts/${post.id}/edit`)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => publishMutation.mutate()}>
          {post.published ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Unpublish
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Publish
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => featureMutation.mutate()}>
          {post.featured ? (
            <>
              <StarOff className="mr-2 h-4 w-4" />
              Unfeature
            </>
          ) : (
            <>
              <Star className="mr-2 h-4 w-4" />
              Feature
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => deleteMutation.mutate()}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}