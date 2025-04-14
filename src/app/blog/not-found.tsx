import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the blog post you're looking for.
      </p>
      <Link
        href="/blog"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Blog
      </Link>
    </div>
  );
}