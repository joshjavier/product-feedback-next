import * as v from 'valibot';

export const newFeedbackSchema = v.object({
  title: v.pipe(
    v.string(),
    v.nonEmpty('Can’t be empty'),
    v.maxLength(255, 'Title must not exceed 255 characters.')
  ),
  category: v.pipe(v.string(), v.nonEmpty('Can’t be empty')),
  description: v.pipe(v.string(), v.nonEmpty('Can’t be empty')),
});

export const editFeedbackSchema = v.object({
  title: v.pipe(
    v.string(),
    v.nonEmpty('Can’t be empty'),
    v.maxLength(255, 'Title must not exceed 255 characters.')
  ),
  category: v.pipe(v.string(), v.nonEmpty('Can’t be empty')),
  status: v.pipe(v.string(), v.nonEmpty('Can’t be empty')),
  description: v.pipe(v.string(), v.nonEmpty('Can’t be empty')),
});

export const commentSchema = v.pipe(
  v.string(),
  v.nonEmpty('Can’t post an empty comment.'),
  v.maxLength(250, 'Comment must not exceed 250 characters.')
);

export type NewFeedbackFormData = v.InferInput<typeof newFeedbackSchema>;
export type EditFeedbackFormData = v.InferInput<typeof editFeedbackSchema>;
export type CommentFormData = v.InferInput<typeof commentSchema>;
