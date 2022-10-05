import { CheckIcon, GearIcon, XIcon } from '@primer/octicons-react';
import React, { createContext, Dispatch, useContext, useState } from 'react';
import avatar from '../../images/github_avatar.png';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';

interface MenuItemContext {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}
const MenuItemContext = createContext<MenuItemContext>({
  isOpen: false,
  setIsOpen: () => {
    return;
  },
});

type MenuItemProps = {
  children: JSX.Element[] | JSX.Element;
};

const MenuItem = (props: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const providerValue: MenuItemContext = { isOpen, setIsOpen };
  return (
    <MenuItemContext.Provider value={providerValue}>
      <div className=' flex w-full justify-between border-b border-solid border-stone-300 py-8 px-6 md:relative '>
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, { isOpen, setIsOpen }),
        )}
      </div>
    </MenuItemContext.Provider>
  );
};

interface Toggle {
  children: JSX.Element;
}

const Toggle = ({ children }: Toggle) => {
  const { isOpen, setIsOpen } = useContext(MenuItemContext);
  return (
    <div className=' cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
      <GearIcon />
      {children}
    </div>
  );
};

interface Title {
  source: source;
}

interface source {
  title: string;
  default: string;
}

const Title = ({ source }: Title) => {
  return (
    <div className='flex flex-col  items-start '>
      <h1 className=' pb-6 font-[700] '>{source.title}</h1>
      <h1 className=''>{source.default}</h1>
    </div>
  );
};

interface List {
  children?: JSX.Element[] | JSX.Element;
}

const List = ({ children }: List) => {
  const { isOpen, setIsOpen } = useContext(MenuItemContext);
  return isOpen ? (
    <div>
      <div
        className='fixed  right-0 left-0 top-0 bottom-0 z-10 bg-black opacity-30 md:hidden'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <ul className=' absolute right-[10px] left-[10px] top-28 z-20 flex max-h-[780px] min-h-[600px] w-auto flex-col overflow-y-auto rounded-lg border border-solid border-stone-300 bg-white md:left-auto md:top-0 md:bottom-auto md:max-h-[200px] md:min-h-0 md:w-[298px]'>
        {children}
      </ul>
    </div>
  ) : (
    <></>
  );
};

interface Item {
  children: string;
  color?: string;
  hasColor: boolean;
  hasImg: boolean;
}

const Item = ({ children, color, hasColor, hasImg }: Item) => {
  const { value, toggle } = useBoolean(false);
  return (
    <li
      className='flex items-end  justify-start border-b border-solid border-stone-300 p-4 '
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
    >
      <CheckIcon className={`mr-2 ${clsx({ invisible: !value })}`} />
      <img
        src={avatar}
        className={`mr-2 h-[16px] w-[16px] rounded-full ${clsx({
          hidden: !hasImg,
        })}`}
      />
      <div
        style={{ backgroundColor: `#${color}` }}
        className={`${clsx({
          'mr-2 h-[16px] w-[16px] rounded-full': true,
          hidden: !hasColor,
        })}`}
      />
      {children}
    </li>
  );
};

interface ListTitle {
  children: string | JSX.Element;
}

const ListTitle = ({ children }: ListTitle) => {
  const { isOpen, setIsOpen } = useContext(MenuItemContext);
  return (
    <li
      className='sticky -top-[1px] z-30 flex items-center justify-between border-b border-solid border-stone-300 bg-white p-4 font-bold'
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
      <span onClick={() => setIsOpen(!isOpen)}>
        <XIcon />
      </span>
    </li>
  );
};

const SearchBar = () => {
  return (
    <div
      className={`sticky top-[36px] border-b border-solid border-stone-300 bg-white p-4`}
    >
      <input
        className='w-full rounded-md border border-solid border-stone-300 p-2'
        type='text'
        placeholder='Type something'
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

interface Subtitle {
  children: string;
}

const Subtitle = ({ children }: Subtitle) => {
  return (
    <div className='font-[8px] flex justify-start border-b border-solid border-stone-300 bg-stone-100 p-3 font-semibold'>
      {children}
    </div>
  );
};

MenuItem.Toggle = Toggle;
MenuItem.Title = Title;
MenuItem.List = List;
MenuItem.Item = Item;
MenuItem.ListTitle = ListTitle;
MenuItem.SearchBar = SearchBar;
MenuItem.Subtitle = Subtitle;

export default MenuItem;
