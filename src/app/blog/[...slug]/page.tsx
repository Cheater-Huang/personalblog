import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import BackButton from "@/components/BackButton";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center">
      <div className="w-full max-w-2xl px-6" style={{ marginTop: "50px" }}>

        {/* 返回键 */}
       <BackButton label="← 返回随笔" />

        {/* 文章头部 */}
       {/* 文章头部 */}
       <div className="w-full px-8 pt-8 pb-0 mb-0 mt-0 text-center" style={{background: "#f5f0e8"}}>
          <div className="text-black/40 text-sm mb-3">{meta.date} · {meta.category}</div>
          <h1 className="text-3xl md:text-4xl font-bold font-xingkai leading-snug text-[#2c2c2c]">
            {meta.title}
          </h1>
          <p className="text-black/50 mt-3 font-xingkai">{meta.description}</p>
        </div>

        {/* 纸黄色文章卡片 */}
        <div
          className="w-full px-8 pb-10 flex-1"
          style={{ background: "#f5f0e8", minHeight: "calc(100vh - 120px)" }}
        >
          {/* 分割线 */}
         {/* 文章正文 */}
          <div style={{color: "#111111"}}>
            <article className="prose prose-lg max-w-none
              prose-headings:font-xingkai
              prose-headings:text-[#2c2c2c]
              prose-p:text-[#111111]
              prose-p:leading-relaxed
              prose-strong:text-[#2c2c2c]
              prose-a:text-[#6b5c3e]
              prose-a:hover:text-[#2c2c2c]
            ">
              <MDXRemote source={content} />
            </article>
          </div>

          
        </div>

      </div>
    </div>
  );
}