"use client";

import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { PostsTable } from "./components/posts-table";

export default function AdminBlogPostsPage() {
  return (
    <AdminPageWrapper breadcrumb={[{ title: "Blog Posts" }]}>
      <div className="p-2">
        <PostsTable />
      </div>
    </AdminPageWrapper>
  );
}

// function PostRow({ post }: { post: PostWithCategories }) {
//   const categories = post.categories?.map((c) => c.category);

//   return (
//     <TableRow>
//       <TableCell>
//         <div>
//           <Link
//             href={`/admin/blog/posts/${post.id}`}
//             className="font-medium hover:underline"
//           >
//             {post.title}
//           </Link>
//           {post.featured && (
//             <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
//               Featured
//             </span>
//           )}
//         </div>
//         <div className="text-sm text-muted-foreground">{post.slug}</div>
//       </TableCell>
//       <TableCell>
//         <span
//           className={cn(
//             "inline-block px-2 py-0.5 text-xs rounded",
//             post.published
//               ? "bg-green-100 text-green-800"
//               : "bg-gray-100 text-gray-800"
//           )}
//         >
//           {post.published ? "Published" : "Draft"}
//         </span>
//       </TableCell>
//       <TableCell>
//         <div className="flex flex-wrap gap-1">
//           {categories?.map((category) => (
//             <span
//               key={category.id}
//               className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded"
//             >
//               {category.name}
//             </span>
//           ))}
//         </div>
//       </TableCell>
//       <TableCell>
//         {new Date(post.createdAt).toLocaleDateString()}
//       </TableCell>
//       <TableCell>
//         <div className="flex items-center gap-2">
//           <PostActions post={post} />
//         </div>
//       </TableCell>
//     </TableRow>
//   );
// }

// interface PostWithCategories {
//   id: string;
//   title: string;
//   slug: string;
//   published: boolean;
//   featured: boolean;
//   createdAt: Date;
//   categories: Array<{
//     category: {
//       id: string;
//       name: string;
//     };
//   }>;
// }