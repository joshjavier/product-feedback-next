import { memo } from 'react';
import Link from 'next/link';
import { NavLink } from '@mantine/core';
import classes from './CategoryPill.module.css';

interface CategoryPillProps {
  label: string;
  href: string;
  active?: boolean;
}

export const CategoryPill = memo(({ href, label, active }: CategoryPillProps) => {
  return (
    <NavLink className={classes.pill} component={Link} label={label} href={href} active={active} />
  );
});
