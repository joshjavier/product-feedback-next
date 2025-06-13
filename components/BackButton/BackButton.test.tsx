import { render, screen } from '@/test-utils';
import { BackButton } from './BackButton';

describe('BackButton component', () => {
  it('has a link role with an accessible name', () => {
    render(<BackButton />);
    expect(screen.getByRole('link')).toHaveAccessibleName(/go back/i);
  });

  it('goes to the homepage by default', () => {
    render(<BackButton />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('changes href attribute value when passed an href prop', () => {
    render(<BackButton href="/custom-href" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/custom-href');
  });
});
