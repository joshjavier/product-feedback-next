import { forwardRef } from 'react';
import Link from 'next/link';
import { Box, BoxProps, createPolymorphicComponent, Title } from '@mantine/core';
import { CommentCount } from '../CommentCount';
import { UpvoteButton } from '../UpvoteButton';
import classes from './SuggestionCard.module.css';

interface SuggestionCardProps extends BoxProps {
  suggestion: {
    id: number;
    title: string;
    description: string;
    category: { name: string };
    _count: {
      upvotes: number;
      comments: number;
    };
  };
  withLink?: boolean;
}

export const SuggestionCard = createPolymorphicComponent<'div', SuggestionCardProps>(
  forwardRef<HTMLDivElement, SuggestionCardProps>(({ suggestion, withLink, ...others }, ref) => {
    return (
      <Box component="div" key={suggestion.id} className={classes.card} {...others} ref={ref}>
        <div className={classes.text}>
          <Title order={withLink ? 3 : 1} className={classes.title}>
            {withLink ? (
              <Link href={`/feedback/${suggestion.id}`}>{suggestion.title}</Link>
            ) : (
              suggestion.title
            )}
          </Title>
          <p className={classes.description}>{suggestion.description}</p>
          <p className={classes.category}>{suggestion.category.name}</p>
        </div>
        <div className={classes.counts}>
          <UpvoteButton upvotes={suggestion._count.upvotes} />
          <CommentCount value={suggestion._count.comments} />
        </div>
      </Box>
    );
  })
);
