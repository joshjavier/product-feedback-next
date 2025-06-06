import { AddFeedbackButton } from '../AddFeedbackButton';
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
      <AddFeedbackButton />
    </div>
  );
}
