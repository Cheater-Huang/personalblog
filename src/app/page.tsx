"use client";

import Image from "next/image";
import Link from "next/link";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import Fireflies from "@/components/Fireflies";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      <WelcomeAnimation />
      <Fireflies />

      {/* ===== Banner 区域 ===== */}
      <div className="relative w-full h-64 md:h-80">
        <Image
          src="/banner.jpg"
          alt="banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

      {/* ===== 头像 + 内容区域 ===== */}
      <div className="relative flex flex-col items-center text-center px-6 pb-16">

        {/* 下半部分背景图 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner_1.jpg"
            alt="background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1a1a2e]/70" />
        </div>

        {/* 以下所有内容加 z-10 浮在背景图上方 */}
        <div className="relative z-10 flex flex-col items-center text-center w-full pb-16">

          {/* 头像 */}
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl relative -top-14 z-10 mb-[-3.5rem]">
            <Image
              src="/avatar.jpg"
              alt="avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          {/* 名字 */}
          <h1 className="text-2xl md:text-3xl font-bold text-white font-xingkai" style={{ marginTop: "-3rem" }}>
            故都灵
          </h1>

          {/* 个性签名 */}
          <p className="text-white/50 text-xl md:text-2xl mt-3 max-w-md font-xingkai">
            苍山负雪，浮生尽歇
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mt-8 justify-center">
            {["技术人员", "写作爱好者", "豪情在天"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-base bg-white/10 text-white/70 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 分割线 */}
          <div className="w-16 h-px bg-white/20 mt-8" />

          {/* 导航卡片 */}
          <div className="flex flex-col gap-6 w-full max-w-2xl" style={{ marginTop: "2rem" }}>
            {[
              { href: "/blog", emoji: "📝", title: "随笔", desc: "记录思考与生活" },
              { href: "/projects", emoji: "📖", title: "小说", desc: "我写的一些故事" },
              { href: "/about", emoji: "👤", title: "关于我", desc: "认识一下我吧" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="font-semibold text-white text-base">{item.title}</div>
                <div className="text-white/40 text-sm mt-1">{item.desc}</div>
              </Link>
            ))}
          </div>

          {/* 社交链接 */}
          <div className="flex gap-4 mt-8">
            {[
              { label: "GitHub", href: "https://github.com" },
              { label: "Twitter", href: "https://twitter.com" },
              { label: "邮箱", href: "mailto:you@example.com" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}