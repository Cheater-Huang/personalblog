"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 左上角 Logo */}
      <div className="fixed top-0 left-0 z-50 px-6 h-14 flex items-center">
        <Link href="/" className="text-white font-bold text-lg tracking-wide font-xingkai drop-shadow-lg">
          故都灵の赛博小屋
        </Link>
      </div>

      {/* 右上角导航菜单 */}
      <nav className="fixed top-0 right-0 z-50 px-6 h-14 flex items-center">
        {/* 桌面端菜单 */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow-lg">首页</Link>
          <Link href="/blog" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow-lg">随笔</Link>
          <Link href="/projects" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow-lg">小说</Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow-lg">关于我</Link>
        </div>

        {/* 移动端汉堡菜单 */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <div className="fixed top-14 right-0 z-50 bg-black/80 backdrop-blur-md px-6 py-4 flex flex-col gap-4 md:hidden">
        <Link href="/" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>首页</Link>
          <Link href="/blog" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>随笔</Link>
          <Link href="/projects" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>小说</Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>关于我</Link>
        </div>
      )}
    </>
  );
}