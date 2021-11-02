import { screen, render } from '@testing-library/react';
import axios from 'axios';

import App from './App';

jest.mock('axios');

describe('App', () => {
  it('fetches data from the database', async() => {
    const crews = {data:{result:[ { "_id": "616f7ceea703ecd4ec419645", "foreman_name": "Heddy Ready", "crew_size": 4, "is_active": true, "avatar": "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z", "__v": 0 }]}};
    const clients = {data:{result:[ { "_id": "616f7ceea703ecd4ec419646", "name": "Gregory Peck", "email": "regreg@peck.com", "phone": "403-552-9094", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z", "__v": 0 } ]}};
    const packages = {data:{result:[ { "_id": "616f7ceea703ecd4ec419647", "title": "Lawn Care Silver", "cost": 5000, "contract_length_days": 90, "visit_interval_days": 14, "man_hrs_per_visit": 4, "description": "3 Month, Biweekly: Mow, edge trim, blow off pathways", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z", "__v": 0 }]}};
    const contracts = {data:{result:[ { "_id": "61787c58efa37244e2c35c13", "client_id": "616f7ceea703ecd4ec419646", "address": "177 Mornersome Drive SW, Calgary AB", "job_notes": "There are no notes. Nothing to see here.", "package_id": "616f7ceea703ecd4ec419647", "start_date": "2021-10-28T06:00:00.000Z" } ]}};
    const jobs = {data:{result:[ { "_id": "61787d4cefa37244e2c35c14", "contract_id": "61787c58efa37244e2c35c13", "crew_id": "616f7ceea703ecd4ec419645", "date": "2021-10-28T06:00:00.000Z", "completed": false }]}};

    axios.get
    .mockImplementationOnce(() => Promise.resolve(crews))
    .mockImplementationOnce(() => Promise.resolve(clients))
    .mockImplementationOnce(() => Promise.resolve(packages))
    .mockImplementationOnce(() => Promise.resolve(contracts))
    .mockImplementationOnce(() => Promise.resolve(jobs));

    render(<App />);

    expect(screen.getByText(/Crew Launcher/)).toBeInTheDocument();
  
    expect(await screen.findByText(/616f7ceea703ecd4ec419645/)).not.toBe(null);

  });
  
});