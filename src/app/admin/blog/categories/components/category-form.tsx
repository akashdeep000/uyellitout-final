"use client";

import { createCategory, updateCategory } from "@/actions/blog";
import { checkCategorySlugAvailability } from "@/actions/category-slug";
import { LoadingCategoryForm } from "@/components/admin/blog/loading-category-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/db/schema/blog-schema";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [slugAvailable, setSlugAvailable] = useState(true);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
    }
  });

  const slugCheckMutation = useMutation({
    mutationFn: async (slug: string) => {
      return await checkCategorySlugAvailability(slug, category?.id);
    },
    onSuccess: (available) => {
      setSlugAvailable(available);
    },
  });

  // const name = useWatch({ control: form.control, name: "name" });
  // const debouncedName = useDebounce(name, 500);
  const slug = useWatch({ control: form.control, name: "slug" });
  const debouncedSlug = useDebounce(slug, 500);

  // useEffect(() => {
  //   if (debouncedName && !slug) {
  //     const generatedSlug = debouncedName
  //       .toLowerCase()
  //       .replace(/[^a-z0-9]+/g, "-")
  //       .replace(/(^-|-$)/g, "");
  //     form.setValue("slug", generatedSlug);
  //   }
  // }, [debouncedName, slug, form]);

  useEffect(() => {
    if (debouncedSlug) {
      slugCheckMutation.mutate(debouncedSlug);
    }
  }, [debouncedSlug]);

  const mutation = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      console.log(values);

      if (category) {
        await updateCategory(category.id, values);
      } else {
        await createCategory(values);
      }
    },
    onSuccess: () => {
      toast({
        title: category ? "Category Updated" : "Category Created",
        description: "Your category has been saved successfully.",
      });
      router.push("/admin/blog/categories");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem saving your category.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: CategoryFormValues) => {
    mutation.mutate(values);
  };

  if (mutation.isPending) {
    return <LoadingCategoryForm />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category ? "Edit Category" : "New Category"}</CardTitle>
        <CardDescription>
          Create or update a category to organize your blog posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/blog/categories")}
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
                  category ? "Update Category" : "Create Category"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}