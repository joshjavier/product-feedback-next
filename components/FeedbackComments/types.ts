import { Prisma } from '@prisma/client';

const commentAuthor = {
  name: true,
  username: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;

export const comment = {
  id: true,
  author: { select: commentAuthor },
  content: true,
  replyToUser: { select: { username: true } },
} satisfies Prisma.CommentSelect;

export const commentWithReplies = {
  ...comment,
  replies: {
    select: comment,
  },
} satisfies Prisma.CommentSelect;

export type Comment = Prisma.CommentGetPayload<{ select: typeof comment }>;
export type CommentWithReplies = Comment & { replies?: Comment[] };
