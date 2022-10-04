import {
  BoldIcon,
  CodeIcon,
  CrossReferenceIcon,
  HeadingIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  MentionIcon,
  QuoteIcon,
  ReplyIcon,
  TasklistIcon,
} from '@primer/octicons-react';
import _ from 'lodash';
import avatar from '../../images/github_avatar.png';
import MarkdownItem from './MarkdownItem';

const textIcon: JSX.Element[] = [
  <HeadingIcon key='HeadingIcon' />,
  <BoldIcon key='BoldIcon' />,
  <ItalicIcon key='ItalicIcon' />,
  <ListUnorderedIcon key='ListUnorderedIcon' />,
  <ListOrderedIcon key='ListOrderedIcon' />,
  <TasklistIcon key='TasklistIcon' />,
];

const typesettingIcon: JSX.Element[] = [
  <HeadingIcon key='HeadingIcon' />,
  <BoldIcon key='BoldIcon' />,
  <ItalicIcon key='ItalicIcon' />,
  <QuoteIcon key='QuoteIcon' />,
  <CodeIcon key='CodeIcon' />,
  <LinkIcon key='LinkIcon' />,
  <ListUnorderedIcon key='ListUnorderedIcon' />,
  <ListOrderedIcon key='ListOrderedIcon' />,
  <TasklistIcon key='TasklistIcon' />,
  <MentionIcon key='MentionIcon' />,
  <ImageIcon key='ImageIcon' />,
  <CrossReferenceIcon key='CrossReferenceIcon' />,
  <ReplyIcon key='ReplyIcon' />,
];

const MarkdownView = () => {
  return (
    <>
      <img src={avatar} alt='profile picture' className=' w-[40px] h-[40px] rounded-full mt-4 mx-4'/>
      <div className='m-4 w-full rounded-xl border border-solid border-stone-300 p-8'>
        <MarkdownItem>
          <MarkdownItem.Input />
          <MarkdownItem.TabContainer>
            <MarkdownItem.Tab>Write</MarkdownItem.Tab>
            <MarkdownItem.Tab>Preview</MarkdownItem.Tab>
          </MarkdownItem.TabContainer>
          <MarkdownItem.FunctionBar>
            <MarkdownItem.FunctionMobileToggle></MarkdownItem.FunctionMobileToggle>
            <MarkdownItem.FunctionGroup>
              {typesettingIcon.map((icon, index) => (
                <div
                  key={index}
                  className={
                    _.includes([0, 1, 2, 6, 7, 8], index)
                      ? 'mr-8 hidden last:mr-0 md:block'
                      : index === 10
                      ? 'mr-8 md:hidden'
                      : 'mr-8 last:mr-0'
                  }
                >
                  <MarkdownItem.FunctionItem key={index}>
                    {icon}
                  </MarkdownItem.FunctionItem>
                </div>
              ))}
            </MarkdownItem.FunctionGroup>
            <MarkdownItem.FunctionMobileToggleBar>
              {textIcon.map((icon, index) => (
                <MarkdownItem.FunctionItem key={index}>
                  {icon}
                </MarkdownItem.FunctionItem>
              ))}
            </MarkdownItem.FunctionMobileToggleBar>
          </MarkdownItem.FunctionBar>
        </MarkdownItem>
      </div>
    </>
  );
};

export default MarkdownView;
