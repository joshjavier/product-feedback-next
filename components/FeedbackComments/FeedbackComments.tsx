import { Fragment } from 'react';
import { Divider } from '@mantine/core';
import { CommentBlock } from './CommentBlock';
import classes from './FeedbackComments.module.css';

interface FeedbackCommentsProps {
  count: number;
  comments: {
    id: number;
    content: string;
    author: {
      name: string;
      username: string;
      avatarUrl: string | null;
    };
    replyToUser?: { username: string } | null;
    replies: {
      id: number;
      content: string;
      author: {
        name: string;
        username: string;
        avatarUrl: string | null;
      };
      replyToUser: { username: string } | null;
    }[];
  }[];
}

export function FeedbackComments({ count, comments }: FeedbackCommentsProps) {
  return (
    <section className={classes.container}>
      <h2 className={classes.title}>
        {count} {count === 1 ? 'Comment' : 'Comments'}
      </h2>
      {comments.map((comment, i, arr) => (
        <Fragment key={comment.id}>
          <CommentBlock comment={comment} />
          {i + 1 < arr.length && <Divider className={classes.divider} />}
        </Fragment>
      ))}
    </section>
  );
}
