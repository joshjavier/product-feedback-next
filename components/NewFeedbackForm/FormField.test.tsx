import { render, screen, userEvent } from '@/test-utils';
import { FormField } from './FormField';

describe('FormField component', () => {
  it('renders a text field when `kind=text`', () => {
    render(<FormField kind="text" label="Text Field" description="This is a text field" />);
    const textField = screen.getByRole('textbox');
    expect(textField).toBeInstanceOf(HTMLInputElement);
    expect(textField).toHaveAccessibleName(/text field/i);
    expect(textField).toHaveAccessibleDescription(/this is a text field/i);
  });

  it('renders a textarea when `kind=textarea', () => {
    render(
      <FormField kind="textarea" label="Textarea Field" description="This is a textarea field" />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInstanceOf(HTMLTextAreaElement);
    expect(textarea).toHaveAccessibleName(/textarea field/i);
    expect(textarea).toHaveAccessibleDescription(/this is a textarea field/i);
  });

  it('renders a custom select component when `kind=select`', async () => {
    const user = userEvent.setup();
    render(
      <FormField
        kind="select"
        label="Select Field"
        description="This is a select field"
        options={['Peter 1', 'Peter 2', 'Peter 3']}
      />
    );
    const toggleBtn = screen.getByRole('button');
    expect(toggleBtn).toHaveAccessibleName(/select field/i);
    expect(toggleBtn).toHaveAccessibleDescription(/this is a select field/i);
    expect(toggleBtn).toHaveTextContent(/peter 1/i);

    await user.click(toggleBtn);
    expect(screen.getByRole('listbox')).toBeVisible();
  });
});
