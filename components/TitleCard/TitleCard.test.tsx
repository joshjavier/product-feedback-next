import { render, screen } from '@/test-utils';
import { TitleCard } from './TitleCard';

describe('TitleCard component', () => {
  it('shows the text "Frontend Mentor" and "Feedback Board"', () => {
    render(<TitleCard />);
    expect(screen.getByText('Frontend Mentor'));
    expect(screen.getByText('Feedback Board'));
  });
});
