import Link from "next/link";
import BackButton from "@/components/BackButton";
import Comments from "@/components/Comments";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center">
      <div className="w-full max-w-2xl px-6" style={{ marginTop: "120px" }}>

        {/* 返回键 */}
       <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 mb-10"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          ← 返回首页
        </Link>

        {/* 信件卡片 */}
        <div className="w-full px-10 py-12 mb-16" style={{ background: "#f5f0e8", color: "#111111" }}>

          {/* 信件头部 */}
          <div className="text-right text-sm mb-8" style={{ color: "#6b5c3e" }}>
            {new Date().toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {/* 称呼 */}
          <p className="text-lg font-xingkai mb-8" style={{ color: "#2c2c2c" }}>
            来访的朋友：
          </p>

          {/* 正文 */}
          <div className="space-y-6 font-xingkai text-lg leading-loose" style={{ color: "#3a3a3a" }}>
            <p style={{ textIndent: "2em" }}>
              我想能看到这篇文字的都是关系不错的，那我也不必大费周章地介绍了，如果硬要说点什么介绍自己的，无非还是那句话：
            </p>
            <p style={{ textIndent: "2em" }}>
              三少爷文章第一，吹水第二，逻辑第三。
            </p>
            <p style={{ textIndent: "2em" }}>
              至于为何是三少爷，这个不必赘述了，文章第一，这个了解我的人都知道，所以才无聊搭了这个博客。
            </p>
            <p style={{ textIndent: "2em" }}>
              如果你无聊透顶又想起我这个朋友的话，随时来访，也可以在匿名评论区畅所欲言，反正我也不知道是谁写的（笑）。
            </p>
            <p style={{ textIndent: "2em" }}>
              以上，祝好。
            </p>
          </div>

          {/* 分割线 */}
          <div className="w-full h-px my-10" style={{ background: "#d4c9b0" }} />

          {/* 落款 */}
          <div className="text-right font-xingkai" style={{ color: "#6b5c3e" }}>
            <p className="text-sm mb-1">故都灵</p>
            <p className="text-sm">————丙午年五月初八于惠州</p>
          </div>
           <Comments page="about" />
        </div>

      </div>
    </div>
  );
}