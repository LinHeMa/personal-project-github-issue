import {
  BoldIcon,
  CodeIcon,
  CrossReferenceIcon,
  HeadingIcon,
  ImageIcon,
  IssueClosedIcon,
  IssueReopenedIcon,
  ItalicIcon,
  LinkIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  MentionIcon,
  QuoteIcon,
  ReplyIcon,
  SkipIcon,
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
import {
  addBody,
  addState,
  resetAll,
} from '../../feature/Label/createIssueSlice';
import BiFunctionButton from '../button/BiFunctionButton';
import Button from '../button/Button';
import {
  useCompleteIssueMutation,
  useCreateCommentMutation,
  useNotPlannedIssueMutation,
  useReopenIssueMutation,
  useUpdateACommentMutation,
  useUpdateIssueMutation,
} from '../../sevices/api/issueApi';
import {
  editCommentBody,
  removeAnEditingComment,
  resetNewComment,
} from '../../feature/updateIssueSlice';
import ControlIssueFlyout from '../NewIssue/ControlIssueFlyout';
import useOnClickOutside from '../../utils/hooks/useOnClidkOutside';

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
  editComment?: boolean;
  editCommentId?: number;
};
const MarkdownView = ({
  hasInput,
  minHeight,
  commentPage,
  editComment,
  editCommentId,
}: MarkdownView) => {
  const nameInSessionStorage = JSON.parse(sessionStorage.getItem('user')!);
  const repoInSessionStorage = JSON.parse(sessionStorage.getItem('repo')!);
  const token = useAppSelector((state) => state.userInfoAction.token);
  const userImg = useAppSelector((state) => state.userInfoAction.avatar_url);
  const { value, setTrue, setFalse } = useBoolean(true);
  const {
    value: closeFlyoutState,
    setTrue: openFlyout,
    setFalse: closeFlyout,
  } = useBoolean(false);
  const flyoutRef = useRef(null);
  useOnClickOutside(flyoutRef, () => {
    closeFlyout();
  });
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
  const editingComments = useAppSelector((state) => state.updateIssueAction);
  console.log(editingComments);
  const [updateAComment] = useUpdateACommentMutation();

  const updateIssueArray = useAppSelector((state) => state.updateIssueAction);
  const commentBody = _.find(updateIssueArray, { id: 0 })?.body;
  console.log('update', commentBody);
  const { name, repo, ...stateBody } = useAppSelector(
    (state) => state.createIssueAction,
  );
  console.log('body', stateBody);
  const issueState = useAppSelector((state) => state.createIssueAction.state);
  const issueStateReason = useAppSelector(
    (state) => state.createIssueAction.stateReason,
  );
  const issueStateBtnChanged = useAppSelector(
    (state) => state.createIssueAction.buttonNow,
  );
  const [updateIssue] = useUpdateIssueMutation();
  const [completeIssue] = useCompleteIssueMutation();
  const [closeIssueAsNotPlanned] = useNotPlannedIssueMutation();
  const [reopenIssue] = useReopenIssueMutation();
  return (
    <>
      {!(commentPage || editComment) && (
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
                  value={
                    editComment
                      ? _.find(editingComments, { id: editCommentId })?.body
                      : commentPage
                      ? _.find(editingComments, { id: 0 })?.body
                      : body
                  }
                  onChange={(e) => {
                    if (editComment)
                      return dispatch(
                        editCommentBody({
                          id: editCommentId!,
                          body: e.target.value,
                        }),
                      );
                    if (commentPage)
                      return dispatch(
                        editCommentBody({
                          id: 0,
                          body: e.target.value,
                        }),
                      );
                    dispatch(addBody(e.target.value));
                  }}
                />
              </TextareaMarkdown.Wrapper>
            </Fragment>
          ) : (
            <div data-color-mode='light' className='mt-8'>
              <div className='wmde-markdown-var'>
                <MDEditor.Markdown
                  style={{ whiteSpace: 'pre-wrap' }}
                  source={
                    editComment
                      ? _.find(editingComments, { id: editCommentId })?.body
                      : commentPage
                      ? _.find(editingComments, { id: 0 })?.body
                      : body
                  }
                />
              </div>
            </div>
          )}
          {commentPage ? (
            <div className=' mt-4 ml-auto flex w-fit cursor-pointer justify-end'>
              <div className='mr-6 flex'>
                <div
                  className='rounded-l-lg border border-solid border-stone-300 bg-[#f6f8fa] py-[5px] px-[16px] text-[14px] leading-[20px]'
                  onClick={() => {
                    if (issueStateBtnChanged === 'reopen') {
                      reopenIssue({
                        name: nameInSessionStorage,
                        repo: repoInSessionStorage,
                        token: token,
                        body: stateBody,
                        issueNumber: 58,
                      });
                    } else if (issueStateBtnChanged === 'completed') {
                      completeIssue({
                        name: nameInSessionStorage,
                        repo: repoInSessionStorage,
                        token: token,
                        body: stateBody,
                        issueNumber: 58,
                      });
                    } else if (issueStateBtnChanged === 'not_planned') {
                      closeIssueAsNotPlanned({
                        name: nameInSessionStorage,
                        repo: repoInSessionStorage,
                        token: token,
                        body: stateBody,
                        issueNumber: 58,
                      });
                    }
                  }}
                >
                  <span className='mr-2'>
                    {issueStateBtnChanged === 'reopen' ? (
                      <IssueReopenedIcon fill='#1A7F38' />
                    ) : issueStateBtnChanged === 'not_planned' ? (
                      <SkipIcon fill='#818890' />
                    ) : (
                      <IssueClosedIcon fill='#8250DF' />
                    )}
                  </span>
                  {issueStateBtnChanged === 'reopen'
                    ? 'Reopen'
                    : issueStateBtnChanged === 'not_planned'
                    ? commentBody
                      ? 'Close with comment'
                      : 'Close as not planned'
                    : commentBody
                    ? 'Close with comment'
                    : 'Close issue'}
                </div>
                <div className='rounded-r-lg border border-l-0 border-solid border-stone-300 bg-[#f6f8fa] py-[5px] px-[9px] text-[14px] leading-[20px]'>
                  <span
                    ref={flyoutRef}
                    className='relative'
                    onClick={(e) => {
                      if (closeFlyoutState) return;
                      openFlyout();
                      e.stopPropagation();
                    }}
                  >
                    <TriangleDownIcon />
                    {closeFlyoutState && (
                      <ControlIssueFlyout closeFlyout={closeFlyout} />
                    )}
                  </span>
                </div>
              </div>

              <Button
                fontSize='14px'
                text='Comment'
                bgColor='#2da44e'
                color='#ffffff'
                hoverColor='#2C974B'
                onClick={() => {
                  createComment({
                    name: nameInSessionStorage,
                    repo: repoInSessionStorage,
                    // TODO turn into variables
                    issueNumber: 58,
                    token,
                    body: _.find(editingComments, { id: 0 })?.body,
                  }).then(() => dispatch(resetNewComment()));
                }}
              />
            </div>
          ) : editComment ? (
            <div className=' mt-4 ml-auto flex w-fit justify-end'>
              <Button
                fontSize='14px'
                text='Cancel'
                bgColor='#f6f8fa'
                color='#cf222e'
                hoverTextColor='#fff'
                hoverColor='#A40E26'
                onClick={() => {
                  dispatch(removeAnEditingComment(editCommentId!));
                }}
              />
              <Button
                fontSize='14px'
                text='Comment'
                bgColor='#2da44e'
                color='#ffffff'
                hoverColor='#2C974B'
                onClick={() => {
                  updateAComment({
                    name: nameInSessionStorage,
                    repo: repoInSessionStorage,
                    // TODO turn into variables
                    commentId: editCommentId,
                    token,
                    body: _.find(editingComments, { id: editCommentId })?.body,
                  }).then(() =>
                    dispatch(removeAnEditingComment(editCommentId!)),
                  );
                }}
              />
            </div>
          ) : (
            <div className=' mt-4 ml-auto hidden w-fit justify-end md:flex'>
              <MarkdownItem.Button>Sumbit new issue</MarkdownItem.Button>
            </div>
          )}
        </MarkdownItem>
      </div>
    </>
  );
};

export default MarkdownView;
