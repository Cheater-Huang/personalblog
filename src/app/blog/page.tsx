import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

export default function BlogPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center">
      <div className="w-full max-w-2xl px-6" style={{ marginTop: "120px" }}>

        {/* 返回键 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-10"
        >
          ← 返回首页
        </Link>

        {/* 标题 */}
        <h1 className="text-3xl font-bold font-xingkai mb-2">随笔</h1>
        <p className="text-white/40 text-sm mb-12">记录思考与生活</p>

        {/* 分类列表 */}
        <div className="flex flex-col gap-8">
          {categories.map((category) => {
            const posts = getPostsByCategory(category);
            return (
              <div key={category}>
                {/* 分类标题 */}
                <h2 className="text-lg font-semibold font-xingkai text-white/80 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-white/40 rounded-full inline-block" />
                  {category}
                  <span className="text-white/30 text-sm font-normal">
                    ({posts.length})
                  </span>
                </h2>

                {/* 该分类下的文章 */}
                <div className="flex flex-col gap-3 pl-4">
                  {posts.map((post) => (
                    <Link
                      key={post.slug.join("/")}
                      href={`/blog/${post.slug.join("/")}`}
                      className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div>
                        <div className="font-medium text-white group-hover:text-white/90 font-xingkai">
                          {post.title}
                        </div>
                        <div className="text-white/40 text-xs mt-1">
                          {post.description}
                        </div>
                      </div>
                      <div className="text-white/30 text-xs ml-4 shrink-0">
                        {post.date}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}