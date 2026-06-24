import Link from "next/link";
import { getChapter, getChaptersByNovel, getAllNovels } from "@/lib/novels";
import { MDXRemote } from "next-mdx-remote/rsc";
import BackButton from "@/components/BackButton";
import Comments from "@/components/Comments";

export async function generateStaticParams() {
  try {
    const novels = getAllNovels();
    const params = [];
    for (const novel of novels) {
      const chapters = getChaptersByNovel(novel.slug);
      for (const chapter of chapters) {
        params.push({ novel: novel.slug, chapter: chapter.slug });
      }
    }
    return params;
  } catch {
    return [];
  }
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ novel: string; chapter: string }>;
}) {
  const { novel, chapter } = await params;
  const { meta, content } = getChapter(novel, chapter);
  const chapters = getChaptersByNovel(novel);
  const currentIndex = chapters.findIndex((c) => c.slug === decodeURIComponent(chapter));
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center">
      <div className="w-full max-w-2xl px-6" style={{ marginTop: "70px" }}>

        {/* 返回键 */}
       <Link
          href={`/projects/${novel}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 mb-8"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          ← 返回目录
        </Link>

        {/* 章节标题区域 */}
        <div className="w-full px-8 pt-8 pb-0 text-center" style={{ background: "#f5f0e8" }}>
          <div className="text-black/40 text-sm mb-3">{meta.date}</div>
         <h1 className="text-lg md:text-xl font-bold font-xingkai leading-snug text-[#2c2c2c]">
            {meta.title}
          </h1>
        </div>

        {/* 正文 */}
        <div
          className="w-full px-8 pb-10"
          style={{ background: "#f5f0e8", minHeight: "calc(100vh - 200px)" }}
        >
          <div className="w-full h-px bg-black/10 mb-8 mt-6" />
          <div style={{ color: "#111111" }}>
            <article className="prose prose-lg max-w-none
              prose-headings:font-xingkai
              prose-headings:text-[#2c2c2c]
              prose-p:text-[#111111]
              prose-p:leading-relaxed
              prose-strong:text-[#2c2c2c]
            ">
              <MDXRemote source={content} />
            </article>
          </div>

          {/* 上一章/下一章 */}
          <div className="flex justify-between mt-12 pt-6 border-t border-black/10">
            {prevChapter ? (
              <Link
                href={`/projects/${novel}/${prevChapter.slug}`}
                className="text-[#6b5c3e] hover:text-[#2c2c2c] text-sm transition-colors"
              >
                ← {prevChapter.title}
              </Link>
            ) : <div />}
            {nextChapter ? (
              <Link
                href={`/projects/${novel}/${nextChapter.slug}`}
                className="text-[#6b5c3e] hover:text-[#2c2c2c] text-sm transition-colors"
              >
                {nextChapter.title} →
              </Link>
            ) : <div />}
          </div>
          <Comments page={`${novel}/${chapter}`} />
            {/* 底部返回键 */}
          <div className="mt-12 flex justify-center">
            <Link
              href={`/projects/${novel}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all duration-300"
              style={{
                background: "#6b5c3e",
                color: "white",
              }}
            >
              ← 返回目录
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}