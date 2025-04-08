"use client";

import { createPost, getCategories, updatePost } from "@/actions/blog";
import { checkSlugAvailability } from "@/actions/slug";
import { LoadingPostForm } from "@/components/admin/blog/loading-post-form";
import { MinimalTiptapEditor } from "@/components/tiptap/minimal-tiptap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { Category, Post } from "@/db/schema/blog-schema";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.string().optional(),
  categoryIds: z.array(z.string()).min(1, "At least one category is required"),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Post & {
    categories: Array<{
      category: Category;
    }>;
  };
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [slugAvailable, setSlugAvailable] = useState(true);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const slugCheckMutation = useMutation({
    mutationFn: async (slug: string) => {
      return await checkSlugAvailability(slug, post?.id);
    },
    onSuccess: (available) => {
      setSlugAvailable(available);
    },
  });

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      thumbnail: post?.thumbnail || "",
      categoryIds: post?.categories?.map(c => c.category.id) || [],
    }
  });

  // const title = useWatch({ control: form.control, name: "title" });
  // const debouncedTitle = useDebounce(title, 500);
  const slug = useWatch({ control: form.control, name: "slug" });
  const debouncedSlug = useDebounce(slug, 500);

  useEffect(() => {
    if (debouncedSlug) {
      slugCheckMutation.mutate(debouncedSlug);
    }
  }, [debouncedSlug]);


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: PostFormValues) => {
      if (post) {
        return await updatePost(post.id, values);
      } else {
        return await createPost(values);
      }
    },
    onSuccess: () => {
      toast({
        title: post ? "Post Updated" : "Post Created",
        description: "Your post has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (post) {
        queryClient.invalidateQueries({ queryKey: ["posts", post.slug] });
      }
      router.push("/admin/blog/posts");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem saving your post.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: PostFormValues) => {
    mutation.mutate(values);
  };

  if (categoriesLoading) {
    return <LoadingPostForm />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? "Edit Post" : "New Post"}</CardTitle>
        <CardDescription>
          Create or update a blog post. All posts are created as drafts initially.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} className={slugAvailable ? "" : "border-red-500"} />
                        {slugCheckMutation.isPending && (
                          <div className="absolute right-3 top-2.5">
                            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    {!slugAvailable && (
                      <p className="text-sm font-medium text-red-500">
                        This slug is already taken
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categories?.map(value => ({
                        label: value.name,
                        value: value.id
                      })) || post?.categories?.map(c => ({
                        label: c.category.name,
                        value: c.category.id
                      })) || []}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MinimalTiptapEditor
                      output="html"
                      value={field.value}
                      onChange={field.onChange}
                      editorClassName="p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/blog/posts")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending || !slugAvailable}>
                {mutation.isPending ? (
                  <><span className="mr-2">Saving...</span>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg></>
                ) : (
                  post ? "Update Post" : "Create Post"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}