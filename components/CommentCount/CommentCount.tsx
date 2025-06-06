import IconComments from '@/icons/icon-comments.svg';
import classes from './CommentCount.module.css';

interface CommentCountProps {
  value: number;
}

export function CommentCount({ value }: CommentCountProps) {
  return (
    <figure
      className={classes.container}
      aria-label={`${value} ${value === 1 ? 'comment' : 'comments'}`}
    >
      <IconComments aria-hidden="true" />
      <span className={classes.number} data-value={value} aria-hidden="true">
        {value}
      </span>
    </figure>
  );
}
