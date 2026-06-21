"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "← 返回" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-10"
    >
      {label}
    </button>
  );
}