import {
  ChevronDownIcon,
  ChevronUpIcon,
  TypographyIcon,
} from '@primer/octicons-react';
import _ from 'lodash';
import React, { createContext, Dispatch, useContext, useState } from 'react';

interface MarkdownContext {
  isPreview: string;
  markdownToggle: boolean;
  setIsPreview: Dispatch<React.SetStateAction<string>>;
  setMarkdownToggle: Dispatch<React.SetStateAction<boolean>>;
}

const MarkdownContext = createContext<MarkdownContext>({
  isPreview: '',
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
  const [isPreview, setIsPreview] = useState('');
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

const Input = () => {
  return (
    <div>
      <input
        type='text'
        placeholder='Title'
        className='w-full rounded-lg border border-solid border-stone-400 p-4'
      />
    </div>
  );
};

interface Tab {
  children: string;
}

interface TabContainer {
  children: JSX.Element[];
}

const TabContainer = ({ children }: TabContainer) => {
  return <div className='my-8 flex justify-between md:justify-start'>{children}</div>;
};

const Tab = ({ children }: Tab) => {
  const { isPreview, setIsPreview } = useContext(MarkdownContext);
  return (
    <div
      className={`flex flex-1 md:flex-none items-center justify-center border border-solid border-stone-300 p-8 md:p-6 md:rounded-t-lg text-[16px] ${
        isPreview === children ? ' bg-gray-200' : ''
      }`}
      onClick={() => {
        console.log(children);
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

MarkdownItem.Input = Input;
MarkdownItem.Tab = Tab;
MarkdownItem.TabContainer = TabContainer;
MarkdownItem.FunctionBar = FunctionBar;
MarkdownItem.FunctionGroup = FunctionGroup;
MarkdownItem.FunctionItem = FunctionItem;
MarkdownItem.FunctionMobileToggle = FunctionMobileToggle;
MarkdownItem.FunctionMobileToggleBar = FunctionMobileToggleBar;

export default MarkdownItem;
