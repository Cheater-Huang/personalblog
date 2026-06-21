import Link from "next/link";
import { getAllNovels } from "@/lib/novels";
import BackButton from "@/components/BackButton";

export default function ProjectsPage() {
  const novels = getAllNovels();

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center">
      <div className="w-full max-w-2xl px-6" style={{ marginTop: "120px" }}>

        {/* 返回键 */}
        <BackButton label="← 返回首页" />

        {/* 标题 */}
        <h1 className="text-3xl font-bold font-xingkai mb-2">小说</h1>
        <p className="text-white/40 text-sm mb-12">我写的一些故事</p>

        {/* 小说卡片列表 */}
        <div className="flex flex-col gap-6">
          {novels.map((novel) => (
            <Link
              key={novel.slug}
              href={`/projects/${novel.slug}`}
              className="group flex items-stretch gap-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* 纯色封面 */}
              <div
                className="w-24 shrink-0 flex items-center justify-center text-3xl"
                style={{ background: novel.color }}
              >
                📖
              </div>

              {/* 小说信息 */}
              <div className="py-5 pr-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg font-xingkai">{novel.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                    {novel.status}
                  </span>
                </div>
                <p className="text-white/40 text-sm mb-3">{novel.description}</p>
                <div className="text-white/30 text-xs">
                  {novel.author} · 最近更新 {novel.updatedAt}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}