import { render, screen } from '@/test-utils';
import { SuggestionsHeader } from './SuggestionsHeader';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    replace: () => undefined,
  }),
}));

describe('SuggestionsHeader component', () => {
  it('shows the number of suggestions displayed', () => {
    const { rerender } = render(<SuggestionsHeader suggestionsCount={0} />);
    expect(screen.getByText(/0 suggestions/i)).toBeVisible();

    rerender(<SuggestionsHeader suggestionsCount={1} />);
    expect(screen.getByText(/1 suggestion/i)).toBeVisible();

    rerender(<SuggestionsHeader suggestionsCount={2} />);
    expect(screen.getByText(/2 suggestions/i)).toBeVisible();
  });

  it('shows how the suggestions are sorted', () => {
    render(<SuggestionsHeader suggestionsCount={0} />);
    expect(screen.getByRole('button', { name: /sort by : most upvotes/i })).toBeVisible();
  });

  it('has a link for adding a feedback', () => {
    render(<SuggestionsHeader suggestionsCount={0} />);
    expect(screen.getByRole('link', { name: /add feedback/i })).toHaveAttribute(
      'href',
      '/feedback/new'
    );
  });
});
