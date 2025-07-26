'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Avatar, Button, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { createReply } from '@/lib/actions';
import { CommentFormData } from '@/lib/schema';
import { CommentMutationResult } from '@/lib/types';
import { AddReplyForm } from './AddReplyForm';
import { CommentWithReplies } from './types';
import classes from './CommentBlock.module.css';

interface CommentBlockProps {
  comment: CommentWithReplies;
}

export function CommentBlock({ comment }: CommentBlockProps) {
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);

  const [state, formAction, isPending] = useActionState<CommentMutationResult, CommentFormData>(
    createReply.bind(null, comment.id),
    { success: false }
  );

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (state.success) {
      close();
      router.refresh();
      notifications.show({
        title: 'Success!',
        message: state.message,
        icon: <IconCheck />,
        color: 'teal',
      });
    }

    if (!state.success && state.message) {
      notifications.show({
        title: 'Oops!',
        message: state.message,
        icon: <IconX />,
        color: 'red',
      });
    }
  }, [state, isPending]);

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
        {opened && <AddReplyForm createReply={formAction} loading={isPending} />}
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
