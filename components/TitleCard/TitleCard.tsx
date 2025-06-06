import { ReactNode } from 'react';
import classes from './TitleCard.module.css';

interface TitleCardProps {
  drawerToggle?: ReactNode;
}

export function TitleCard({ drawerToggle }: TitleCardProps) {
  return (
    <div className={classes.card}>
      <div className={classes.text}>
        <p>Frontend Mentor</p>
        <h1>Feedback Board</h1>
      </div>
      {drawerToggle}
    </div>
  );
}
