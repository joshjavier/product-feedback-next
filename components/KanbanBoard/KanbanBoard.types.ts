import { Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const feedbackForCard = Prisma.validator<Prisma.FeedbackRequestDefaultArgs>()({
  select: {
    id: true,
    title: true,
    description: true,
    status: { select: { name: true } },
    category: { select: { name: true } },
    _count: { select: { comments: true, upvotes: true } },
  },
});

export type FeedbackForCard = Prisma.FeedbackRequestGetPayload<typeof feedbackForCard>;
