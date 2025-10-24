import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Blog | Voyage DZ',
  description: 'Explore our travel blog for tips, destination guides, and stories about traveling in Algeria.',
};

export default async function BlogIndexPage() {
  const posts = await db.blog.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Voyage DZ Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your source for Algerian travel inspiration and tips.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="group block">
              <div className="relative h-64 w-full mb-4">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-muted-foreground mt-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
