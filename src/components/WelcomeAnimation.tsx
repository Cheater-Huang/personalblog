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

  if (show === null) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "black",
          width: "100vw",
          height: "100vh",
        }}
      />
    );
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        />

        {/* 文字内容 */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          <motion.h1
            className="font-xingkai"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1rem",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            我们终将在充满鲜花芬芳的西风尽头重逢
          </motion.h1>

          <motion.p
            className="font-xingkai"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              color: "rgba(255,255,255,0.7)",
              marginTop: "1.5rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            愿你在这里找到片刻宁静 ✨
          </motion.p>

          <motion.p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.3)",
              marginTop: "3rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            点击任意处进入
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}