import { render, screen } from '@/test-utils';
import { SuggestionCard } from './SuggestionCard';

describe('SuggestionCard component', () => {
  const suggestion = {
    id: 1,
    title: 'Test suggestion',
    description: 'This is a test suggestion',
    category: { name: 'Feature' },
    _count: { upvotes: 0, comments: 0 },
  };

  it('shows the title, description, category, and comment counts', () => {
    render(<SuggestionCard suggestion={suggestion} />);
    expect(screen.getByRole('heading', { name: /test suggestion/i }));
    expect(screen.getByText(/this is a test suggestion/i));
    expect(screen.getByText('Feature'));
    expect(screen.getByRole('figure', { name: /0 comments/i }));
  });

  it('has a button that shows the upvote count', () => {
    render(<SuggestionCard suggestion={suggestion} />);
    expect(screen.getByRole('button')).toHaveTextContent('0');
  });
});
