'use client';

import { ReactNode } from 'react';
import { Burger, Drawer } from '@mantine/core';
import { useDisclosure, useHeadroom, useViewportSize } from '@mantine/hooks';
import { TitleCard } from '../TitleCard';
import classes from './SuggestionsNav.module.css';

interface ResponsiveNavWithDrawerProps {
  children: ReactNode;
}

export function ResponsiveNavWithDrawer({ children }: ResponsiveNavWithDrawerProps) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const { width } = useViewportSize();
  const pinned = useHeadroom({ fixedAt: 99 });

  return (
    <>
      <TitleCard
        drawerToggle={
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
            hiddenFrom="sm"
            color="white"
            className={classes.burger}
          />
        }
        style={{
          transform: `translate3d(0, ${width > 768 ? 0 : pinned ? 0 : '-110px'}, 0)`,
          transition: 'transform 400ms ease',
        }}
      />
      {width < 768 ? (
        <Drawer
          opened={opened}
          onClose={close}
          aria-label="Navigation"
          position="right"
          withCloseButton={false}
          classNames={{
            inner: classes.inner,
            overlay: classes.overlay,
            body: classes.body,
            content: classes.content,
          }}
        >
          {children}
        </Drawer>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
