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
