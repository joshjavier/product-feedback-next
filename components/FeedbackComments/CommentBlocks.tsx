'use client';

import { Fragment, use } from 'react';
import { Divider } from '@mantine/core';
import { CommentBlock } from './CommentBlock';
import { CommentWithReplies } from './types';
import classes from './FeedbackComments.module.css';

interface CommentBlocksProps {
  commentsPromise: Promise<CommentWithReplies[]>;
}

export function CommentBlocks({ commentsPromise }: CommentBlocksProps) {
  const comments = use(commentsPromise);

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
