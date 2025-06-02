import { render, screen } from '@/test-utils';
import { CategoryFilter } from './CategoryFilter';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

describe('CategoryFilter component', () => {
  const categories = [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
  ];

  it('has an accessible heading', () => {
    // Arrange
    render(<CategoryFilter categories={categories} />);

    // Act
    const heading = screen.getByRole('heading', { name: /categories/i });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('has an All filter that clears the category filter', () => {
    // Arrange
    render(<CategoryFilter categories={categories} />);

    // Act
    const allFilter = screen.getByRole('link', { name: /all/i });

    // Assert
    expect(allFilter).toHaveAttribute('href', expect.not.stringContaining('category'));
  });

  it('renders the correct number of categories plus the All filter', () => {
    // Arrange
    render(<CategoryFilter categories={categories} />);

    // Act
    const links = screen.getAllByRole('link');

    // Assert
    expect(links.length).toEqual(categories.length + 1);
  });

  it('has links that add a "category" query parameter with the corresponding category as value', () => {
    // Arrange
    render(<CategoryFilter categories={categories} />);

    // Act
    const links = screen.getAllByRole('link');
    links.shift(); // remove the All filter

    // Assert
    for (let i = 0; i < links.length; i++) {
      expect(links[i]).toHaveAttribute(
        'href',
        expect.stringContaining(`category=${categories[i].name.toLowerCase()}`)
      );
    }
  });
});
