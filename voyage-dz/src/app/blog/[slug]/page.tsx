import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

async function getPost(slug: string) {
  const post = await db.blog.findUnique({
    where: { slug },
  });
  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return { title: "Post Not Found | Voyage DZ" };
  }

  const title = `${post.title} | Voyage DZ Blog`;
  const description = post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: post.imageUrl || "/placeholder.svg", width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="relative h-[50vh] w-full">
        <Image
          src={post.imageUrl || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white container">
            <h1 className="text-4xl md:text-6xl font-bold">{post.title}</h1>
            <p className="text-lg mt-4">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          {/* This assumes post.content is safe HTML or markdown that you would parse.
              For simplicity, we'll just render it as text.
              In a real app, you'd use a library like 'react-markdown'. */}
          <p>{post.content}</p>
        </div>
      </div>
    </article>
  );
}
