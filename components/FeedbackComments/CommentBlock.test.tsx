import { render, screen, userEvent } from '@/test-utils';
import { CommentBlock } from './CommentBlock';

describe('CommentBlock component', () => {
  const testComment = {
    id: 1,
    content: 'This is a test comment.',
    author: {
      name: 'Juan dela Cruz',
      username: 'thejuandelacruz',
      avatarUrl: '/juandelacruz.jpg',
    },
  };

  it('shows the comment text with the author name and username', () => {
    render(<CommentBlock comment={testComment} />);
    expect(screen.getByText(testComment.content)).toBeVisible();
    expect(screen.getByText(testComment.author.name)).toBeVisible();
    expect(screen.getByText(`@${testComment.author.username}`)).toBeVisible();
  });

  it('shows the avatar image if author has one, or their initials', () => {
    const { rerender } = render(<CommentBlock comment={testComment} />);
    expect(screen.getByRole('img', { name: testComment.author.name })).toBeVisible();

    const testCommentWithoutImage = {
      ...testComment,
      author: { ...testComment.author, avatarUrl: null },
    };
    rerender(<CommentBlock comment={testCommentWithoutImage} />);
    expect(screen.getByText('JD')).toBeVisible();
    expect(screen.getByText('JD')).toHaveAttribute('title', 'Juan dela Cruz');
  });

  it('has a Reply button that when clicked shows the reply form', async () => {
    render(<CommentBlock comment={testComment} />);
    const user = userEvent.setup();
    expect(screen.queryByRole('form')).toBeNull();
    await user.click(screen.getByRole('button', { name: /reply/i }));
    expect(screen.getByRole('form', { name: /reply/i })).toBeVisible();
  });
});
