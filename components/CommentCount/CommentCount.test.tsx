import { render, screen } from '@/test-utils';
import { CommentCount } from './CommentCount';

describe('CommentCount component', () => {
  it('shows the number of comments', () => {
    render(<CommentCount value={2} />);
    expect(screen.getByText('2')).toBeVisible();
  });

  it('has a visually hidden label "comment/s" after the number', () => {
    const { rerender } = render(<CommentCount value={1} />);
    expect(screen.getByRole('figure')).toHaveAccessibleName(/1 comment/i);
    rerender(<CommentCount value={0} />);
    expect(screen.getByRole('figure')).toHaveAccessibleName(/0 comments/i);
  });
});
