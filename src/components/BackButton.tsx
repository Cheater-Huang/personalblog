"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "← 返回" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 mb-10"
      style={{
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "rgba(255,255,255,0.8)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.2)";
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "rgba(255,255,255,0.8)";
      }}
    >
      {label}
    </button>
  );
}