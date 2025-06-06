import Link from 'next/link';

interface SuggestionCardProps {
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
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  return (
    <li key={suggestion.id}>
      <p>
        <Link href={`/feedback/${suggestion.id}`}>{suggestion.title}</Link>
      </p>
      <p>{suggestion.description}</p>
      <p>{suggestion.category.name}</p>
      <p>{suggestion._count.upvotes}</p>
      <p>{suggestion._count.comments}</p>
    </li>
  );
}
