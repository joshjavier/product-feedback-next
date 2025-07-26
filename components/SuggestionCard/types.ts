import { Prisma } from '@prisma/client';

const aggregateFields = {
  _count: { select: { comments: true, upvotes: true } },
} satisfies Prisma.FeedbackRequestSelect;

export const suggestion = {
  id: true,
  title: true,
  description: true,
  category: { select: { name: true } },
  ...aggregateFields,
} satisfies Prisma.FeedbackRequestSelect;

export type Suggestion = Prisma.FeedbackRequestGetPayload<{ select: typeof suggestion }>;
