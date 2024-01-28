import { Meta, Story } from "@storybook/react";
import GameItems, {
  GameProps,
} from "../../../../components/molecules/GameItems";

export default {
  title: "Components/Molecules/GameItems",
  component: GameItems,
} as Meta;

const Template: Story<GameProps> = (args: GameProps) => <GameItems {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: "Mobile Legends",
  category: "Mobile",
  thumbnail: "/img/Thumbnail-1.png",
};
