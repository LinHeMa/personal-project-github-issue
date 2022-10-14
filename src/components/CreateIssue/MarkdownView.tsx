import {
  BoldIcon,
  CodeIcon,
  CrossReferenceIcon,
  HeadingIcon,
  ImageIcon,
  IssueClosedIcon,
  ItalicIcon,
  LinkIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  MentionIcon,
  QuoteIcon,
  ReplyIcon,
  TasklistIcon,
  TriangleDownIcon,
} from '@primer/octicons-react';
import avatar from '../../images/github_avatar.png';
import TextareaMarkdown, {
  TextareaMarkdownRef,
  CommandHandler,
} from 'textarea-markdown-editor';
import MDEditor from '@uiw/react-md-editor';
import TextareaAutosize from 'react-textarea-autosize';
import '../../utils/hooks/markdown.css';
import clsx from 'clsx';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MarkdownItem from './MarkdownItem';
import { useBoolean } from 'usehooks-ts';
import { Fragment, useRef } from 'react';
import { addBody, resetAll } from '../../feature/Label/createIssueSlice';
import BiFunctionButton from '../button/BiFunctionButton';
import Button from '../button/Button';
import { useCreateCommentMutation } from '../../sevices/api/issueApi';

type showOnMobileIcon = {
  button: JSX.Element;
  function: () => void;
};
type MarkdownIcon = {
  button: JSX.Element;
  function: () => void;
};

type MarkdownView = {
  hasInput: boolean;
  minHeight: string;
  commentPage?: boolean;
};
const MarkdownView = ({ hasInput, minHeight, commentPage }: MarkdownView) => {
  const nameInSessionStorage = JSON.parse(sessionStorage.getItem('user')!);
  const repoInSessionStorage = JSON.parse(sessionStorage.getItem('repo')!);
  const token = useAppSelector((state) => state.userInfoAction.token);
  const userImg = useAppSelector((state) => state.userInfoAction.avatar_url);
  const { value, setTrue, setFalse } = useBoolean(true);
  const textAreaRef = useRef<TextareaMarkdownRef>(null);
  const dispatch = useAppDispatch();
  const body = useAppSelector((state) => state.createIssueAction.body);

  const mentionCommandHandler: CommandHandler = ({ cursor }) => {
    const content = cursor.selection?.text;
    cursor.insert(` @${content}`);
  };
  const taskCommandHandler: CommandHandler = ({ cursor }) => {
    const content = cursor.selection?.text;
    const currentLine = cursor.position.line;
    const lineText = currentLine.text;
    if (content) return cursor.insert(` - [ ] ${content}`);
    cursor.replaceLine(currentLine.lineNumber, ` - [ ] ${lineText}`);
  };
  const [createComment] = useCreateCommentMutation();
  const showOnMobileIcon: showOnMobileIcon[] = [
    {
      button: <HeadingIcon key='HeadingIcon' />,
      function: () => textAreaRef.current?.trigger('h3'),
    },
    {
      button: <BoldIcon key='BoldIcon' />,
      function: () => textAreaRef.current?.trigger('bold'),
    },
    {
      button: <ItalicIcon key='ItalicIcon' />,
      function: () => textAreaRef.current?.trigger('italic'),
    },
    {
      button: <ListUnorderedIcon key='ListUnorderedIcon' />,
      function: () => textAreaRef.current?.trigger('unordered-list'),
    },
    {
      button: <ListOrderedIcon key='ListOrderedIcon' />,
      function: () => textAreaRef.current?.trigger('ordered-list'),
    },
    {
      button: <TasklistIcon key='TasklistIcon' />,
      function: () => textAreaRef.current?.trigger('task'),
    },
  ];
  const MarkdownIcon: MarkdownIcon[] = [
    {
      button: <HeadingIcon key='HeadingIcon' />,
      function: () => textAreaRef.current?.trigger('h3'),
    },
    {
      button: <BoldIcon key='BoldIcon' />,
      function: () => textAreaRef.current?.trigger('bold'),
    },
    {
      button: <ItalicIcon key='ItalicIcon' />,
      function: () => textAreaRef.current?.trigger('italic'),
    },
    {
      button: <QuoteIcon key='QuoteIcon' />,
      function: () => textAreaRef.current?.trigger('block-quotes'),
    },
    {
      button: <CodeIcon key='CodeIcon' />,
      function: () => textAreaRef.current?.trigger('code'),
    },
    {
      button: <LinkIcon key='LinkIcon' />,
      function: () => textAreaRef.current?.trigger('link'),
    },
    {
      button: <ListUnorderedIcon key='ListUnorderedIcon' />,
      function: () => textAreaRef.current?.trigger('unordered-list'),
    },
    {
      button: <ListOrderedIcon key='ListOrderedIcon' />,
      function: () => textAreaRef.current?.trigger('ordered-list'),
    },
    {
      button: <TasklistIcon key='TasklistIcon' />,
      function: () => textAreaRef.current?.trigger('task'),
    },
    {
      button: <MentionIcon key='MentionIcon' />,
      function: () => textAreaRef.current?.trigger('mention'),
    },
    {
      button: <ImageIcon key='ImageIcon' />,
      function: () => textAreaRef.current?.trigger('image'),
    },
    {
      button: <CrossReferenceIcon key='CrossReferenceIcon' />,
      function: () => {
        return;
      },
    },
    {
      button: <ReplyIcon key='ReplyIcon' />,
      function: () => {
        return;
      },
    },
  ];
  return (
    <>
      {!commentPage && (
        <img
          src={userImg || avatar}
          alt='profile picture'
          className=' mx-4 mt-4 hidden h-[40px] w-[40px] rounded-full md:block'
        />
      )}
      <div className='h-fit w-full rounded-xl border-solid border-stone-300 p-4 md:m-4 md:border md:p-8'>
        <MarkdownItem>
          {hasInput ? <MarkdownItem.Input /> : <></>}
          <div className='mt-8 mb-2 flex flex-col md:flex-row md:items-end md:justify-between'>
            <MarkdownItem.TabContainer>
              <MarkdownItem.Tab toggle={setTrue} currentView={value}>
                Write
              </MarkdownItem.Tab>
              <MarkdownItem.Tab toggle={setFalse} currentView={value}>
                Preview
              </MarkdownItem.Tab>
            </MarkdownItem.TabContainer>
            {value ? (
              <MarkdownItem.FunctionBar>
                <MarkdownItem.FunctionMobileToggle />
                <MarkdownItem.FunctionGroup>
                  {MarkdownIcon.map((icon, index) => (
                    <div
                      key={index}
                      onClick={icon.function}
                      className={clsx({
                        'hidden last:mr-0 md:block ': _.includes(
                          [0, 1, 2, 6, 7, 8],
                          index,
                        ),
                        'md:hidden': index === 10,
                        'mr-8 cursor-pointer last:mr-0': true,
                      })}
                    >
                      <MarkdownItem.FunctionItem key={index}>
                        {icon.button}
                      </MarkdownItem.FunctionItem>
                    </div>
                  ))}
                </MarkdownItem.FunctionGroup>
                <MarkdownItem.FunctionMobileToggleBar>
                  {showOnMobileIcon.map((icon, index) => (
                    <div
                      onClick={icon.function}
                      key={index}
                      className='mr-8 flex  md:hidden'
                    >
                      <MarkdownItem.FunctionItem>
                        {icon.button}
                      </MarkdownItem.FunctionItem>
                    </div>
                  ))}
                </MarkdownItem.FunctionMobileToggleBar>
              </MarkdownItem.FunctionBar>
            ) : (
              <></>
            )}
          </div>
          {value ? (
            <Fragment>
              <br />
              <TextareaMarkdown.Wrapper
                ref={textAreaRef}
                commands={[
                  {
                    name: 'code',
                    shortcut: ['command+/', 'ctrl+/'],
                    shortcutPreventDefault: true,
                  },
                  {
                    name: 'mention',
                    handler: mentionCommandHandler,
                  },
                  {
                    name: 'task',
                    handler: taskCommandHandler,
                  },
                ]}
              >
                <TextareaAutosize
                  className={`${
                    minHeight ? minHeight : 'min-h-[300px]'
                  } w-full resize-y whitespace-pre rounded-lg border border-solid border-stone-300 bg-[#F5F8FA] p-4 text-[14px] leading-normal `}
                  value={body}
                  onChange={(e) => dispatch(addBody(e.target.value))}
                />
              </TextareaMarkdown.Wrapper>
            </Fragment>
          ) : (
            <div data-color-mode='light' className='mt-8'>
              <div className='wmde-markdown-var'>
                <MDEditor.Markdown source={body} />
              </div>
            </div>
          )}
          {!commentPage ? (
            <div className=' mt-4 ml-auto hidden w-fit justify-end md:flex'>
              <MarkdownItem.Button>Sumbit new issue</MarkdownItem.Button>
            </div>
          ) : (
            <div className=' mt-4 ml-auto flex w-fit justify-end'>
              <BiFunctionButton
                icon={<IssueClosedIcon fill='#8250DF' />}
                text={`Closed with comment`}
                iconRight={<TriangleDownIcon />}
              />
              <Button
                fontSize='14px'
                text='Comment'
                bgColor='#2da44e'
                color='#ffffff'
                hoverColor='#2C974B'
                onClick={() => {
                  if (_.isEmpty(body)) return;
                  console.log({
                    name: nameInSessionStorage,
                    repo: repoInSessionStorage,
                    token,
                    body,
                  });
                  createComment({
                    name: nameInSessionStorage,
                    repo: repoInSessionStorage,
                    // TODO turn into variables
                    issueNumber: 58,
                    token,
                    body,
                  });
                  dispatch(resetAll());
                }}
              />
            </div>
          )}
        </MarkdownItem>
      </div>
    </>
  );
};

export default MarkdownView;
