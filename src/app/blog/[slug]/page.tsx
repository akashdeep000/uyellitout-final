import { db } from "@/db";
import { category, post, postToCategory } from "@/db/schema/blog-schema";
import { and, asc, desc, eq, gt, lt, ne, or } from "drizzle-orm";
import type { Metadata } from "next";
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
				or(...categories.map((c) => eq(postToCategory.categoryId, c.id))),
			),
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
		<>
			<div className="p-4">
				<Link href="/">
					<svg
						className="h-10 w-auto sm:h-11 md:h-12"
						xmlns="http://www.w3.org/2000/svg"
						version="1"
						viewBox="0 0 386.88 126.75"
					>
						<defs>
							<clipPath id="d1b505d19b">
								<path d="M10 10h102v116H10Zm0 0"></path>
							</clipPath>
							<clipPath id="8408ee9d4d">
								<path d="M10.402 9.867 110.7 9.25l.723 116.766-100.3.62Zm0 0"></path>
							</clipPath>
							<clipPath id="4ab129bcbc">
								<path d="m110.84 9.25-100.297.617.719 116.77 100.3-.621Zm0 0"></path>
							</clipPath>
							<clipPath id="73ecd2e1c4">
								<path d="m110.84 9.25-100.297.617.719 116.77 100.3-.621Zm0 0"></path>
							</clipPath>
							<clipPath id="4f70ddfd58">
								<path d="M6 10h80v98H6Zm0 0"></path>
							</clipPath>
							<clipPath id="7eaae3712b">
								<path d="M-15.48 71.766 36.94-3.008l70.485 49.418-52.422 74.774Zm0 0"></path>
							</clipPath>
							<clipPath id="1b9673daf2">
								<path d="M-15.48 71.766 36.94-3.008l70.485 49.418-52.422 74.774Zm0 0"></path>
							</clipPath>
							<clipPath id="987de8b99b">
								<path d="M61 20h31v61H61Zm0 0"></path>
							</clipPath>
							<clipPath id="1de960cb24">
								<path d="m74.777 15.992 17.7 59.555-20.09 5.969-17.7-59.551Zm0 0"></path>
							</clipPath>
							<clipPath id="3f5c676d1b">
								<path d="m74.777 15.992 17.7 59.555-20.09 5.969-17.7-59.551Zm0 0"></path>
							</clipPath>
							<clipPath id="12b8cf3738">
								<path d="M15 21h63v34H15Zm0 0"></path>
							</clipPath>
							<clipPath id="9ecc4d54aa">
								<path d="m14.168 22.145 62.094-2.063L77.355 53l-62.093 2.059Zm0 0"></path>
							</clipPath>
							<clipPath id="fb9066d467">
								<path d="M76.555 20.074 14.46 22.133l1.094 32.918 62.093-2.059Zm0 0"></path>
							</clipPath>
							<clipPath id="436e50ad1b">
								<path d="M76.555 20.074 14.46 22.133l1.094 32.918 62.093-2.059Zm0 0"></path>
							</clipPath>
						</defs>
						<g clipPath="url(#d1b505d19b)">
							<g clipPath="url(#8408ee9d4d)">
								<g clipPath="url(#4ab129bcbc)">
									<g clipPath="url(#73ecd2e1c4)">
										<path
											fill="#ff8500"
											fillRule="evenodd"
											d="M10.918 60.46c-.098-27.75 22.93-50.687 50.613-50.425 26.367.254 47.914 20.95 49.524 47.113l.507 68.825c-5.554-19.332-26.214-15.477-41.421-15.922L68.355 110a50.287 50.287 0 0 1-17.54-.512l-1.186-.261c-22.102-5.165-38.625-24.997-38.711-48.762Zm0 0"
										></path>
									</g>
								</g>
							</g>
						</g>
						<g clipPath="url(#4f70ddfd58)">
							<g clipPath="url(#7eaae3712b)">
								<g clipPath="url(#1b9673daf2)">
									<path
										fill="#8daa64"
										d="m15.297 27.875-.602.879q-2.976 4.734-3.89 6.96-.468.928-1.328 3.677l-1.375 2.437-.844 2.656q-1.161 5.097.117 12.825 2.643 13.2 6.445 20.921a75 75 0 0 0 4.457 8.332q.938 2.226 8.45 11.067 11.59 11.766 24.921 9.363c8.895-1.383 17.22-6.875 24.965-16.476q9.696-14.784 9.336-37.793-1.682-18.088-13.754-30.297-.405-.773-4.73-4.047l-3.297-2.27c-2.18-1.39-4.324-2.535-6.438-3.425q-6.338-2.678-12.273-2.371-18.73 2.045-30.16 17.562"
									></path>
								</g>
							</g>
						</g>
						<g clipPath="url(#987de8b99b)">
							<g clipPath="url(#1de960cb24)">
								<g clipPath="url(#3f5c676d1b)">
									<path
										fill="#8daa64"
										d="M71.54 24.633q.077.247.179.488l18.91 44.805c.148.347.254.707.328 1.074q.106.555.094 1.117-.007.57-.137 1.113a5.33 5.33 0 0 1-1.707 2.848 5.4 5.4 0 0 1-1.95 1.086l-4.75 1.469-4.75 1.465q-.539.168-1.1.218a5 5 0 0 1-1.122-.015 5.2 5.2 0 0 1-1.094-.246q-.538-.182-1.02-.47a5.415 5.415 0 0 1-1.645-1.512 5.7 5.7 0 0 1-.55-.98 5.3 5.3 0 0 1-.335-1.07L61.234 28.36a5 5 0 0 1-.078-.507l-.11-1.055c-.679-6.465 8.556-8.371 10.493-2.164m0 0"
									></path>
								</g>
							</g>
						</g>
						<g clipPath="url(#12b8cf3738)">
							<g clipPath="url(#9ecc4d54aa)">
								<g clipPath="url(#fb9066d467)">
									<g clipPath="url(#436e50ad1b)">
										<path
											fill="#fff"
											d="M25.523 33.418c.532-.02 1.051.004 1.563.059.398-6.61 5.793-11.954 12.574-12.18a13.03 13.03 0 0 1 10.508 4.742 10.7 10.7 0 0 1 3-.531 10.69 10.69 0 0 1 10.395 6.988 10.7 10.7 0 0 1 2.687-.434c5.898-.19 10.84 4.41 11.035 10.286.195 5.879-4.43 10.797-10.328 10.992l-40.73 1.351c-5.899.196-10.84-4.41-11.036-10.28-.191-5.876 4.434-10.798 10.332-10.993m0 0"
										></path>
									</g>
								</g>
							</g>
						</g>
						<path d="M140.752 98.799q-4.675 0-7.391-4.079-2.94-4.136-4.14-10.171-1.36-6.405-1.735-13.735-.375-6.62-.375-14.39v-6.266q.077-2.637.078-5.578-.61-.608-.61-1.516-.001-.89.673-1.61c.457-.476.96-.718 1.515-.718q2.72 0 2.719 5.344 0 3.468.375 13.125.375 9.655.375 13.125.374.985.719 3.922c.226 1.96.343 3.57.343 4.828q0 1.658.516 4.11c.352 1.636.86 3.28 1.516 4.937.656 1.761 1.507 3.21 2.562 4.343q1.576 1.688 3.313 1.688 1.062 0 1.765-.672.717-.685.953-1.969.453-2.108.454-4.14V74.674c0-1.864-.18-4.227-.532-7.094q-.455-4.746-.453-7.172v-.516q0-1.216-.078-2.187l-.062-2.188q0-2.107-.235-6.406-.298-3.856-.297-6.5-.001-.824.86-1.422a3.3 3.3 0 0 1 1.922-.61l1.89 1.735v1.281q-.001.91-.297 2.188-.314 2.11-.312 2.422 0 6.862.765 18.922.67 12.673.672 19.687 0 3.767-.75 6.625c-.304 1.156-.718 2.09-1.25 2.797-.531.7-1.246 1.3-2.14 1.813q-1.284.75-3.328.75M166.62 98.345c-.5 0-.937-.18-1.312-.53a1.7 1.7 0 0 1-.563-1.282l.141-7.313q.234-4.905.234-7.312 0-2.184-.687-6.484-.75-4.219-.75-6.563 0-2.857-.828-6.547a54 54 0 0 0-2.11-7.11q-1.204-3.231-2.046-6.968-.83-3.732-.829-6.516c0-.351.204-.656.61-.906q.608-.375 1.281-.375.827 0 1.578 1.735.903 1.955 1.735 5.5.826 3.55.984 4.218l.984 5.203.75 3.313q.236-1.2.375-3.156.45-6.264 1.141-10.407c.344-1.914.742-3.375 1.203-4.375.5-1.101 1.102-1.656 1.813-1.656q2.028 0 2.03.75 0 4.3-1.812 12.672-1.814 8.362-1.812 12.734l-.14 1.22q-.16 1.125-.079 1.343v1.219c0 2.156.07 5.476.219 9.953l.156 10.015.156 1.735.141 1.812v1.891q0 .908-.75 1.547-.75.64-1.813.64M188.952 97.892q-1.44 0-2.5-.375-1.283-.375-1.281-2.109V51.595q-.001-1.276-.453-3.843-.516-2.344-.516-3.844v-.234q1.278-2.11 1.875-2.72 1.061.001 2.797-.296c1.05-.195 1.976-.297 2.781-.297q1.22.002 2.344.719 1.125.703 1.125 1.687 0 2.267-3.469 2.266h-1.047a6.5 6.5 0 0 0-1.062-.078q-.676 0-.828.078-.001 2.566.296 6.187l.157 2.11.156 4.14q0 1.44-.234 4.375l-.141 4.22 1.047-.22q1.512-.451 2.484-.453.844.001 1.516.641c.445.43.672.918.672 1.469a2.56 2.56 0 0 1-.563 1.625q-.564.719-1.39.718l-.907-.078h-.984c-.75 0-1.277.18-1.578.532v23.296l4.219-.234q4.295 0 4.296 1.969v.297q-.455.906-1.656 1.468-1.205.562-2.328.72l-2.5.077ZM212.483 98.267q-.985-.002-1.782-.718t-.797-1.688q-.002-.687.313-1.672.218-1.043.219-1.578 0-6.703-.75-25.781-.75-16.296-.75-25.719 0-.67.515-1.094.529-.421 1.297-.422.89.001 1.563.641.686.645.687 1.547-.001 4.533.453 13.578.375 10.033.375 13.578l.078.906v1.813q.235 6.55.235 19.594v1.968h5.797q1.593 1.127 1.593 2.266-.002.831-.578 1.469c-.375.43-.812.64-1.312.64-.149 0-.422-.054-.828-.156l-.297-.078c-.305.055-.781.078-1.438.078h-1.281a8.6 8.6 0 0 0-1.203-.078q-.768.905-2.11.906M234.73 98.267q-.985-.002-1.782-.718-.796-.716-.796-1.688c0-.457.101-1.016.312-1.672q.218-1.043.219-1.578 0-6.703-.75-25.781-.75-16.296-.75-25.719 0-.67.515-1.094.53-.421 1.297-.422.89.001 1.563.641.686.645.687 1.547-.001 4.533.453 13.578.375 10.033.375 13.578l.079.906v1.813q.234 6.55.234 19.594v1.968h5.797q1.594 1.127 1.594 2.266c0 .555-.196 1.043-.579 1.469-.375.43-.812.64-1.312.64-.149 0-.422-.054-.828-.156l-.297-.078c-.305.055-.781.078-1.438.078h-1.28a8.6 8.6 0 0 0-1.204-.078q-.768.905-2.11.906M258.258 97.361q-6.485.001-6.484-2.266 0-1.794 2.25-1.796h.906q.311.063.687.062.591 0 .86-.375.264-.375.265-1.36 0-6.404-.75-17.484-.689-11.544-.687-17.422c0-1.406.023-2.687.078-3.843l.078-3.844q0-2.496-.219-4.156-.843.313-1.734.312c-1.156 0-1.734-.601-1.734-1.812q-.001-.904 1.093-1.578 1.092-.686 2.829-.985c2.101-.351 3.882-.531 5.343-.531q.902 0 1.547.61.64.596.64 1.421c0 .555-.167 1.031-.5 1.438a1.52 1.52 0 0 1-1.234.593q-.456 0-.75-.062h-.609q-.752.002-1.094.344c-.218.218-.328.633-.328 1.234 0 5.336.32 12.672.969 22.016.601 9.804.906 17.168.906 22.093v2.875c.352-.05.86-.078 1.516-.078 2.101 0 3.156.883 3.156 2.641v.453l-1.875 1.281c-.055 0-.203.016-.453.047-.25.024-.758.031-1.516.031q-2.564.141-3.156.141M281.94 97.97q-1.143-.002-1.782-1.093c-.43-.727-.64-1.625-.64-2.688q-.001-2.484.296-6.094l.157-1.968.156-4c0-1.758-.18-5.68-.531-11.766q-.533-9.106-.532-11.75c0-.156.008-.445.032-.875q.046-.64.046-2c.051-1 .079-2.226.079-3.687q0-5.515-.75-7.016-.457 0-1.97.219l-2.109.156a2.8 2.8 0 0 1-1.734-.563q-.75-.561-.75-1.468 0-.903 1.797-1.594 2.638-.904 8.984-1.281 2.561-.14 3.094-.14.904 0 1.656.608.75.599.75 1.5-.001.908-.64 1.47-.644.561-1.625.562l-1.36-.078a11 11 0 0 0-1.343-.079h-.766c.351 3.43.531 6.524.531 9.282l-.078 4.828c-.055 1.46-.078 3.094-.078 4.906 0 2.406.101 5.297.312 8.672q.375 6.252.375 8.672 0 2.86.297 6.781.296 4.003.297 6.781-.001 3.704-2.172 3.703M309.31 99.549q-2.05 0-3.703-1.36-1.658-1.358-2.86-3.687-2.189-4.079-3.25-11.157-.75-4.904-1.124-11.312l-.078-4v-4.078a117 117 0 0 1-.079-4.75q0-4.514.375-7.985a30.2 30.2 0 0 1 1.516-7.171q1.2-3.094 3.469-4.375 1.359-.593 2.719-.594c2.664 0 4.773 1.055 6.328 3.156q2.56 3.55 3.39 7.922c.801 3.523 1.254 6.89 1.36 10.11.195 3.562.297 6.929.297 10.093v4.313q0 1.283-.375 4.812-.298 2.8-.297 4.75v.313c-.305 1.406-.453 3.062-.453 4.968 0 1.407-.305 2.868-.907 4.375q-.908 2.268-2.562 3.844-1.658 1.812-3.766 1.813m.14-4.141q1.513.002 2.579-2.797.89-2.484 1.312-6.062.421-3.592.72-8.11.14-1.966.14-5.047l-.063-6.937q-.157-4.077-.906-10.188-.611-5.201-2.266-9.203c-.5-1.25-1.132-2.226-1.89-2.937-.75-.707-1.555-1.063-2.406-1.063q-1.894 0-2.797 2.953-1.125 3.096-1.5 6.782a83 83 0 0 0-.532 7.609l-.078 2.5q-.08 1.049-.078 2.86v.296q-.002 5.064 1.063 12.453 1.201 10.032 3.547 14.25 1.499 2.642 3.156 2.641M342.71 98.799q-4.674 0-7.39-4.079-2.94-4.136-4.141-10.171-1.36-6.405-1.735-13.735-.375-6.62-.375-14.39v-6.266q.078-2.637.079-5.578-.61-.608-.61-1.516 0-.89.672-1.61c.457-.476.961-.718 1.516-.718q2.718 0 2.718 5.344 0 3.468.375 13.125.375 9.655.375 13.125.374.985.72 3.922c.226 1.96.343 3.57.343 4.828q0 1.658.516 4.11c.351 1.636.859 3.28 1.515 4.937q.982 2.642 2.563 4.343 1.577 1.688 3.312 1.688 1.062 0 1.766-.672c.476-.457.797-1.113.953-1.969q.452-2.108.453-4.14V74.674c0-1.864-.18-4.227-.531-7.094-.305-3.164-.453-5.555-.453-7.172v-.516q-.001-1.216-.078-2.187l-.063-2.188q0-2.107-.234-6.406-.298-3.856-.297-6.5-.001-.824.86-1.422a3.3 3.3 0 0 1 1.921-.61l1.89 1.735v1.281q-.001.91-.296 2.188-.315 2.11-.313 2.422-.001 6.862.766 18.922c.445 8.449.672 15.011.672 19.687q0 3.767-.75 6.625c-.305 1.156-.719 2.09-1.25 2.797-.531.7-1.246 1.3-2.14 1.813q-1.284.75-3.329.75M368.892 97.97q-1.143-.002-1.782-1.093c-.43-.727-.64-1.625-.64-2.688q-.001-2.484.297-6.094l.156-1.968.156-4c0-1.758-.18-5.68-.531-11.766q-.532-9.106-.531-11.75c0-.156.007-.445.03-.875q.048-.64.048-2c.05-1 .078-2.226.078-3.687q0-5.515-.75-7.016-.457 0-1.969.219l-2.11.156a2.8 2.8 0 0 1-1.734-.563q-.75-.561-.75-1.468 0-.903 1.797-1.594 2.638-.904 8.985-1.281 2.56-.14 3.093-.14c.602 0 1.157.202 1.657.608q.75.599.75 1.5-.001.908-.641 1.47-.643.561-1.625.562l-1.36-.078a11 11 0 0 0-1.343-.079h-.766q.53 5.145.531 9.282l-.078 4.828q-.08 2.189-.078 4.906-.002 3.61.313 8.672.375 6.252.375 8.672-.001 2.86.297 6.781.294 4.003.296 6.781-.002 3.704-2.171 3.703m0 0"></path>
					</svg>
				</Link>
			</div>
			<article className="max-w-4xl mx-auto px-4 py-12 pt-0">
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
										<span
											key={category.id}
											className="text-blue-600 font-medium"
										>
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
						<h3 className="text-2xl font-semibold mb-6 text-gray-800">
							Free Resources
						</h3>
						<div className="grid gap-6 sm:grid-cols-2">
							{resources?.map((resource) => (
								<Link
									key={resource.id}
									href={resource.filePath}
									className="h-full"
								>
									<div className="p-4 border rounded hover:shadow-sm transition h-full">
										<h4 className="font-semibold text-lg mb-1">
											{resource.title}
										</h4>
										<p className="text-sm text-gray-500">
											{resource.description}
										</p>
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
						<h3 className="text-2xl font-semibold mb-6 text-gray-800">
							Related Posts
						</h3>
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
					) : (
						<span />
					)}
					{post.next ? (
						<Link href={`/blog/${post.next.slug}`} className="hover:underline">
							{post.next.title} →
						</Link>
					) : (
						<span />
					)}
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
		</>
	);
}
