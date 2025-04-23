import { db } from "@/db";
import { category, post, postToCategory } from "@/db/schema/blog-schema";
import { and, asc, desc, eq, gt, lt, ne, or } from "drizzle-orm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IncrementCount } from "./increment-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 10;

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

async function getPost(slug: string) {
  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      thumbnail: post.thumbnail,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      views: post.views,
    })
    .from(post)
    .where(and(eq(post.slug, slug), eq(post.published, true)))
    .limit(1);

  if (posts.length === 0) return null;

  const currentPost = posts[0];

  // await db
  //   .update(post)
  //   .set({ views: currentPost.views + 1 })
  //   .where(eq(post.id, currentPost.id));

  const categories = await db
    .select({
      id: category.id,
      name: category.name,
      slug: category.slug,
    })
    .from(category)
    .innerJoin(postToCategory, eq(category.id, postToCategory.categoryId))
    .where(eq(postToCategory.postId, currentPost.id));

  const related = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      createdAt: post.createdAt,
    })
    .from(post)
    .leftJoin(postToCategory, eq(post.id, postToCategory.postId))
    .where(
      and(
        eq(post.published, true),
        ne(post.id, currentPost.id),
        or(...categories.map((c) => eq(postToCategory.categoryId, c.id)))
      )
    )
    .limit(3);

  const [next] = await db
    .select({ slug: post.slug, title: post.title })
    .from(post)
    .where(gt(post.createdAt, currentPost.createdAt))
    .orderBy(asc(post.createdAt))
    .limit(1);

  const [prev] = await db
    .select({ slug: post.slug, title: post.title })
    .from(post)
    .where(lt(post.createdAt, currentPost.createdAt))
    .orderBy(desc(post.createdAt))
    .limit(1);

  return {
    ...currentPost,
    categories,
    related,
    next,
    prev,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.thumbnail ? [post.thumbnail] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content.slice(0, 160),
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

import { getResources } from "@/actions/resource";

export default async function BlogPost({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const readingTime = estimateReadingTime(post.content);
  const { data: resources, error: resourcesError } = await getResources();


  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <IncrementCount id={post.id} />
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <time dateTime={post.createdAt.toISOString()}>
            {post.createdAt.toLocaleDateString("en-IN")}
          </time>
          <span>•</span>
          <span>{post.views} views</span>
          <span>•</span>
          <span>{readingTime} min read</span>
          {post.categories?.length > 0 && (
            <>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span key={category.id} className="text-blue-600 font-medium">
                    {category.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {post.thumbnail && (
        <div className="w-full aspect-video relative mb-10 rounded-lg overflow-hidden bg-neutral-100">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover object-center rounded-lg"
            sizes="(max-width: 768px) 100vw, 700px"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none prose-img:mx-auto prose-img:rounded-lg prose-img:max-w-full prose-img:object-contain"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Free Resources Section */}

      {resources && resources.length > 0 && (
        <section className="mt-16">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Free Resources</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {resources?.map((resource) => (
            <Link key={resource.id} href={resource.filePath} className="h-full">
              <div className="p-4 border rounded hover:shadow-sm transition h-full">
                <h4 className="font-semibold text-lg mb-1">{resource.title}</h4>
                <p className="text-sm text-gray-500">{resource.description}</p>
                <time className="text-sm text-gray-500">
                  {resource.createdAt.toLocaleDateString("en-IN")}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </section>
      )}



      {/* Related posts */}
      {post.related?.length > 0 && (
        <section className="mt-16">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Related Posts</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {post.related.map((rel) => (
              <Link key={rel.id} href={`/blog/${rel.slug}`}>
                <div className="p-4 border rounded hover:shadow-sm transition">
                  <h4 className="font-semibold text-lg mb-1">{rel.title}</h4>
                  <time className="text-sm text-gray-500">
                    {rel.createdAt.toLocaleDateString("en-IN")}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <div className="mt-16 flex justify-between items-center border-t pt-6 text-sm text-blue-600">
        {post.prev ? (
          <Link href={`/blog/${post.prev.slug}`} className="hover:underline">
            ← {post.prev.title}
          </Link>
        ) : <span />}
        {post.next ? (
          <Link href={`/blog/${post.next.slug}`} className="hover:underline">
            {post.next.title} →
          </Link>
        ) : <span />}
      </div>

      {/* Back to blog */}
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-block px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
