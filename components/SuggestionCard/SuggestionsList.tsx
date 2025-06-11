import { EmptyState } from './EmptyState';
import { SuggestionCard } from './SuggestionCard';
import classes from './SuggestionCard.module.css';

interface SuggestionsListProps {
  suggestions: {
    id: number;
    title: string;
    description: string;
    category: { name: string };
    _count: {
      upvotes: number;
      comments: number;
    };
  }[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className={classes.list}>
      {suggestions.map((suggestion) => (
        <SuggestionCard key={suggestion.id} suggestion={suggestion} />
      ))}
    </ul>
  );
}
