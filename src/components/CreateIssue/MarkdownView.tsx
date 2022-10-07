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
import ReactMarkdown from 'react-markdown';
import MDEditor ,{ commands }from '@uiw/react-md-editor';
import '../../utils/hooks/markdown.css';
import remarkFootnotes from 'remark-footnotes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import avatar from '../../images/github_avatar.png';
import MarkdownItem from './MarkdownItem';
import { useBoolean } from 'usehooks-ts';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useRef } from 'react';
import {
  addBody,
  addBoldText,
  addCodeText,
  addHeadingText,
  addItliacText,
  addQuoteText,
  addTagText,
} from '../../feature/Label/createIssueSlice';
import { type } from '@testing-library/user-event/dist/type';

const textIcon: JSX.Element[] = [
  <HeadingIcon key='HeadingIcon' />,
  <BoldIcon key='BoldIcon' />,
  <ItalicIcon key='ItalicIcon' />,
  <ListUnorderedIcon key='ListUnorderedIcon' />,
  <ListOrderedIcon key='ListOrderedIcon' />,
  <TasklistIcon key='TasklistIcon' />,
];

type typesettingIcon = {
  button: JSX.Element;
  function: () => void;
};

const MarkdownView = () => {
  const { value, setTrue, setFalse } = useBoolean(true);
  const textAreaRef = useRef(null);
  const dispatch = useAppDispatch();
  const body = useAppSelector((state) => state.createIssueAction.body);
  const getSelectionHandler = () => {
    const selection = window.getSelection();
    if (!selection) {
      console.log('null');
    }
    console.log('Got selection', selection?.toString());
    return _.toString(selection);
  };
  const typesettingIcon: typesettingIcon[] = [
    {
      button: <HeadingIcon key='HeadingIcon' />,
      function: () => dispatch(addHeadingText(textAreaRef.current!)),
    },
    {
      button: <BoldIcon key='BoldIcon' />,
      function: () => dispatch(addBoldText(textAreaRef.current!)),
    },
    {
      button: <ItalicIcon key='ItalicIcon' />,
      function: () => dispatch(addItliacText(textAreaRef.current!)),
    },
    {
      button: <QuoteIcon key='QuoteIcon' />,
      function: () => dispatch(addQuoteText(textAreaRef.current!)),
    },
    {
      button: <CodeIcon key='CodeIcon' />,
      function: () => dispatch(addCodeText(textAreaRef.current!)),
    },
    {
      button: <LinkIcon key='LinkIcon' />,
      function: () => {
        return;
      },
    },
    {
      button: <ListUnorderedIcon key='ListUnorderedIcon' />,
      function: () => {
        return;
      },
    },
    {
      button: <ListOrderedIcon key='ListOrderedIcon' />,
      function: () => {
        return;
      },
    },
    {
      button: <TasklistIcon key='TasklistIcon' />,
      function: () => {
        return;
      },
    },
    {
      button: <MentionIcon key='MentionIcon' />,
      function: () => dispatch(addTagText(textAreaRef.current!)),
    },
    {
      button: <ImageIcon key='ImageIcon' />,
      function: () => {
        return;
      },
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
  const addHeadingTextFn = () => {
    getSelectionHandler();
    dispatch(addBoldText(textAreaRef.current!));
    // insert(textAreaRef.current!, '### ', '');
  };
  return (
    <>
      <img
        src={avatar}
        alt='profile picture'
        className=' mx-4 mt-4 hidden h-[40px] w-[40px] rounded-full md:block'
      />
      <div className='h-fit w-full rounded-xl border-solid border-stone-300 p-4 md:m-4 md:border md:p-8'>
        <MarkdownItem>
          <MarkdownItem.Input />
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
              <MarkdownItem.FunctionMobileToggle></MarkdownItem.FunctionMobileToggle>
              {/* <MarkdownItem.FunctionGroup>
                {typesettingIcon.map((icon, index) => (
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
              </MarkdownItem.FunctionGroup> */}
              <MarkdownItem.FunctionMobileToggleBar>
                {textIcon.map((icon, index) => (
                  <MarkdownItem.FunctionItem key={index}>
                    {icon}
                  </MarkdownItem.FunctionItem>
                ))}
              </MarkdownItem.FunctionMobileToggleBar>
            </MarkdownItem.FunctionBar>
          ) : (
            <></>
          )}
          {value ? (
            // <MarkdownItem.TextArea forwardedRef={textAreaRef} />
            <div  data-color-mode='light'>
              <div className='wmde-markdown-var'>
                <MDEditor
                  value={body}
                  onChange={(text) =>
                    text ? dispatch(addBody(text)) : dispatch(addBody(''))
                  }
                  
                />
              </div>
            </div>
          ) : (
            <div  data-color-mode='light'>
              <div className='wmde-markdown-var'>
                {/* <MDEditor
                  value={body}
                  onChange={(text) => text && dispatch(addBody(text))}
                /> */}

                <MDEditor.Markdown
                  source={body}
                />
              </div>
            </div>
            // <div className='prose min-h-[200px] p-8 text-left'>
            //   <ReactMarkdown
            //     remarkPlugins={[remarkGfm, remarkFootnotes]}
            //     components={{
            //       code({ node, inline, className, children, ...props }) {
            //         const match = /language-(\w+)/.exec(className || '');
            //         return !inline && match ? (
            //           <SyntaxHighlighter
            //             language={match[1]}
            //             style={dracula}
            //             PreTag='div'
            //             {...props}
            //           >
            //             {String(children).replace(/\n$/, '')}
            //           </SyntaxHighlighter>
            //         ) : (
            //           <div className='not-prose'>
            //             <code className='bg-[rgba(175,184,193,0.2)] p-2 text-red-400 font-mono rounded-md' {...props}>
            //               {children}
            //             </code>
            //           </div>
            //         );
            //       },
            //       // ...markdownStyle,
            //     }}
            //   >
            //     {body}
            //   </ReactMarkdown>
            // </div>
          )}
          <div className=' mt-4 flex justify-end'>
            <MarkdownItem.Button>Sumbit new issue</MarkdownItem.Button>
          </div>
        </MarkdownItem>
      </div>
    </>
  );
};

export default MarkdownView;
