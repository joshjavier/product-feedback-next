import Link from 'next/link';
import { Anchor } from '@mantine/core';
import IconArrowLeft from '@/icons/icon-arrow-left.svg';
import classes from './BackButton.module.css';

interface BackButtonProps {
  href?: string;
  variant?: string;
}

export function BackButton({ href = '/', variant }: BackButtonProps) {
  return (
    <Anchor
      component={Link}
      href={href}
      underline="hover"
      className={classes.link}
      variant={variant}
    >
      <IconArrowLeft aria-hidden="true" />
      <span>Go Back</span>
    </Anchor>
  );
}
