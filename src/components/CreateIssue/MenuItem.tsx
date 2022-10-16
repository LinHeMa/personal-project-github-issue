import { CheckIcon, GearIcon, XIcon } from '@primer/octicons-react';
import React, {
  createContext,
  Dispatch,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';
import _ from 'lodash';
import Label from '../label/Label';
import { checkLight, LabelsList } from '../../sevices/api/labelApi';
import { User, useUpdateIssueMutation } from '../../sevices/api/issueApi';
import { useAppSelector } from '../../app/hooks';

interface MenuItemContext {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
}
const MenuItemContext = createContext<MenuItemContext>({
  isOpen: false,
  setIsOpen: () => {
    return;
  },
  searchValue: '',
  setSearchValue: () => {
    return;
  },
});

type MenuItemProps = {
  children: JSX.Element[] | JSX.Element;
  notCreated?: boolean;
};

const MenuItem = (props: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = JSON.parse(sessionStorage.getItem('user')!);
  const userRepo = JSON.parse(sessionStorage.getItem('repo')!);
  const token = _.get(
    JSON.parse(localStorage.getItem('supabase.auth.token')!),
    ['currentSession', 'provider_token'],
  );

  const issueNumber = JSON.parse(sessionStorage.getItem('issueNumber')!);
  const ref = useRef(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const { name, repo, ...body } = useAppSelector(
    (state) => state.createIssueAction,
  );
  const [updateIssue] = useUpdateIssueMutation();
  useOnClickOutside(ref, () => {
    setIsOpen(false);
    if (!isOpen) return;
    if (props.notCreated) return;
    updateIssue({
      name: userName,
      repo: userRepo,
      token,
      body,
      issueNumber,
    });
    console.log('clicked out', {
      name: userName,
      repo: userRepo,
      token,
      body,
    });

  });
  const providerValue: MenuItemContext = {
    isOpen,
    setIsOpen,
    searchValue,
    setSearchValue,
  };
  return (
    <MenuItemContext.Provider value={providerValue}>
      <div
        className=' flex w-full justify-between  py-8 px-6 md:relative '
        ref={ref}
      >
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, {
            isOpen,
            setIsOpen,
            searchValue,
            setSearchValue,
          }),
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
  clickedArray?: LabelsList[] | User[];
  isLabel: boolean;
}

interface source {
  title: string;
  default?: string | JSX.Element[];
}

const Title = ({ source, clickedArray, isLabel }: Title) => {
  return (
    <div className='flex flex-col  items-start '>
      <h1 className=' pb-6 font-[700] '>{source.title}</h1>
      <h1
        className={`${clsx({
          hidden: !_.isEmpty(clickedArray),
        })} flex justify-start text-left`}
      >
        {source.default}
      </h1>

      <div
        className={`flex  ${clsx({
          'flex-wrap': isLabel,
          'flex-col': !isLabel,
        })}`}
      >
        {clickedArray?.map((item, index) => (
          <div key={index} className='mb-1'>
            {'name' in item ? (
              <Label
                text={item.name}
                bgColor={'#' + item.color}
                isLight={checkLight(item.color)}
                color='#ffffff'
                borderColor='transparent'
              />
            ) : (
              <div className='flex items-center'>
                <img
                  src={item.avatar_url}
                  className={`mr-2 h-[16px] w-[16px] rounded-full`}
                />
                {item.login}
              </div>
            )}
          </div>
        ))}
      </div>
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
      <ul className=' absolute right-[10px] left-[10px] top-28 z-20 flex max-h-[780px] min-h-[600px] w-auto flex-col overflow-y-auto rounded-lg border border-solid border-stone-300 bg-white md:left-auto md:top-0 md:bottom-auto md:max-h-[400px] md:min-h-0 md:w-[298px]'>
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
  clickFn?: (label: string) => void;
  clickedArray?: string[];
  img?: string;
}

const Item = ({
  children,
  color,
  hasColor,
  hasImg,
  clickFn,
  clickedArray,
  img,
}: Item) => {
  const { value, toggle } = useBoolean(false);
  const { searchValue } = useContext(MenuItemContext);
  const replaceWhite = (string: string) => _.replace(string, / /g, '');
  const textRefact = _.flow([replaceWhite, _.toLower]);

  return (
    <li
      className={`flex items-end  justify-start border-b border-solid border-stone-300 p-4 ${clsx(
        {
          hidden: !_.includes(textRefact(children), textRefact(searchValue)),
        },
      )}`}
      onClick={(e) => {
        toggle();
        clickFn?.(children);
        e.stopPropagation();
      }}
    >
      <CheckIcon
        className={`mr-2 ${clsx({
          invisible: !_.includes(clickedArray, children),
        })}`}
      />
      <img
        src={img}
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
  const { searchValue, setSearchValue } = useContext(MenuItemContext);
  return (
    <div
      className={`sticky top-[36px] border-b border-solid border-stone-300 bg-white p-4`}
    >
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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
    <div className='font-[8px] sticky top-[84px] flex justify-start border-b border-solid border-stone-300 bg-stone-100 p-3 font-semibold'>
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
