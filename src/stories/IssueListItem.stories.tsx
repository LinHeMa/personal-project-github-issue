import { ComponentStory, ComponentMeta } from "@storybook/react";
import IssueItem from "./IssueItem";

export default {
  title: "GithubIssue/IssueListItem",
  component: IssueItem,
  argTypes: {
    status: {
      options: ["open", "closed", "notPlaned"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof IssueItem>;

const Template: ComponentStory<typeof IssueItem> = (args) => (
  <IssueItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  status: "open",
};
