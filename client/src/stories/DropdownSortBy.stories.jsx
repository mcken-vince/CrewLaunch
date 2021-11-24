import DropdownSortBy from "../components/DropdownSortBy";

export default {
  title: 'Molecules/DropdownSortBy',
  component: DropdownSortBy
};

const Template = (args) => <DropdownSortBy {...args} />;

export const JobSorter = Template.bind({});
JobSorter.args = {
  items: [
    { 
      name: 'Date',
      onClick: () => alert('hi')
    },
    { 
      name: 'A-Z', 
      onClick: () => alert('hi')
    },
    {
      name: 'Z-A',
      onClick: () => alert('hi')
    }
  ],
}