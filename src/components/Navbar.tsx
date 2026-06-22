"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 左上角 Logo */}
      <div className="fixed top-0 left-0 z-50 px-4 h-14 flex items-center">
        <Link href="/" className="text-white font-bold text-base tracking-wide font-xingkai drop-shadow-lg">
          故都灵の赛博小屋
        </Link>
      </div>

      {/* 右上角导航 */}
      <nav className="fixed top-0 right-0 z-50 px-4 h-14 flex items-center">
        {/* 桌面端菜单 */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow-lg">首页</Link>
          <Link href="/blog" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow-lg">随笔</Link>
          <Link href="/projects" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow-lg">小说</Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow-lg">致访客</Link>
        </div>

        {/* 手机端汉堡按钮 */}
        <button
          className="md:hidden p-2"
          style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div style={{ width: '24px', height: '2px', background: 'white' }}></div>
          <div style={{ width: '24px', height: '2px', background: 'white' }}></div>
          <div style={{ width: '24px', height: '2px', background: 'white' }}></div>
        </button>
      </nav>

      {/* 手机端下拉菜单 */}
      {menuOpen && (
        <div className="fixed top-14 left-0 right-0 z-50 bg-black/90 backdrop-blur-md px-6 py-4 flex flex-col gap-4 md:hidden">
          <Link href="/" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>首页</Link>
          <Link href="/blog" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>随笔</Link>
          <Link href="/projects" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>小说</Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>关于我</Link>
        </div>
      )}
    </>
  );
}