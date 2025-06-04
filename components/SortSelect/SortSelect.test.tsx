import { render, screen, userEvent } from '@/test-utils';
import { SortSelect } from './SortSelect';

describe('SortSelect component', () => {
  it('is initially set to sort by most upvotes', () => {
    render(<SortSelect />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/sort by : most upvotes/i);
  });

  it('shows all sort options when clicked', async () => {
    const user = userEvent.setup();
    render(<SortSelect />);

    // Verify that dropdown is initially closed
    expect(screen.queryByRole('listbox')).toBeNull();

    // Click to toggle dropdown
    await user.click(screen.getByRole('button'));

    // Verify that dropdown is open
    expect(screen.getByRole('listbox')).toBeVisible();

    // Verify that all sort options are visible
    expect(screen.getByRole('option', { name: /most upvotes/i })).toBeVisible();
    expect(screen.getByRole('option', { name: /least upvotes/i })).toBeVisible();
    expect(screen.getByRole('option', { name: /most comments/i })).toBeVisible();
    expect(screen.getByRole('option', { name: /least comments/i })).toBeVisible();
  });

  it('shows the selected option to screenreaders', async () => {
    const user = userEvent.setup();
    render(<SortSelect />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('option', { selected: true })).toHaveTextContent(/most upvotes/i);
  });

  it('updates the button label when choosing a different sort option', async () => {
    const user = userEvent.setup();
    render(<SortSelect />);
    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(screen.getByRole('option', { name: /least upvotes/i }));
    expect(button).toHaveTextContent(/sort by : least upvotes/i);
  });
});
