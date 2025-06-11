import Link from 'next/link';
import { Button } from '@mantine/core';
import classes from './AddFeedback.module.css';

export function AddFeedbackButton() {
  return (
    <Button component={Link} href="/feedback/new" className={classes.button}>
      <span aria-hidden>+&nbsp;</span>Add Feedback
    </Button>
  );
}
