'use client';

import { FormEvent, startTransition, useActionState, useEffect, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { Button, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { createReply } from '@/lib/actions';
import { CommentFormData } from '@/lib/schema';
import { CommentMutationResult } from '@/lib/types';
import classes from './AddReplyForm.module.css';

interface AddReplyFormProps {
  charLimit?: number;
  commentId: number;
}

export function AddReplyForm({ charLimit = 250, commentId }: AddReplyFormProps) {
  const [value, setValue] = useState('');
  const isInvalid = value.length > 250;
  const charLeft = charLimit - value.length;

  const [state, formAction, isPending] = useActionState<CommentMutationResult, CommentFormData>(
    createReply.bind(null, commentId),
    { success: false }
  );

  useEffect(() => {
    if (!state.success && state.message) {
      notifications.show({
        title: 'Oops!',
        message: state.message ?? 'Something went wrong',
        icon: <IconX />,
        color: 'red',
      });
    }
  }, [state]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      formAction(value);
    });
  };

  return (
    <form onSubmit={onSubmit} className={classes.container} aria-label="Reply">
      <Textarea
        variant="filled"
        aria-label="Add Reply"
        placeholder="Type your reply here"
        autosize
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        error={isInvalid ? charLeft : null}
        classNames={{ root: classes.root, input: classes.input }}
      />
      <Button
        type="submit"
        disabled={isInvalid}
        className={classes.button}
        variant="primary"
        loading={isPending}
        loaderProps={{ type: 'dots' }}
      >
        Post Reply
      </Button>
    </form>
  );
}
