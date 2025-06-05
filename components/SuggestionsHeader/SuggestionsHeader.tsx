import Link from 'next/link';
import { Button } from '@mantine/core';
import { SortSelect } from '../SortSelect';
import IconSuggestions from './icon-suggestions.svg';
import classes from './SuggestionsHeader.module.css';

interface SuggestionsHeaderProps {
  suggestionsCount: number;
}

export function SuggestionsHeader({ suggestionsCount }: SuggestionsHeaderProps) {
  return (
    <div className={classes.container}>
      <p className={`${classes.count} mantine-visible-from-sm`}>
        <IconSuggestions aria-hidden="true" />
        <span>
          {suggestionsCount} {suggestionsCount === 1 ? 'Suggestion' : 'Suggestions'}
        </span>
      </p>
      <SortSelect />
      <Button component={Link} href="/feedback/new" className={classes.button}>
        <span aria-hidden>+&nbsp;</span>Add Feedback
      </Button>
    </div>
  );
}
