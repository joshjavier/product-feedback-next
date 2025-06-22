import { render, screen, userEvent } from '@/test-utils';
import { FormSelect } from './FormSelect';

function renderComponent() {
  const options = ['Frontend', 'Backend', 'Fullstack'];
  render(
    <FormSelect
      label="Custom Select"
      description="This is a custom select component"
      options={options}
    />
  );
}

describe('FormSelect component', () => {
  it('has an accessible label and description', () => {
    renderComponent();
    expect(screen.getByRole('button')).toHaveAccessibleName(/custom select/i);
    expect(screen.getByRole('button')).toHaveAccessibleDescription(
      /this is a custom select component/i
    );
  });

  it('shows the default value inside a button', () => {
    renderComponent();
    expect(screen.getByRole('button')).toHaveTextContent(/frontend/i);
  });

  describe('when button is clicked', () => {
    it('shows a dropdown with the list of available options', async () => {
      const user = userEvent.setup();
      renderComponent();

      expect(screen.queryByRole('listbox')).toBeNull();

      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('listbox')).toBeVisible();
      expect(screen.getByRole('option', { name: /frontend/i })).toBeVisible();
      expect(screen.getByRole('option', { name: /backend/i })).toBeVisible();
      expect(screen.getByRole('option', { name: /fullstack/i })).toBeVisible();
    });

    it('indicates the selected option', async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('option', { selected: true })).toHaveAccessibleName(/frontend/i);
    });

    it('closes dropdown and updates button text when a different option is selected', async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: /backend/i }));

      expect(screen.queryByRole('listbox')).toBeNull();
      expect(screen.getByRole('button')).toHaveTextContent(/backend/i);
    });
  });
});
