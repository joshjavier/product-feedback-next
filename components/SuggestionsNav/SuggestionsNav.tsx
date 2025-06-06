import { CategoryFilter } from '../CategoryFilter';
import { Roadmap } from '../Roadmap';
import { ResponsiveNavWithDrawer } from './ResponsiveNavWithDrawer';

interface SuggestionsNavProps {
  categories: { id: number; name: string }[];
  statusesWithCount: { id: number; name: string; _count: { requests: number } }[];
}

export function SuggestionsNav({ categories, statusesWithCount }: SuggestionsNavProps) {
  return (
    <ResponsiveNavWithDrawer>
      <CategoryFilter categories={categories} />
      <Roadmap statusesWithCount={statusesWithCount} />
    </ResponsiveNavWithDrawer>
  );
}
