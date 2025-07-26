'use client';

import { FormEvent, startTransition, useState } from 'react';
import { Button, Textarea } from '@mantine/core';
import classes from './AddReplyForm.module.css';

interface AddReplyFormProps {
  charLimit?: number;
  createReply?: (content: string) => void;
  loading?: boolean;
}

export function AddReplyForm({ charLimit = 250, createReply, loading }: AddReplyFormProps) {
  const [value, setValue] = useState('');
  const isInvalid = value.length > 250;
  const charLeft = charLimit - value.length;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (createReply) {
      startTransition(() => {
        createReply(value);
      });
    }
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
        loading={loading}
        loaderProps={{ type: 'dots' }}
      >
        Post Reply
      </Button>
    </form>
  );
}
