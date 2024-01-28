import Input, { InputProps } from "../../../../components/atoms/Input";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Components/Atoms/Input",
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args: InputProps) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: "Nama Lengkap",
};
