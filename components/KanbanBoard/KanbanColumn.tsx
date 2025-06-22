import { FeedbackForCard } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';
import classes from './KanbanBoard.module.css';

interface KanbanColumnProps {
  title: string;
  description: string;
  feedbackRequests: FeedbackForCard[];
}

export function KanbanColumn({ title, description, feedbackRequests }: KanbanColumnProps) {
  return (
    <div className={classes.column}>
      <h2 className={classes.title}>
        {title} ({feedbackRequests.length})
      </h2>
      <p className={classes.description}>{description}</p>
      {feedbackRequests.length > 0 && (
        <ul className={classes.list}>
          {feedbackRequests.map((feedback) => (
            <KanbanCard key={feedback.id} feedback={feedback} />
          ))}
        </ul>
      )}
    </div>
  );
}
