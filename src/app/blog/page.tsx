import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { db } from "@/db";
import { category as categoryTable, post, postToCategory } from "@/db/schema/blog-schema";
import { and, count, desc, eq, like, or, SQL } from "drizzle-orm";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 10;

function getPostWhereClause(category: string, search?: string) {
  const conditions = [eq(post.published, true)];

  if (search) {
    conditions.push(or(
      like(post.title, `%${search}%`),
      like(post.excerpt, `%${search}%`)
    ) as SQL<unknown>);
  }

  if (category === "featured") {
    conditions.push(eq(post.featured, true));
  } else if (category && category !== "trending" && category !== "latest") {
    conditions.push(eq(categoryTable.slug, category));
  }

  return and(...conditions);
}

async function getLatestPosts(category = "latest", search: string | undefined, page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      thumbnail: post.thumbnail,
      createdAt: post.createdAt,
      views: post.views,
      categoryId: categoryTable.id,
      categoryName: categoryTable.name,
      categorySlug: categoryTable.slug,
    })
    .from(post)
    .leftJoin(postToCategory, eq(post.id, postToCategory.postId))
    .leftJoin(categoryTable, eq(postToCategory.categoryId, categoryTable.id))
    .where(getPostWhereClause(category, search))
    .orderBy(category === "latest" ? desc(post.createdAt) : desc(post.views))
    .limit(limit)
    .offset(offset);

  const totalPosts = await db
    .select({ count: count() })
    .from(post)
    .leftJoin(postToCategory, eq(post.id, postToCategory.postId))
    .leftJoin(categoryTable, eq(postToCategory.categoryId, categoryTable.id))
    .where(getPostWhereClause(category, search));

  const categories = await db.query.category.findMany();

  return {
    categories,
    posts,
    total: totalPosts[0].count,
    pages: Math.ceil(totalPosts[0].count / limit),
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string, category?: string, search?: string }>;
}) {
  const category = (await searchParams).category || "latest";
  const currentPage = Number((await searchParams).page) || 1;
  const search = (await searchParams).search;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categories, posts, total, pages } = await getLatestPosts(category, search, currentPage);

  return (
    <div>
      <div className="px-4 pt-8 pb-4 bg-blue-100 grid gap-4">
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Expert&apos;s <span className="text-4xl">Column</span>
          </h1>
          <div className="bg-blue-200 rounded-full size-32"></div>
        </div>
        <div className="grid place-items-center">
          <form method="GET" action="/blog" className="relative w-full max-w-4xl">
            <input
              type="search"
              name="search"
              defaultValue={search || ""}
              className="w-full p-2 pr-8 rounded-lg border focus:border-slate-500 outline-none"
              placeholder="Search posts..."
            />
            <button type="submit">
              <Search className="absolute top-2 right-2 stroke-gray-700" />
            </button>
          </form>
        </div>
        <div className="flex gap-6 justify-center">
          <Link
            href="/blog?category=latest"
            className={`font-semibold hover:text-blue-500 hover:underline ${!search && (!category || category === "latest") ? "text-blue-600 underline" : ""
              }`}
          >
            Latest
          </Link>
          <Link
            href="/blog?category=trending"
            className={`font-semibold hover:text-blue-500 hover:underline ${!search && category === "trending" ? "text-blue-600 underline" : ""
              }`}
          >
            Trending
          </Link>
          <Link
            href="/blog?category=featured"
            className={`font-semibold hover:text-blue-500 hover:underline ${!search && category === "featured" ? "text-blue-600 underline" : ""
              }`}
          >
            Featured
          </Link>

          {categories && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className={`font-semibold hover:text-blue-500 hover:underline cursor-pointer ${!search &&
                    category &&
                    category !== "trending" &&
                    category !== "latest" &&
                    category !== "featured"
                    ? "text-blue-600 underline"
                    : ""
                    }`}
                >
                  Others
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/blog?category=${cat.slug}`}>
                    <DropdownMenuItem
                      className={
                        !search && category === cat.slug
                          ? "text-blue-600 font-semibold"
                          : ""
                      }
                    >
                      {cat.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 && (
          <div className="text-center text-gray-500">
            No posts found
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-video bg-neutral-100 w-full">
                  {post.thumbnail && (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>
              <div className="p-4 flex-1">
                <Link className="h-full flex flex-col justify-between" href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={new Date(post.createdAt).toISOString()}>
                      {new Date(post.createdAt).toLocaleDateString("en-IN")}
                    </time>
                    <span>{post.views} views</span>
                  </div>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/blog?page=${page}${category ? `&category=${category}` : ""}${search ? `&search=${search}` : ""}`}
                className={`px-4 py-2 rounded ${currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
