import { Flex, Skeleton, Stack } from '@mantine/core';
import classes from './Skeleton.module.css';

function CommentBlockSkeleton() {
  return (
    <div>
      <Flex className={classes.header}>
        <Skeleton height={40} circle className={classes.avatar} />
        <Skeleton height={40} width="100%" maw={120} radius="sm" />
      </Flex>
      <Stack mt={17} gap={6} className={classes.body}>
        <Skeleton height={18} radius="xl" />
        <Skeleton height={18} radius="xl" />
        <Skeleton height={18} width="52%" radius="xl" />
      </Stack>
    </div>
  );
}

export function CommentBlocksSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Stack gap={65}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <CommentBlockSkeleton key={i} />
        ))}
    </Stack>
  );
}
