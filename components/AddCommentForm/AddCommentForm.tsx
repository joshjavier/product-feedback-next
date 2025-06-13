'use client';

import { FormEvent, useState } from 'react';
import { Button, Textarea } from '@mantine/core';
import classes from './AddCommentForm.module.css';

interface AddCommentFormProps {
  charLimit?: number;
}

export function AddCommentForm({ charLimit = 250 }: AddCommentFormProps) {
  const [value, setValue] = useState('');
  const isInvalid = value.length > charLimit;
  const charLeft = charLimit - value.length;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <Button type="submit" className={classes.button} disabled={isInvalid}>
        Post Comment
      </Button>
    </form>
  );
}
