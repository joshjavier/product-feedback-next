'use client';

import { Burger, Drawer } from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { CategoryFilter } from '../CategoryFilter';
import { Roadmap } from '../Roadmap';
import { TitleCard } from '../TitleCard';
import classes from './SuggestionsNav.module.css';

interface SuggestionsNavProps {
  categories: { id: number; name: string }[];
  statusesWithCount: { id: number; name: string; _count: { requests: number } }[];
}

export function SuggestionsNav({ categories, statusesWithCount }: SuggestionsNavProps) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const { width } = useViewportSize();

  return (
    <>
      <TitleCard
        drawerToggle={
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" hiddenFrom="sm" />
        }
      />
      {width < 768 ? (
        <Drawer
          opened={opened}
          onClose={close}
          title="Navigation"
          position="right"
          withCloseButton={false}
          classNames={{ inner: classes.inner, overlay: classes.overlay }}
        >
          <CategoryFilter categories={categories} />
          <Roadmap statusesWithCount={statusesWithCount} />
        </Drawer>
      ) : (
        <>
          <CategoryFilter categories={categories} />
          <Roadmap statusesWithCount={statusesWithCount} />
        </>
      )}
    </>
  );
}
