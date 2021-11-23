import DispatchCalendar, { DispatchCalendarProps } from '../components/DispatchCalendar';
import { screen, render } from '@testing-library/react';
import { ICrew } from '../definitions';

const crews: ICrew[] = [ { "_id": "616f7ceea703ecd4ec419645", "foreman_name": "Heddy Ready", "crew_size": 4, "is_active": true, "avatar": "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" }];

const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentMonth: number = new Date().getMonth();
const currentYear: number = new Date().getFullYear();
const prevMonth: number = (currentMonth === 1) ? 11 : currentMonth - 1;
const prevMonthsYear: number = (prevMonth === 11) ? currentYear - 1 : currentYear;
const nextMonth: number = (currentMonth === 11) ? 0 : currentMonth + 1;
const nextMonthsYear: number = (nextMonth === 0) ? currentYear + 1 : currentYear;

const renderDispatchCalendar = (props: Partial<DispatchCalendarProps> = {}) => {
  const defaultProps = {
    crews
  };
  return render (
    <DispatchCalendar {...defaultProps} {...props} />
  );
};

describe('DispatchCalendar component', () => {
  it('renders without crashing and displays the current month and year by default', async () => {
    renderDispatchCalendar();
    expect(await screen.findByText(new RegExp(months[currentMonth]))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('switches to next month when clicking ">" button', async () => {
    renderDispatchCalendar();
    const nextButton = screen.getByText(/>/);
    nextButton.click();
    expect(await screen.findByText(new RegExp(months[nextMonth]))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(nextMonthsYear.toString()))).toBeInTheDocument();
  });

  it('switches to previous month when clicking "<" button', async () => {
    renderDispatchCalendar();
    const prevButton = screen.getByText(/</);
    prevButton.click();
    expect(await screen.findByText(new RegExp(months[prevMonth]))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(prevMonthsYear.toString()))).toBeInTheDocument();
  });

  it('switches back to current month when clicking "Today" button', async () => {
    renderDispatchCalendar();
    screen.getByText(/>/).click();
    expect(await screen.findByText(new RegExp(months[nextMonth]))).toBeInTheDocument();
    screen.getByText(/Today/i).click();
    expect(await screen.findByText(new RegExp(months[currentMonth]))).toBeInTheDocument();

  });
});

// needs a test to verify jobs are displayed when a day with jobs is clicked,
// and a day contains '0/0' if no jobs are booked