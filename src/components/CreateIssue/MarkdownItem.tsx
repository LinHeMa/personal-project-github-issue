import {
  ChevronDownIcon,
  ChevronUpIcon,
  TypographyIcon,
} from '@primer/octicons-react';
import clsx from 'clsx';
import _ from 'lodash';
import React, {
  createContext,
  Dispatch,
  useContext,
  useRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addBody,
  addTitle,
  resetAll,
} from '../../feature/Label/createIssueSlice';
import ReactLoading from 'react-loading';
import { useCreateIssueMutation } from '../../sevices/api/issueApi';

interface MarkdownContext {
  isPreview: string;
  markdownToggle: boolean;
  setIsPreview: Dispatch<React.SetStateAction<string>>;
  setMarkdownToggle: Dispatch<React.SetStateAction<boolean>>;
}

const MarkdownContext = createContext<MarkdownContext>({
  isPreview: 'Write',
  setIsPreview: () => {
    return;
  },
  markdownToggle: false,
  setMarkdownToggle: () => {
    return;
  },
});

type MenuItemProps = {
  children: React.ReactElement[];
};

const MarkdownItem = (props: MenuItemProps) => {
  const [isPreview, setIsPreview] = useState('Write');
  const [markdownToggle, setMarkdownToggle] = useState(false);

  const providerValue: MarkdownContext = {
    isPreview,
    setIsPreview,
    markdownToggle,
    setMarkdownToggle,
  };
  return (
    <MarkdownContext.Provider value={providerValue}>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { isPreview, setIsPreview }),
      )}
    </MarkdownContext.Provider>
  );
};

interface Input {
  title?: string;
}

const Input = () => {
  const dispatch = useAppDispatch();
  const { title } = useAppSelector((state) => state.createIssueAction);
  const all = useAppSelector((state) => state.createIssueAction);
  return (
    <div>
      <input
        value={title}
        onChange={(e) => dispatch(addTitle(e.target.value))}
        type='text'
        placeholder='Title'
        className='w-full rounded-lg border border-solid border-stone-400 p-4'
      />
    </div>
  );
};

interface Tab {
  children: string;
  toggle: () => void;
  currentView: boolean;
}

interface TabContainer {
  children: JSX.Element[];
}

const TabContainer = ({ children }: TabContainer) => {
  return (
    <div className='my-8 flex justify-between md:justify-start'>{children}</div>
  );
};

const Tab = ({ children, toggle, currentView }: Tab) => {
  const { isPreview, setIsPreview } = useContext(MarkdownContext);
  return (
    <div
      className={`flex flex-1 cursor-pointer items-center justify-center border border-solid border-stone-300 p-8 text-[16px] md:flex-none md:rounded-t-lg md:p-6
      ${clsx({ ' bg-gray-200': isPreview === children })}
       `}
      onClick={() => {
        toggle();
        setIsPreview(children);
      }}
    >
      {children}
    </div>
  );
};

interface FunctionBar {
  children: JSX.Element[];
}
const FunctionBar = ({ children }: FunctionBar) => {
  return <div className='flex flex-wrap justify-between px-4'>{children}</div>;
};
interface FunctionGroup {
  children: JSX.Element[];
}

const FunctionGroup = ({ children }: FunctionGroup) => {
  return <div className='flex'>{children}</div>;
};

const FunctionMobileToggle = () => {
  const { markdownToggle, setMarkdownToggle } = useContext(MarkdownContext);
  return (
    <div
      onClick={() => {
        setMarkdownToggle(!markdownToggle);
      }}
      className='md:hidden'
    >
      <TypographyIcon />
      {markdownToggle ? <ChevronDownIcon /> : <ChevronUpIcon />}
    </div>
  );
};

const FunctionMobileToggleBar = ({ children }: FunctionGroup) => {
  const { markdownToggle } = useContext(MarkdownContext);
  return markdownToggle ? (
    <div className='mt-8 flex w-full md:hidden'>{children}</div>
  ) : (
    <></>
  );
};

interface FunctionItem {
  children: JSX.Element;
}

const FunctionItem = ({ children }: FunctionItem) => {
  return <div className={`mr-8 flex last:mr-0 `}>{children}</div>;
};

type TextArea = {
  forwardedRef: React.MutableRefObject<null>;
};

const TextArea = ({ forwardedRef }: TextArea) => {
  const dispatch = useAppDispatch();
  const { body } = useAppSelector((state) => state.createIssueAction);

  return (
    <textarea
      ref={forwardedRef}
      value={body}
      onChange={(e) => dispatch(addBody(e.target.value))}
      className='mt-8 min-h-[200px] w-full resize-y rounded-xl border border-solid border-stone-300 py-6 px-4 text-[14px] leading-normal'
      placeholder='Leave a comment'
    />
  );
};

interface Button {
  children: JSX.Element | string;
  text?: string;
}
const Button = ({ children }: Button) => {
  const { name, repo, ...body } = useAppSelector(
    (state) => state.createIssueAction,
  );
  const dispatch = useAppDispatch();
  const [createIssue, { isLoading }] = useCreateIssueMutation();
  return (
    <div
      onClick={() =>
        createIssue({ name, repo, body }).then(() => dispatch(resetAll()))
      }
      className={clsx({
        'flex w-fit cursor-pointer items-end justify-center	rounded-lg bg-[#2DA44E] p-4 font-[700] text-white':
          true,
      })}
    >
      {isLoading ? (
        <ReactLoading
          type={'bubbles'}
          color={'#ffffff'}
          width='24px'
          height='14px'
        />
      ) : (
        children
      )}
    </div>
  );
};

MarkdownItem.Input = Input;
MarkdownItem.Tab = Tab;
MarkdownItem.TabContainer = TabContainer;
MarkdownItem.FunctionBar = FunctionBar;
MarkdownItem.FunctionGroup = FunctionGroup;
MarkdownItem.FunctionItem = FunctionItem;
MarkdownItem.FunctionMobileToggle = FunctionMobileToggle;
MarkdownItem.FunctionMobileToggleBar = FunctionMobileToggleBar;
MarkdownItem.TextArea = TextArea;
MarkdownItem.Button = Button;

export default MarkdownItem;
