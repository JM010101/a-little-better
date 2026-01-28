import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog-data";

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Blog</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Insights, tips, and updates from our team
            </p>
          </div>
          <div className="space-y-12">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                <article className="bg-white border border-neutral-200 rounded-lg p-8 md:p-10 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <span className="inline-block w-fit px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-2 md:mb-0">
                      {post.category}
                    </span>
                    <time className="text-neutral-500 text-sm">{post.date}</time>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                  <p className="text-neutral-600 leading-relaxed">{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
