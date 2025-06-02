import Link from 'next/link';
import { Anchor, Flex } from '@mantine/core';
import classes from './Roadmap.module.css';

interface RoadmapProps {
  statusesWithCount: { id: number; name: string; _count: { requests: number } }[];
}

export function Roadmap({ statusesWithCount }: RoadmapProps) {
  return (
    <div className={classes.container}>
      <Flex justify="space-between" align="center">
        <h2 className={classes.title}>Roadmap</h2>
        <Anchor component={Link} href="/roadmap" className={classes.link}>
          View
        </Anchor>
      </Flex>
      <ul className={classes.list}>
        {statusesWithCount.map((item) => (
          <li
            key={item.id}
            className={classes[`item-${item.name.toLowerCase().replace(/[^a-z]/g, '')}`]}
          >
            <Flex gap={16} align="center">
              <span>{item.name}</span> <strong>{item._count.requests}</strong>
            </Flex>
          </li>
        ))}
      </ul>
    </div>
  );
}
