'use client';

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Flex, VisuallyHidden } from '@mantine/core';
import { CategoryPill } from './CategoryPill';
import classes from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categories: { id: number; name: string }[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const allQueryString = createQueryString('category', undefined);

  const options = [
    { id: 0, name: 'All', href: allQueryString ? `/?${allQueryString}` : '/' },
    ...categories.map((category) => ({
      ...category,
      href: `/?${createQueryString('category', category.name.toLowerCase().replace(/[^a-z]/g, ''))}`,
    })),
  ];

  return (
    <div className={classes.container}>
      <VisuallyHidden component="h2">Categories</VisuallyHidden>
      <Flex gap={14} wrap="wrap">
        {options.map((o) => (
          <CategoryPill
            key={o.id}
            label={o.name}
            href={o.href}
            active={
              o.name === 'All'
                ? !searchParams.has('category')
                : searchParams.has('category', o.name.toLowerCase().replace(/[^a-z]/g, ''))
            }
          />
        ))}
      </Flex>
    </div>
  );
}
