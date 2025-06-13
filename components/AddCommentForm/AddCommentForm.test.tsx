import { render, screen, userEvent } from '@/test-utils';
import { AddCommentForm } from './AddCommentForm';

describe('AddCommentForm component', () => {
  it('has an accessible textbox and submit button', () => {
    render(<AddCommentForm />);
    expect(screen.getByRole('textbox', { name: /add comment/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /post comment/i })).toBeVisible();
  });

  it('shows the number of characters left', async () => {
    render(<AddCommentForm />);
    const user = userEvent.setup();

    expect(screen.getByText(/250 characters left/i)).toBeVisible();

    await user.type(screen.getByRole('textbox'), 'This is a string that has 40 characters.');

    expect(screen.getByText(/210 characters left/i)).toBeVisible();
  });

  it('prevents form submission if character limit is exceeded', async () => {
    render(<AddCommentForm />);
    const user = userEvent.setup();
    const stringWithMoreThan250Chars =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci ex, blandit eget suscipit id, rhoncus et velit. Morbi at mattis enim. Morbi porttitor, neque eget ullamcorper imperdiet, neque eros pulvinar justo, et bibendum erat orci sit amet aliquam.';
    await user.type(screen.getByRole('textbox'), stringWithMoreThan250Chars);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
