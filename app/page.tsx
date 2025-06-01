import Link from 'next/link';
import { VisuallyHidden } from '@mantine/core';
import { getDb } from '@/lib/db';

export default async function SuggestionsPage() {
  const db = getDb();
  const categories = await db.category.findMany();
  const statusesWithCount = await db.status.findMany({
    include: { _count: { select: { requests: true } } },
  });
  const suggestions = await db.feedbackRequest.findMany({
    where: { status: { name: 'Suggestion' } },
    include: { category: true, _count: { select: { upvotes: true, comments: true } } },
    orderBy: { upvotes: { _count: 'desc' } },
  });

  return (
    <>
      <div>
        <p>Frontend Mentor</p>
        <h1>Feedback Board</h1>
      </div>
      <div>
        <VisuallyHidden>Categories</VisuallyHidden>
        <ul>
          <button type="button">All</button>
          {categories.map((category) => (
            <button key={category.id} type="button">
              {category.name}
            </button>
          ))}
        </ul>
      </div>
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
          <p>{statusesWithCount[0]._count.requests} Suggestions</p>
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
