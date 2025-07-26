import { EmptyState } from './EmptyState';
import { SuggestionCard } from './SuggestionCard';
import { Suggestion } from './types';
import classes from './SuggestionCard.module.css';

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className={classes.list}>
      {suggestions.map((suggestion) => (
        <SuggestionCard key={suggestion.id} suggestion={suggestion} component="li" withLink />
      ))}
    </ul>
  );
}
