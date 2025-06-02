import { render, screen } from '@/test-utils';
import { Roadmap } from './Roadmap';

describe('Roadmap component', () => {
  const statusesWithCount = [
    { id: 1, name: 'One', _count: { requests: 1 } },
    { id: 2, name: 'Two', _count: { requests: 2 } },
    { id: 3, name: 'Three', _count: { requests: 3 } },
  ];

  it('has an accessible heading', () => {
    // Arrange
    render(<Roadmap statusesWithCount={statusesWithCount} />);

    // Act
    const heading = screen.getByRole('heading', { name: /roadmap/i });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('has a link to the roadmap page', () => {
    // Arrange
    render(<Roadmap statusesWithCount={statusesWithCount} />);

    // Act
    const link = screen.getByRole('link', { name: /view/i });

    // Assert
    expect(link).toHaveAttribute('href', '/roadmap');
  });

  it('has a list of categories with their corresponding feedback count', () => {
    // Arrange
    render(<Roadmap statusesWithCount={statusesWithCount} />);

    // Act
    const listItems = screen.getAllByRole('listitem');

    // Assert
    for (let i = 0; i < listItems.length; i++) {
      const { name, _count } = statusesWithCount[i];
      const statusWithCount = new RegExp(`${name} ${_count.requests}`, 'i');
      expect(listItems[i]).toHaveTextContent(statusWithCount);
    }
  });
});
