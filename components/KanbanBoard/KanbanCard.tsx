import Link from 'next/link';
import { CommentCount } from '../CommentCount';
import { UpvoteButton } from '../UpvoteButton';
import { FeedbackForCard } from './KanbanBoard.types';
import classes from './KanbanCard.module.css';

interface KanbanCardProps {
  feedback: FeedbackForCard;
}

export function KanbanCard({ feedback }: KanbanCardProps) {
  return (
    <li
      className={`${classes.card} ${classes[`s-${feedback.status.name.toLowerCase().replace(/[^a-z]/g, '')}`]}`}
    >
      <p className={classes.status}>{feedback.status.name}</p>
      <h3 className={classes.title}>
        <Link href={`/feedback/${feedback.id}`}>{feedback.title}</Link>
      </h3>
      <p className={classes.description}>{feedback.description}</p>
      <p className={classes.category}>{feedback.category.name}</p>
      <div className={classes.counts}>
        <UpvoteButton upvotes={feedback._count.upvotes} orientation="horizontal" />
        <CommentCount value={feedback._count.comments} />
      </div>
    </li>
  );
}
