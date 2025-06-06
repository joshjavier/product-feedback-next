'use client';

import { ReactNode } from 'react';
import { Burger, Drawer } from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { TitleCard } from '../TitleCard';
import classes from './SuggestionsNav.module.css';

interface ResponsiveNavWithDrawerProps {
  children: ReactNode;
}

export function ResponsiveNavWithDrawer({ children }: ResponsiveNavWithDrawerProps) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const { width } = useViewportSize();

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
