import Image from 'next/image';
import { AddFeedbackButton } from '../AddFeedbackButton';
import classes from './EmptyState.module.css';

export function EmptyState() {
  return (
    <div className={classes.container}>
      <Image
        src="/illustration-empty.svg"
        alt=""
        width={102}
        height={108}
        className={classes.image}
      />
      <div className={classes.text}>
        <h3 className={classes.title}>There is no feedback yet.</h3>
        <p className={classes.description}>
          Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas
          to improve our app.
        </p>
        <AddFeedbackButton />
      </div>
    </div>
  );
}
