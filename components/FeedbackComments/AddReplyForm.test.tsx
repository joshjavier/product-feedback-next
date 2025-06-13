import { render, screen, userEvent } from '@/test-utils';
import { AddReplyForm } from './AddReplyForm';

describe('AddReplyForm component', () => {
  it('has an accessible textbox and submit button', () => {
    render(<AddReplyForm />);
    expect(screen.getByRole('textbox', { name: /add reply/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /post reply/i })).toBeVisible();
  });

  it('shows the number of excess characters', async () => {
    render(<AddReplyForm />);
    const user = userEvent.setup();
    const stringWithMoreThan250Chars =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci ex, blandit eget suscipit id, rhoncus et velit. Morbi at mattis enim. Morbi porttitor, neque eget ullamcorper imperdiet, neque eros pulvinar justo, et bibendum erat orci sit amet aliquam.';
    await user.type(screen.getByRole('textbox'), stringWithMoreThan250Chars);
    expect(screen.getByText(/-5/i)).toBeVisible();
  }, 10000);

  it('prevents form submission if character limit is exceeded', async () => {
    render(<AddReplyForm />);
    const user = userEvent.setup();
    const stringWithMoreThan250Chars =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci ex, blandit eget suscipit id, rhoncus et velit. Morbi at mattis enim. Morbi porttitor, neque eget ullamcorper imperdiet, neque eros pulvinar justo, et bibendum erat orci sit amet aliquam.';
    await user.type(screen.getByRole('textbox'), stringWithMoreThan250Chars);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
