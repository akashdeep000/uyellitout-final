import { db } from "@/db";
import { category, post, postToCategory } from "@/db/schema/blog-schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export const revalidate = 3600; // Revalidate every hour

async function getCategoryWithPosts(slug: string, page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const categories = await db
    .select()
    .from(category)
    .where(eq(category.slug, slug))
    .limit(1);

  if (categories.length === 0) {
    return null;
  }

  const categoryId = categories[0].id;

  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      thumbnail: post.thumbnail,
      createdAt: post.createdAt,
      views: post.views,
    })
    .from(post)
    .innerJoin(postToCategory, eq(post.id, postToCategory.postId))
    .where(and(eq(postToCategory.categoryId, categoryId), eq(post.published, true)))
    .orderBy(desc(post.createdAt))
    .limit(limit)
    .offset(offset);

  const totalPosts = await db
    .select({ count: sql<number>`count(*)` })
    .from(post)
    .innerJoin(postToCategory, eq(post.id, postToCategory.postId))
    .where(and(eq(postToCategory.categoryId, categoryId), eq(post.published, true)));

  return {
    category: categories[0],
    posts,
    total: totalPosts[0].count,
    pages: Math.ceil(totalPosts[0].count / limit),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getCategoryWithPosts((await params).slug);

  if (!data) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${data.category.name} - Blog Category`,
    description: data.category.description || `Browse all posts in ${data.category.name} category`,
    openGraph: {
      title: `${data.category.name} - Blog Category`,
      description: data.category.description || `Browse all posts in ${data.category.name} category`,
    },
    twitter: {
      card: "summary",
      title: `${data.category.name} - Blog Category`,
      description: data.category.description || `Browse all posts in ${data.category.name} category`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const currentPage = Number((await searchParams).page) || 1;
  const slug = (await params).slug;
  const data = await getCategoryWithPosts(slug, currentPage);

  if (!data) {
    notFound();
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          {data.category.name}
        </h1>
        {data.category.description && (
          <p className="text-lg text-gray-600">{data.category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.thumbnail && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>
              {post.excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <time dateTime={post.createdAt.toISOString()}>
                  {post.createdAt.toLocaleDateString()}
                </time>
                <span>{post.views} views</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {data.pages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: data.pages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/blog/category/${slug}?page=${page}`}
              className={`px-4 py-2 rounded ${currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}