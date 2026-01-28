import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({
  params
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    Development: "bg-blue-100 text-blue-700",
    Design: "bg-purple-100 text-purple-700",
    Technology: "bg-green-100 text-green-700",
    Business: "bg-orange-100 text-orange-700"
  };

  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <article className="bg-white border border-neutral-200 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <span
                className={`inline-block w-fit px-3 py-1 ${
                  categoryColors[post.category] || "bg-neutral-100 text-neutral-700"
                } text-xs font-medium rounded-full mb-4 md:mb-0`}
              >
                {post.category}
              </span>
              <time className="text-neutral-500 text-sm">{post.date}</time>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold mb-6">{post.title}</h1>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
