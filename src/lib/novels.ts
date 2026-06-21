import fs from "fs";
import path from "path";
import matter from "gray-matter";

const novelsDir = path.join(process.cwd(), "src/content/novels");

export type NovelMeta = {
  slug: string;
  title: string;
  description: string;
  author: string;
  status: string;
  updatedAt: string;
  color: string;
};

export type ChapterMeta = {
  slug: string;
  novel: string;
  title: string;
  order: number;
  date: string;
};

// 获取所有小说
export function getAllNovels(): NovelMeta[] {
  const dirs = fs.readdirSync(novelsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return dirs.map((dir) => {
    const indexPath = path.join(novelsDir, dir, "index.mdx");
    const raw = fs.readFileSync(indexPath, "utf-8");
    const { data } = matter(raw);
    return {
      slug: dir,
      title: data.title ?? dir,
      description: data.description ?? "",
      author: data.author ?? "",
      status: data.status ?? "连载中",
      updatedAt: data.updatedAt ? new Date(data.updatedAt).toISOString().slice(0, 10) : "",
      color: data.color ?? "#2d1b4e",
    };
  });
}

// 获取某部小说的所有章节
export function getChaptersByNovel(novelSlug: string): ChapterMeta[] {
  const novelDir = path.join(novelsDir, decodeURIComponent(novelSlug));
  const files = fs.readdirSync(novelDir)
    .filter((f) => f.endsWith(".mdx") && f !== "index.mdx");

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(novelDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      novel: novelSlug,
      title: data.title ?? file,
      order: data.order ?? 0,
      date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    };
  }).sort((a, b) => a.order - b.order);
}

// 获取单章内容
export function getChapter(novelSlug: string, chapterSlug: string) {
  const filePath = path.join(novelsDir, decodeURIComponent(novelSlug), decodeURIComponent(chapterSlug) + ".mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug: chapterSlug,
      novel: novelSlug,
      title: data.title ?? "无题",
      order: data.order ?? 0,
      date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    },
    content,
  };
}

// 获取小说简介
export function getNovelInfo(novelSlug: string) {
  const indexPath = path.join(novelsDir, decodeURIComponent(novelSlug), "index.mdx");
  const raw = fs.readFileSync(indexPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug: novelSlug,
      title: data.title ?? novelSlug,
      description: data.description ?? "",
      author: data.author ?? "",
      status: data.status ?? "连载中",
      updatedAt: data.updatedAt ? new Date(data.updatedAt).toISOString().slice(0, 10) : "",
      color: data.color ?? "#2d1b4e",
    },
    content,
  };
}