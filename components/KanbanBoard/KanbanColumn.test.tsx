import { render, screen } from '@/test-utils';
import { FeedbackForCard } from './KanbanBoard.types';
import { KanbanColumn } from './KanbanColumn';

function renderComponent(feedbackRequests: FeedbackForCard[]): void {
  render(
    <KanbanColumn
      title="Planned"
      description="Plan your work and work your plan"
      feedbackRequests={feedbackRequests}
    />
  );
}

describe('KanbanColumn component', () => {
  const feedbackRequests = [
    {
      id: 1,
      title: 'Test feedback 1',
      description: 'This is a test feedback',
      category: { name: 'Bug' },
      status: { name: 'Planned' },
      _count: { upvotes: 1, comments: 3 },
    },
    {
      id: 2,
      title: 'Test feedback 2',
      description: 'This is another test feedback',
      category: { name: 'UI' },
      status: { name: 'Planned' },
      _count: { upvotes: 4, comments: 7 },
    },
  ];

  it('has a title and description', () => {
    renderComponent(feedbackRequests);
    expect(screen.getByRole('heading', { name: /planned/i })).toBeVisible();
    expect(screen.getByText(/plan your work and work your plan/i)).toBeVisible();
  });

  it('shows the number of cards in the column', () => {
    renderComponent(feedbackRequests);
    expect(screen.getByText(/\(2\)/i)).toBeVisible();
  });

  it('renders cards as list items', () => {
    renderComponent(feedbackRequests);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it("doesn't render a <ul> tag when there are no cards", () => {
    renderComponent([]);
    expect(screen.queryByRole('list')).toBeNull();
  });
});
