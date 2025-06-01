import { CSSProperties, ReactNode } from 'react';
import classes from './TitleCard.module.css';

interface TitleCardProps {
  drawerToggle?: ReactNode;
  style?: CSSProperties;
}

export function TitleCard({ drawerToggle, style }: TitleCardProps) {
  return (
    <div className={classes.card} style={style}>
      <div className={classes.text}>
        <p>Frontend Mentor</p>
        <h1>Feedback Board</h1>
      </div>
      {drawerToggle}
    </div>
  );
}
