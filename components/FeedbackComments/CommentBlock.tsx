'use client';

import { Avatar, Button, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AddReplyForm } from './AddReplyForm';
import classes from './CommentBlock.module.css';

interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    username: string;
    avatarUrl: string | null;
  };
  replyToUser?: { username: string } | null;
}

interface CommentBlockProps {
  comment: Comment & {
    replies?: Comment[];
  };
}

export function CommentBlock({ comment }: CommentBlockProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <article className={classes.container}>
      <footer className={classes.contentinfo}>
        <Avatar
          src={comment.author.avatarUrl}
          alt={comment.author.name}
          name={comment.author.name}
          color="initials"
          className={classes.avatar}
        />
        <Flex align="center" justify="space-between" w="100%">
          <address className={classes.author}>
            <strong>{comment.author.name}</strong>
            <span>@{comment.author.username}</span>
          </address>
          <Button variant="transparent" color="blue" className={classes.replyBtn} onClick={toggle}>
            Reply
          </Button>
        </Flex>
      </footer>
      <div className={classes.wrapper}>
        <p className={classes.content}>
          {comment.replyToUser && (
            <>
              <strong>@{comment.replyToUser.username}</strong>&nbsp;&nbsp;
            </>
          )}
          {comment.content}
        </p>
        {opened && <AddReplyForm />}
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className={classes.replies}>
          {comment.replies.map((reply) => (
            <CommentBlock key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </article>
  );
}
