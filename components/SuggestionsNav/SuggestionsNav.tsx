import { CategoryFilter } from '../CategoryFilter';
import { Roadmap } from '../Roadmap';
import { TitleCard } from '../TitleCard';

interface SuggestionsNavProps {
  categories: { id: number; name: string }[];
  statusesWithCount: { id: number; name: string; _count: { requests: number } }[];
}

export function SuggestionsNav({ categories, statusesWithCount }: SuggestionsNavProps) {
  return (
    <>
      <TitleCard />
      <CategoryFilter categories={categories} />
      <Roadmap statusesWithCount={statusesWithCount} />
    </>
  );
}
