import { Fragment, Suspense } from 'react';
import { Divider } from '@mantine/core';
import { getDb } from '@/lib/db';
import { CommentBlock } from './CommentBlock';
import { CommentBlocksSkeleton } from './Skeleton';
import classes from './FeedbackComments.module.css';

interface CommentBlocksProps {
  feedbackId: number;
}

interface FeedbackCommentsProps {
  count: number;
  feedbackId: number;
}

async function CommentBlocks({ feedbackId }: CommentBlocksProps) {
  const db = getDb();
  const comments = await db.comment.findMany({
    where: { feedbackRequestId: feedbackId, parentCommentId: null },
    include: {
      author: { select: { name: true, username: true, avatarUrl: true } },
      replies: {
        include: {
          author: { select: { name: true, username: true, avatarUrl: true } },
          replyToUser: { select: { username: true } },
        },
      },
    },
  });

  return (
    <>
      {comments.map((comment, i, arr) => (
        <Fragment key={comment.id}>
          <CommentBlock comment={comment} />
          {i + 1 < arr.length && <Divider className={classes.divider} />}
        </Fragment>
      ))}
    </>
  );
}

export function FeedbackComments({ count, feedbackId }: FeedbackCommentsProps) {
  return (
    <section className={classes.container}>
      <h2 className={classes.title}>
        {count} {count === 1 ? 'Comment' : 'Comments'}
      </h2>
      <Suspense fallback={<CommentBlocksSkeleton count={count} />}>
        <CommentBlocks feedbackId={feedbackId} />
      </Suspense>
    </section>
  );
}
