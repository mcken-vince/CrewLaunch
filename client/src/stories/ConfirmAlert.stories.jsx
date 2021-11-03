import ConfirmAlert from "../components/ConfirmAlert";

export default {
  title: 'Molecules/ConfirmAlert',
  component: ConfirmAlert
};

const Template = (args) => <ConfirmAlert {...args} />;

export const ConfirmEdit = Template.bind({});
ConfirmEdit.args = {
  onConfirm: () => alert('confirm'),
  onCancel: () => alert('cancel'),
  show: true,
  message: 'Edit this crew?'
};

export const ConfirmDelete = Template.bind({});
ConfirmDelete.args = {
  onConfirm: () => alert('confirm'),
  onCancel: () => alert('cancel'),
  show: true,
  message: 'Delete this crew?',
  variant: 'DELETE'
}