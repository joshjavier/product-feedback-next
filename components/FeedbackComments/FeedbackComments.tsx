import { Suspense } from 'react';
import { getDb } from '@/lib/db';
import { CommentBlocks } from './CommentBlocks';
import { CommentBlocksSkeleton } from './Skeleton';
import { commentWithReplies } from './types';
import classes from './FeedbackComments.module.css';

interface FeedbackCommentsProps {
  count: number;
  feedbackId: number;
}

export function FeedbackComments({ count, feedbackId }: FeedbackCommentsProps) {
  const db = getDb();
  const commentsPromise = db.comment.findMany({
    where: { feedbackRequestId: feedbackId, parentCommentId: null },
    select: commentWithReplies,
  });

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>
        {count} {count === 1 ? 'Comment' : 'Comments'}
      </h2>
      <Suspense fallback={<CommentBlocksSkeleton count={count} />}>
        <CommentBlocks commentsPromise={commentsPromise} />
      </Suspense>
    </section>
  );
}
