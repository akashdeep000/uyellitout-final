"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BlogHeader() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center px-2 text-gray-900 hover:text-gray-600"
            >
              <span className="text-xl font-semibold">Your Site Name</span>
            </Link>
          </div>

          <div className="flex space-x-8">
            <Link
              href="/blog"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === "/blog"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              All Posts
            </Link>
            {/* Add more navigation items as needed */}
          </div>
        </div>
      </div>
    </nav>
  );
}