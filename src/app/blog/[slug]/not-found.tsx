import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Back to Blog
      </Link>
    </div>
  );
}