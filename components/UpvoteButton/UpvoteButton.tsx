'use client';

import { useState } from 'react';
import { Button } from '@mantine/core';
import IconArrowUp from '@/icons/icon-arrow-up.svg';
import classes from './UpvoteButton.module.css';

interface UpvoteButtonProps {
  // pressed?: boolean;
  upvotes: number;
}

export function UpvoteButton({ upvotes }: UpvoteButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Button
      classNames={{ root: classes.button, inner: classes.inner, label: classes.label }}
      aria-pressed={pressed}
      onClick={() => setPressed(!pressed)}
      leftSection={<IconArrowUp aria-hidden="true" className={classes.icon} />}
    >
      {upvotes}
    </Button>
  );
}
