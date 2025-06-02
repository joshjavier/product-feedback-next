import Link from 'next/link';
import { Button } from '@mantine/core';
import IconSuggestions from './icon-suggestions.svg';
import classes from './SuggestionsHeader.module.css';

interface SuggestionsHeaderProps {
  suggestionsCount: number;
}

export function SuggestionsHeader({ suggestionsCount }: SuggestionsHeaderProps) {
  return (
    <div className={classes.container}>
      <p className={classes.count}>
        <IconSuggestions aria-hidden="true" />
        <span>
          {suggestionsCount} {suggestionsCount === 1 ? 'Suggestion' : 'Suggestions'}
        </span>
      </p>
      <Button component={Link} href="/feedback/new" className={classes.button}>
        <span aria-hidden>+&nbsp;</span>Add Feedback
      </Button>
    </div>
  );
}
