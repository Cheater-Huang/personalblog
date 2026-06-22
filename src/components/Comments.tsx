"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Comment = {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
  parent_id: string | null;
};

export default function Comments({ page }: { page: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  const loadComments = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("page", page)
      .order("created_at", { ascending: true });
    setComments(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, [page]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    await supabase.from("comments").insert({
      page,
      nickname: nickname.trim() || "匿名用户",
      content: content.trim(),
      parent_id: replyTo?.id ?? null,
    });
    setContent("");
    setNickname("");
    setReplyTo(null);
    await loadComments();
    setSubmitting(false);
  };

  // 只取顶层评论
  const topComments = comments.filter((c) => !c.parent_id);
  // 获取某条评论的回复
  const getReplies = (id: string) => comments.filter((c) => c.parent_id === id);

  const formatDate = (str: string) =>
    new Date(str).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const CommentCard = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const replies = getReplies(comment.id);
    return (
      <div style={{ marginLeft: isReply ? "1.5rem" : "0" }}>
        <div
          className="rounded-xl p-5 mb-3"
          style={{
            background: isReply ? "#e8e2d4" : "#ede8dc",
            border: "1px solid #d4c9b0",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm font-xingkai" style={{ color: "#6b5c3e" }}>
              {comment.nickname}
              {isReply && (
                <span className="text-xs ml-2 font-normal" style={{ color: "#999" }}>
                  回复
                </span>
              )}
            </span>
            <span className="text-xs" style={{ color: "#999" }}>
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#3a3a3a" }}>
            {comment.content}
          </p>
          <button
            onClick={() => setReplyTo(replyTo?.id === comment.id ? null : comment)}
            className="text-xs transition-colors"
            style={{ color: replyTo?.id === comment.id ? "#6b5c3e" : "#aaa" }}
          >
            {replyTo?.id === comment.id ? "取消回复" : "↩ 回复"}
          </button>
        </div>

        {/* 子回复 */}
        {replies.map((reply) => (
          <CommentCard key={reply.id} comment={reply} isReply={true} />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-16" style={{ color: "#2c2c2c" }}>

      {/* 标题 */}
      <h2 className="text-xl font-bold font-xingkai mb-8 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full inline-block" style={{ background: "#6b5c3e" }} />
        评论区
        <span className="text-sm font-normal" style={{ color: "#999" }}>
          ({comments.length})
        </span>
      </h2>

      {/* 输入框 */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{ background: "#ede8dc", border: "1px solid #d4c9b0" }}
      >
        {/* 回复提示 */}
        {replyTo && (
          <div
            className="text-xs px-3 py-2 rounded-lg mb-3 flex items-center justify-between"
            style={{ background: "#d4c9b0", color: "#6b5c3e" }}
          >
            <span>正在回复 <strong>{replyTo.nickname}</strong>：{replyTo.content.slice(0, 20)}{replyTo.content.length > 20 ? "..." : ""}</span>
            <button onClick={() => setReplyTo(null)} style={{ color: "#999" }}>✕</button>
          </div>
        )}

        <input
          type="text"
          placeholder="昵称（选填，默认匿名用户）"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full rounded-lg px-4 py-2 text-sm mb-3 outline-none"
          style={{
            background: "#f5f0e8",
            border: "1px solid #d4c9b0",
            color: "#2c2c2c",
          }}
        />
        <textarea
          placeholder={replyTo ? `回复 ${replyTo.nickname}...` : "写下你的评论..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none mb-3"
          style={{
            background: "#f5f0e8",
            border: "1px solid #d4c9b0",
            color: "#2c2c2c",
          }}
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting || !content.trim()}
            className="px-6 py-2 rounded-full text-sm transition-all duration-300"
            style={{
              background: submitting || !content.trim() ? "#ccc" : "#6b5c3e",
              color: "white",
              cursor: submitting || !content.trim() ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "发送中..." : replyTo ? "发表回复" : "发表评论"}
          </button>
        </div>
      </div>

      {/* 评论列表 */}
      {loading ? (
        <div className="text-center py-8" style={{ color: "#999" }}>加载中...</div>
      ) : topComments.length === 0 ? (
        <div className="text-center py-8 font-xingkai" style={{ color: "#999" }}>
          还没有评论，来说点什么吧 ✨
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {topComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}