import { CommentBase } from '@/components/FeedbackComments/types';

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
  data: CommentBase;
}

export interface CommentMutationFailure {
  success: false;
  message?: string;
}

export type CommentMutationResult = CommentMutationSuccess | CommentMutationFailure;
