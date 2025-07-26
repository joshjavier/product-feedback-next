import { Prisma } from '@prisma/client';

export interface FeedbackMutationSuccess {
  success: true;
  title?: string;
  message?: string;
}

export interface FeedbackMutationFailure {
  success: false;
  title?: string;
  message?: string;
  errors?: Record<string, string>;
}

export type FeedbackMutationResult = FeedbackMutationSuccess | FeedbackMutationFailure;

export interface CommentMutationSuccess {
  success: true;
  message?: string;
}

export interface CommentMutationFailure {
  success: false;
  message?: string;
}

export type CommentMutationResult = CommentMutationSuccess | CommentMutationFailure;

export const feedbackForEditForm = {
  id: true,
  title: true,
  description: true,
  category: { select: { name: true } },
  status: { select: { name: true } },
} satisfies Prisma.FeedbackRequestSelect;

export type FeedbackForEditForm = Prisma.FeedbackRequestGetPayload<{
  select: typeof feedbackForEditForm;
}>;
