import {
  ChevronDownIcon,
  ChevronUpIcon,
  TypographyIcon,
} from '@primer/octicons-react';
import clsx from 'clsx';
import _ from 'lodash';
import React, { createContext, Dispatch, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addBody,
  addTitle,
  resetAll,
} from '../../feature/Label/createIssueSlice';
import ReactLoading from 'react-loading';
import { useCreateIssueMutation } from '../../sevices/api/issueApi';
import { useNavigate } from 'react-router-dom';

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
  children: React.ReactElement[] | JSX.Element;
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
  return (
    <div>
      <input
        value={title}
        onChange={(e) => dispatch(addTitle(e.target.value))}
        type='text'
        placeholder='Title'
        className='w-full rounded-lg border border-solid border-stone-400 bg-[#F5F8FA] p-4 mb-3'
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
    <div className=' flex max-h-[40px] justify-between md:justify-start mb-4'>
      {children}
    </div>
  );
};

const Tab = ({ children, toggle }: Tab) => {
  const { isPreview, setIsPreview } = useContext(MarkdownContext);
  return (
    <div
      className={`flex flex-1 cursor-pointer items-center justify-center border border-solid border-stone-300 p-8 text-[16px] md:flex-none md:rounded-t-lg md:p-6 
      ${clsx({ ' border-b-1 bg-[#F6F8FA]': isPreview !== children })}
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
  return (
    <div className='flex w-full flex-wrap justify-between px-4 pb-[8px] lg:w-fit items-center'>
      {children}
    </div>
  );
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

type FunctionMobileToggleBar = {
  children: JSX.Element[];
};
const FunctionMobileToggleBar = ({ children }: FunctionMobileToggleBar) => {
  const { markdownToggle } = useContext(MarkdownContext);
  return markdownToggle ? (
    <div className='mt-0 flex w-full md:hidden'>{children}</div>
  ) : (
    <></>
  );
};

interface FunctionItem {
  children: JSX.Element;
}

const FunctionItem = ({ children }: FunctionItem) => {
  return <div className={`mr-[8px] flex last:mr-0 `}>{children}</div>;
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
      className='mt- min-h-[200px] w-full resize-y rounded-xl border border-solid border-stone-300 py-6 px-4 text-[14px] leading-normal'
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
  const token = useAppSelector((state) => state.userInfoAction.token);
  const dispatch = useAppDispatch();
  const [createIssue, { isLoading }] = useCreateIssueMutation();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        createIssue({
          name: JSON.parse(sessionStorage.getItem('user')!),
          repo: JSON.parse(sessionStorage.getItem('repo')!),
          body,
          token,
        })
          .then(() => dispatch(resetAll()))
          .then(() => navigate('/issuelist'));
      }}
      className={clsx({
        'flex w-full cursor-pointer items-end justify-center	rounded-lg bg-[#2DA44E] p-4 font-[700] text-white':
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
