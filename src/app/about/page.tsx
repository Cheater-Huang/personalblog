import Link from "next/link";

export default function AboutPage() {
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
          <p className="text-xl font-xingkai mb-8" style={{ color: "#2c2c2c" }}>
            亲爱的访客，你好：
          </p>

          {/* 正文 */}
          <div className="space-y-6 font-xingkai text-lg leading-loose" style={{ color: "#3a3a3a" }}>
            <p style={{ textIndent: "2em" }}>
              我是故都灵，一个喜欢在深夜写字的人。这里是我的赛博小屋，存放着我的随笔、小说，还有一些说不清道不明的心情。
            </p>
            <p style={{ textIndent: "2em" }}>
              我相信文字是有重量的，每一个字落下去，都会在某个地方留下痕迹。也许你现在读到这里，就是那个痕迹找到了它该去的地方。
            </p>
            <p style={{ textIndent: "2em" }}>
              平时喜欢听音乐、读书、发呆。偶尔写写代码，偶尔对着窗外的云发一下午的呆。生活有时候很重，但总有一些轻盈的瞬间值得被记录下来。
            </p>
            <p style={{ textIndent: "2em" }}>
              如果你也是一个喜欢在文字里寻找共鸣的人，那我们大概会是同路人。欢迎常来坐坐。
            </p>
          </div>

          {/* 分割线 */}
          <div className="w-full h-px my-10" style={{ background: "#d4c9b0" }} />

          {/* 落款 */}
          <div className="text-right font-xingkai" style={{ color: "#6b5c3e" }}>
            <p className="text-lg mb-1">故都灵</p>
            <p className="text-sm">写于某个深夜</p>
          </div>

        </div>

      </div>
    </div>
  );
}