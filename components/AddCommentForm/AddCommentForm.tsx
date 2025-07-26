'use client';

import { FormEvent, startTransition, useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Button, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { createComment } from '@/lib/actions';
import { CommentFormData } from '@/lib/schema';
import { CommentMutationResult } from '@/lib/types';
import classes from './AddCommentForm.module.css';

interface AddCommentFormProps {
  charLimit?: number;
  feedbackId: number;
}

export function AddCommentForm({ charLimit = 250, feedbackId }: AddCommentFormProps) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const isInvalid = value.length > charLimit;
  const charLeft = charLimit - value.length;

  const [state, formAction, isPending] = useActionState<CommentMutationResult, CommentFormData>(
    createComment.bind(null, feedbackId),
    { success: false }
  );

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (state.success) {
      setValue('');
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
        title: 'Bummer!',
        message: state.message ?? 'Something went wrong.',
        icon: <IconX />,
        color: 'red',
      });
    }
  }, [state, isPending]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      formAction(value);
    });
  };

  return (
    <form onSubmit={onSubmit} className={classes.container}>
      <Textarea
        variant="filled"
        label="Add Comment"
        description={`${charLeft} ${charLeft === 1 ? 'character' : 'characters'} left`}
        placeholder="Type your comment here"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        classNames={{
          label: classes.label,
          input: classes.input,
          root: classes.root,
          description: classes.description,
          wrapper: classes.wrapper,
        }}
        error={isInvalid}
        autosize
      />
      <Button
        type="submit"
        className={classes.button}
        disabled={isInvalid}
        variant="primary"
        loading={isPending}
        loaderProps={{ type: 'dots' }}
      >
        Post Comment
      </Button>
    </form>
  );
}
