import classes from './TitleCard.module.css';

export function TitleCard() {
  return (
    <div className={classes.card}>
      <div className={classes.text}>
        <p>Frontend Mentor</p>
        <h1>Feedback Board</h1>
      </div>
    </div>
  );
}
