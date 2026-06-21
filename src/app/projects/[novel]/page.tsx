import Link from "next/link";
import { getNovelInfo, getChaptersByNovel, getAllNovels } from "@/lib/novels";
import BackButton from "@/components/BackButton";

export async function generateStaticParams() {
  try {
    const novels = getAllNovels();
    return novels.map((n) => ({ novel: n.slug }));
  } catch {
    return [];
  }
}

export default async function NovelPage({
  params,
}: {
  params: Promise<{ novel: string }>;
}) {
  const { novel } = await params;
  const { meta, content } = getNovelInfo(novel);
  const chapters = getChaptersByNovel(novel);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center">
      <div className="w-full max-w-2xl px-6" style={{ marginTop: "120px" }}>

        {/* 返回键 */}
       <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 mb-10"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          ← 返回小说列表
        </Link>

        {/* 小说头部 */}
        <div
          className="w-full rounded-2xl p-8 mb-8 flex items-center gap-6"
          style={{ background: meta.color }}
        >
          <div className="text-6xl">📖</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold font-xingkai">{meta.title}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/70">
                {meta.status}
              </span>
            </div>
            <p className="text-white/70 text-sm mb-2">{meta.description}</p>
            <p className="text-white/40 text-xs">{meta.author} · 最近更新 {meta.updatedAt}</p>
          </div>
        </div>

        {/* 章节目录 */}
        <h2 className="text-lg font-semibold font-xingkai text-white/80 mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-white/40 rounded-full inline-block" />
          章节目录
          <span className="text-white/30 text-sm font-normal">({chapters.length}章)</span>
        </h2>

        <div className="flex flex-col gap-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/projects/${novel}/${chapter.slug}`}
              className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-white/20 text-sm w-6">{chapter.order}</span>
                <span className="font-xingkai text-white group-hover:text-white/90">
                  {chapter.title}
                </span>
              </div>
              <span className="text-white/30 text-xs shrink-0 ml-4">{chapter.date}</span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}