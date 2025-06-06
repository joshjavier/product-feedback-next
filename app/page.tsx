import { Container } from '@mantine/core';
import { SuggestionCard } from '@/components/SuggestionCard';
import { SuggestionsHeader } from '@/components/SuggestionsHeader';
import { SuggestionsNav } from '@/components/SuggestionsNav';
import { getDb } from '@/lib/db';
import classes from './page.module.css';

interface SuggestionsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SuggestionsPage({ searchParams }: SuggestionsPageProps) {
  const { category } = await searchParams;
  const db = getDb();
  const categories = await db.category.findMany();
  const statusesWithCount = await db.status.findMany({
    include: { _count: { select: { requests: true } } },
  });
  const suggestions = await db.feedbackRequest.findMany({
    where: {
      status: { name: 'Suggestion' },
      category:
        category && typeof category === 'string'
          ? { name: { equals: category, mode: 'insensitive' } }
          : undefined,
    },
    include: { category: true, _count: { select: { upvotes: true, comments: true } } },
    orderBy: { upvotes: { _count: 'desc' } },
  });

  return (
    <Container className={classes.container} size={1110}>
      <div className={classes.layout}>
        <div className={classes.aside}>
          <SuggestionsNav categories={categories} statusesWithCount={statusesWithCount.slice(1)} />
        </div>
        <div className={classes.main}>
          <SuggestionsHeader suggestionsCount={suggestions.length} />
          <div>
            <ul>
              {suggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
