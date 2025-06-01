import Link from 'next/link';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TitleCard } from '@/components/TitleCard';
import { getDb } from '@/lib/db';

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
    <>
      <TitleCard />
      <CategoryFilter categories={categories} />
      <div>
        <h2>Roadmap</h2>
        <Link href="/roadmap">View</Link>
        <ul>
          {statusesWithCount.slice(1).map((item) => (
            <li key={item.id}>
              {item.name} - {item._count.requests}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <p>
            {suggestions.length} {suggestions.length === 1 ? 'Suggestion' : 'Suggestions'}
          </p>
          <Link href="/feedback/new">Add Feedback</Link>
        </div>
        <div>
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <p>
                  <Link href={`/feedback/${suggestion.id}`}>{suggestion.title}</Link>
                </p>
                <p>{suggestion.description}</p>
                <p>{suggestion.category.name}</p>
                <p>{suggestion._count.upvotes}</p>
                <p>{suggestion._count.comments}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
