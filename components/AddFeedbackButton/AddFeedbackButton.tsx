import Link from 'next/link';
import { Button } from '@mantine/core';

export function AddFeedbackButton() {
  return (
    <Button component={Link} href="/feedback/new" variant="primary">
      <span aria-hidden>+&nbsp;</span>Add Feedback
    </Button>
  );
}
