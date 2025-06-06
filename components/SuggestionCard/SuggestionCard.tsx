import Link from 'next/link';
import { CommentCount } from '../CommentCount';
import { UpvoteButton } from '../UpvoteButton';
import classes from './SuggestionCard.module.css';

interface SuggestionCardProps {
  suggestion: {
    id: number;
    title: string;
    description: string;
    category: { name: string };
    _count: {
      upvotes: number;
      comments: number;
    };
  };
  withLink?: boolean;
}

export function SuggestionCard({ suggestion, withLink }: SuggestionCardProps) {
  return (
    <li key={suggestion.id} className={classes.card}>
      <div className={classes.text}>
        <h3 className={classes.title}>
          {withLink ? (
            <Link href={`/feedback/${suggestion.id}`}>{suggestion.title}</Link>
          ) : (
            suggestion.title
          )}
        </h3>
        <p className={classes.description}>{suggestion.description}</p>
        <p className={classes.category}>{suggestion.category.name}</p>
      </div>
      <div className={classes.counts}>
        <UpvoteButton upvotes={suggestion._count.upvotes} />
        <CommentCount value={suggestion._count.comments} />
      </div>
    </li>
  );
}
