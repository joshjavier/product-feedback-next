import { render, screen } from '@/test-utils';
import { UpvoteButton } from './UpvoteButton';

describe('UpvoteButton component', () => {
  it('has a button role with an accessible name', () => {
    render(<UpvoteButton upvotes={0} />);
    expect(screen.getByRole('button')).toHaveAccessibleName(/upvote feedback/i);
  });

  it('has an accessible description with the number of upvotes', () => {
    const { rerender } = render(<UpvoteButton upvotes={0} />);
    expect(screen.getByRole('button')).toHaveAccessibleDescription(/0 upvotes/i);
    rerender(<UpvoteButton upvotes={1} />);
    expect(screen.getByRole('button')).toHaveAccessibleDescription(/1 upvote/i);
    rerender(<UpvoteButton upvotes={2} />);
    expect(screen.getByRole('button')).toHaveAccessibleDescription(/2 upvotes/i);
  });
});
