import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string[];
  title: string;
  date: string;
  category: string;
  description: string;
};

// 递归读取所有 mdx 文件
function getAllMdxFiles(dir: string, baseDir: string): string[][] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[][] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, baseDir));
    } else if (entry.name.endsWith(".mdx")) {
      const rel = path.relative(baseDir, fullPath);
      const slug = rel.replace(/\.mdx$/, "").split(path.sep);
      files.push(slug);
    }
  }
  return files;
}

// 获取所有文章元信息
export function getAllPosts(): PostMeta[] {
  const slugs = getAllMdxFiles(postsDir, postsDir);
  return slugs.map((slug) => {
    const filePath = path.join(postsDir, ...slug) + ".mdx";
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? "无题",
      date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
      category: data.category ?? "未分类",
      description: data.description ?? "",
    };
  }).sort((a, b) => (a.date > b.date ? -1 : 1));
}

// 获取所有分类
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return Array.from(cats);
}

// 获取某分类下的文章
export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

// 获取单篇文章内容
export function getPostBySlug(slug: string[]) {
  const decodedSlug = slug.map((s) => decodeURIComponent(s));
  const filePath = path.join(postsDir, ...decodedSlug) + ".mdx";
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? "无题",
     date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
      category: data.category ?? "未分类",
      description: data.description ?? "",
    },
    content,
  };
}