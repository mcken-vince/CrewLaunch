import DispatchCalendar from '../components/DispatchCalendar';
import { screen, render } from '@testing-library/react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

describe('DispatchCalendar component', () => {
  it('should display the current month and year', async () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    render(<DispatchCalendar />);
    
    expect(await screen.findByText(`${months[currentMonth]} ${currentYear}`)).toBeInTheDocument();
  });
});