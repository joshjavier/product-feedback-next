import Image from 'next/image';
import Link from 'next/link';
import { Anchor, Container } from '@mantine/core';
import classes from './not-found.module.css';

export default function NotFound() {
  return (
    <Container size={540} className={classes.container}>
      <div className={classes.card}>
        <Image
          src="/illustration-empty.svg"
          alt=""
          width={102}
          height={108}
          className={classes.image}
        />
        <div className={classes.text}>
          <h2 className={classes.title}>Not Found</h2>
          <p className={classes.description}>Could not find the requested resource</p>
          <Anchor component={Link} href="/">
            Return Home
          </Anchor>
        </div>
      </div>
    </Container>
  );
}
