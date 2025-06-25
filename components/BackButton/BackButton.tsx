import Link from 'next/link';
import { Anchor, AnchorProps } from '@mantine/core';
import IconArrowLeft from '@/icons/icon-arrow-left.svg';
import classes from './BackButton.module.css';

type BackButtonProps = AnchorProps & {
  href?: string;
  label?: string;
  variant?: string;
};

export function BackButton({ href = '/', label = 'Go Back', variant, ...props }: BackButtonProps) {
  return (
    <Anchor
      component={Link}
      href={href}
      underline="hover"
      className={classes.link}
      variant={variant}
      {...props}
    >
      <IconArrowLeft aria-hidden="true" />
      <span>{label}</span>
    </Anchor>
  );
}
