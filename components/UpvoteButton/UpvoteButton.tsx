'use client';

import { useState } from 'react';
import { Button } from '@mantine/core';
import IconArrowUp from '@/icons/icon-arrow-up.svg';
import classes from './UpvoteButton.module.css';

interface UpvoteButtonProps {
  // pressed?: boolean;
  upvotes: number;
  orientation?: 'horizontal' | 'vertical';
}

export function UpvoteButton({ upvotes, orientation }: UpvoteButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Button
      classNames={{ root: classes.button, inner: classes.inner, label: classes.label }}
      aria-pressed={pressed}
      onClick={() => setPressed(!pressed)}
      leftSection={<IconArrowUp aria-hidden="true" className={classes.icon} />}
      aria-label="Upvote feedback"
      aria-description={`${upvotes} ${upvotes === 1 ? 'upvote' : 'upvotes'}`}
      data-orientation={orientation}
    >
      <span aria-hidden="true">{upvotes}</span>
    </Button>
  );
}
