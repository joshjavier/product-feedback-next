import { render, screen } from '@/test-utils';
import { KanbanCard } from './KanbanCard';

describe('KanbanCard component', () => {
  const feedback = {
    id: 1,
    title: 'Test feedback',
    description: 'This is a test feedback',
    category: { name: 'Enhancement' },
    status: { name: 'In-Progress' },
    _count: { upvotes: 12, comments: 13 },
  };

  it('shows feedback title, description, category, status, and comment count', () => {
    render(<KanbanCard feedback={feedback} />);
    expect(screen.getByRole('heading', { name: /test feedback/i })).toBeVisible();
    expect(screen.getByText(/this is a test feedback/i)).toBeVisible();
    expect(screen.getByText('Enhancement')).toBeVisible();
    expect(screen.getByText('In-Progress')).toBeVisible();
    expect(screen.getByRole('figure', { name: /13 comments/i })).toBeVisible();
  });

  it('has a button that shows the upvote count', () => {
    render(<KanbanCard feedback={feedback} />);
    expect(screen.getByRole('button')).toHaveTextContent('12');
  });
});
