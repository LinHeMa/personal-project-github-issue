import {
  CheckIcon,
  IssueOpenedIcon,
  MilestoneIcon,
  SearchIcon,
  TagIcon,
  XIcon,
} from '@primer/octicons-react';
import clsx from 'clsx';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/button/Button';
import {
  addStateCondition,
  resetAll,
} from '../../feature/Label/LabelListActionSlice';
import { useGetIssuesQuery } from '../../sevices/api/issueApi';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';
import BiFunctionButton from '../button/BiFunctionButton';
import IssueListItem from './IssueListItem';
import PopupMenu from './PopupMenu';

export type issueStateType = {
  open: number;
  closed: number;
};

export default function IssueList() {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.labelListAction);
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const { data: allIssueData } = useGetIssuesQuery({
    userName: userInfo.user_name,
    repo: userInfo.chosenRepo,
    labels: '',
    assignee: '',
    sort: '',
    filter: '',
    state: '&state=all',
    page: '',
    token: userInfo.token,
  });
  const openIssueQty = _.filter(
    allIssueData,
    (item) => item.state === 'open',
  )?.length;
  const closedIssueQty = allIssueData ? allIssueData?.length - openIssueQty : 0;
  const hasCondition = () => {
    if (data.lables.length > 0) return true;
    if (data.assignees.length > 0) return true;
    if (data.sort !== '') return true;
    if (data.state !== 'open') return true;
    if (data.filter !== '') return true;
    return false;
  };
  const inputValue = useAppSelector((state) => state.labelListAction);
  const [valueString, setValueString] = useState<string>('');
  const inputValueString = () => {
    let result = '';
    if (inputValue.state !== '') result += `is:${inputValue.state} `;
    if (inputValue.issue) result += `is:issue `;
    if (inputValue.lables.length !== 0) {
      const labelString = inputValue.lables.reduce((acc, cur) => {
        acc += `label:${cur} `;
        return acc;
      }, '');
      result += labelString;
    }
    if (inputValue.assignees.length !== 0)
      result += `assignee:${inputValue.assignees[0]} `;
    if (inputValue.sort !== '') result += `sort:${inputValue.sort} `;
    if (inputValue.filter === '&creator=@me') result += `author:@me `;
    if (inputValue.filter === `&assignee=${userInfo.user_name}`)
      result += `assignee:@me `;
    if (inputValue.filter === '&mentioned=@me') result += `metions:@me `;

    if (_.includes(inputValue.assignees, `${userInfo.user_name}`)) {
      result = _.join(_.without(_.split(result, ' '), 'author:@me'), ' ');
    }
    return result;
  };

  useEffect(() => setValueString(inputValueString()), [inputValue]);

  const [issueState, setIssueState] = useState<issueStateType>({
    open: 0,
    closed: 0,
  });
  const dispatch = useAppDispatch();
  const { data: lableData } = useGetLabelListQuery({
    name: userInfo.user_name,
    repo: userInfo.chosenRepo,
    token: userInfo.token,
  });
  return (
    <>
      <div className='container mx-auto flex flex-wrap justify-center px-4 md:px-6  lg:px-8 '>
        <div className='md:order-2  md:ml-auto'>
          <div
            onClick={(e) => {
              const target = e.target as HTMLDivElement;
              if (target.outerText.includes('Labels')) {
                navigate('/');
              }
            }}
          >
            <BiFunctionButton
              icon={<TagIcon />}
              text='Labels'
              number={lableData?.length}
              iconRight={<MilestoneIcon />}
              textRight='Milestones'
              numberRight={3}
            />
          </div>
        </div>
        <button
          className='ml-auto  flex w-fit items-center whitespace-pre   rounded-md bg-primary-green px-4	py-[5x] text-sm font-medium text-[#ffffff] md:order-3 md:ml-4'
          onClick={() => navigate('/createissue')}
        >
          New<div className='hidden md:block'> issue</div>
        </button>
        <div className='my-6  flex w-full  rounded-md border border-solid border-gray-300 bg-primary-bg-gray md:my-0 md:w-6/12 lg:mr-4 lg:w-7/12 '>
          <Button
            text=''
            hasDropDown={false}
            popup={<PopupMenu type='Filters' />}
          />

          <div className='relative flex w-full items-center py-[5px] pl-8 pr-3  '>
            <div className='absolute left-0 '>
              <SearchIcon size={16} className='text-gray-500' />
            </div>
            <input
              type='text'
              className=' h-full w-full border-0 bg-primary-bg-gray outline-none'
              value={valueString}
            />
          </div>
        </div>

        <div className='mr-auto flex items-center md:order-5 md:mt-4 lg:hidden'>
          <a
            href='#'
            className='flex items-center'
            onClick={() => dispatch(addStateCondition('open'))}
          >
            <IssueOpenedIcon />
            <p className='ml-1 '>{openIssueQty} Open</p>
          </a>
          <a
            href='#'
            className='flex items-center'
            onClick={() => dispatch(addStateCondition('closed'))}
          >
            <CheckIcon />
            <p className='ml-1'>{closedIssueQty} Closed</p>
          </a>
        </div>
        <div
          className={`mt-8 mb-4 flex w-full cursor-pointer items-center  justify-start md:order-4 ${clsx(
            { hidden: !hasCondition() },
          )}`}
          onClick={() => {
            dispatch(resetAll());
          }}
        >
          <XIcon
            size={16}
            fill='white'
            className=' mr-2 rounded-md bg-stone-500 '
          />
          Clear current search query, filters, and sorts
        </div>
      </div>
      <IssueListItem
        setIssueState={setIssueState}
        issueState={issueState}
        openIssueQty={openIssueQty}
        closedIssueQty={closedIssueQty}
      />
    </>
  );
}
