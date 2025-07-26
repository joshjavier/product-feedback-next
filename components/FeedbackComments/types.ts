import { Prisma } from '@prisma/client';

const commentAuthor = {
  name: true,
  username: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;

export const commentBase = {
  id: true,
  author: { select: commentAuthor },
  content: true,
} satisfies Prisma.CommentSelect;

export const comment = {
  ...commentBase,
  replyToUser: { select: { username: true } },
} satisfies Prisma.CommentSelect;

export const commentWithReplies = {
  ...comment,
  replies: {
    select: comment,
  },
} satisfies Prisma.CommentSelect;

export type CommentBase = Prisma.CommentGetPayload<{ select: typeof commentBase }>;
export type Comment = Prisma.CommentGetPayload<{ select: typeof comment }>;
export type CommentWithReplies = Comment & { replies?: Comment[] };
