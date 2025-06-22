'use client';

import { Children, ReactNode, useState } from 'react';
import { Tabs } from '@mantine/core';
import classes from './KanbanBoard.module.css';

interface KanbanBoardWithTabsProps {
  children?: ReactNode;
  tabs: { value: string; label: string; color?: string }[];
}

export function KanbanBoardWithTabs({ tabs, children }: KanbanBoardWithTabsProps) {
  const [activeTab, setActiveTab] = useState<string | null>('planned');

  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      classNames={{
        list: classes.tablist,
        panel: classes.tabpanel,
        root: classes.tabroot,
        tab: classes.tab,
      }}
    >
      <Tabs.List grow>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value} color={tab.color}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {Children.map(children, (child, idx) => (
        <Tabs.Panel value={tabs[idx].value}>{child}</Tabs.Panel>
      ))}
    </Tabs>
  );
}
