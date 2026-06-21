"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function WelcomeAnimation() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("welcomePlayed");
    if (hasPlayed) {
      setShow(false);
      return;
    }
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("welcomePlayed", "true");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // null 时渲染遮罩，防止主页闪现
  if (show === null) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black" />
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          onClick={() => {
            setShow(false);
            sessionStorage.setItem("welcomePlayed", "true");
          }}
        >
          {/* 全屏背景图 */}
          <Image
            src="/banner_1.jpg"
            alt="welcome"
            fill
            className="object-cover"
            priority
          />

          {/* 暗色遮罩 */}
          <div className="absolute inset-0 bg-black/50" />

          {/* 文字内容 */}
          <div className="relative z-10 flex flex-col items-center text-center px-8">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white font-xingkai"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              我们终将在充满鲜花芬芳的西风尽头重逢
            </motion.h1>

            <motion.p
              className="text-white/70 text-lg md:text-xl mt-6 font-xingkai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              愿你在这里找到片刻宁静 ✨
            </motion.p>

            <motion.p
              className="text-white/30 text-sm mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              点击任意处进入
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}