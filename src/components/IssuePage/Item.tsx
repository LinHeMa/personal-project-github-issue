import {
  CommentIcon,
  IssueClosedIcon,
  IssueOpenedIcon
} from '@primer/octicons-react';
import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { Root } from '../../sevices/api/issueApi';
import { checkLight } from '../../sevices/api/labelApi';
import Label from '../label/Label';

type ItemProps = {
  data: Root;
};
export function timeCalc(time: string) {
  const createdTime = new Date(time).getTime();
  const nowTime = +new Date();
  const timeDiff = Math.floor((nowTime - createdTime) / 1000);

  const monthNamesEn = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (timeDiff < 10) {
    return 'now';
  } else if (timeDiff < 60) {
    return `${timeDiff} seconds ago`;
  } else if (timeDiff < 3600) {
    return `${Math.ceil(timeDiff / 60)} minutes ago`;
  } else if (timeDiff < 86400) {
    return `${Math.ceil(timeDiff / 3600)} hours ago`;
  } else if (timeDiff < 2592000) {
    return `${Math.ceil(timeDiff / 86400)} days ago`;
  } else {
    return `${new Date(time).getDate()} ${
      monthNamesEn[new Date(time).getMonth()]
    }`;
  }
}
const Item: React.FC<ItemProps> = ({ data }) => {
  const {
    title,
    labels,
    state,
    number,
    comments,
    assignees,
    created_at,
    user,
  } = data;
  const [value, setValue] = useSessionStorage('issueNumber', 0);
  const navigate = useNavigate();
  return (
    <div
      className='last:rounded-b-lg'
      onClick={() => {
        setValue(number);
        navigate('/newissue');
      }}
    >
      <div className='flex min-h-[85px] cursor-pointer border-b-[1px] border-solid   border-stone-300  hover:bg-[#f6f8fa] sm:border sm:border-t-[0px] md:h-[62.31px]'>
        <div className='flex items-start justify-center py-[12.5px] pl-[10px]'>
          <input type='checkbox' className='mr-4 hidden lg:block' />
        </div>
        <div className='self-start pl-4 pt-5'>
          {state === 'open' ? (
            <IssueOpenedIcon fill='#1a7f37' />
          ) : (
            <IssueClosedIcon fill='#8250df' />
          )}
        </div>

        <div className='flex flex-col items-start p-5  pl-3 pr-4 md:flex-row md:flex-wrap md:justify-start  '>
          <div className='flex h-max flex-wrap items-center md:flex-nowrap'>
            <h1 className='w-full text-left text-[16px] font-semibold leading-5 md:w-fit'>
              {title}
            </h1>
            <div className='mt-3 flex  flex-wrap items-start leading-5 md:mt-0 md:ml-2 '>
              {labels.map((label) => {
                return (
                  <span key={label.id} className='mt-2'>
                    <Label
                      text={label.name}
                      key={label.id}
                      bgColor={'#' + label.color}
                      borderColor='transparent'
                      fontWeight='700'
                      isLight={checkLight(label.color)}
                      color='#fff'
                    />
                  </span>
                );
              })}
            </div>
          </div>
          <a className='mt-3 whitespace-pre text-start text-primary-icon-gray md:w-full'>
            #{number} opened {timeCalc(created_at)} by {user.login}
          </a>
        </div>
        <div className='ml-auto items-start justify-end overflow-hidden pt-5 pr-4 sm:flex '>
          <div className='group mr-4 flex  justify-center overflow-hidden sm:min-w-[90px]'>
            {assignees.length > 0
              ? assignees.map((assignee, index) => {
                  return (
                    <img
                      key={assignee.id}
                      src={assignee.avatar_url}
                      className={`hidden h-[20px] w-[20px] rounded-full transition-all duration-300 ease-in-out sm:block ${
                        assignees.length !== 1 &&
                        'ease-in-out group-hover:mr-2 group-hover:block'
                      }
                      ${clsx({
                        'mr-[-12px]':
                          index !== assignees.length - 1 &&
                          index >= assignees.length - 3,
                        hidden: index < assignees.length - 3,
                      })}
                      `}
                    />
                  );
                })
              : null}
          </div>
          <div className='group flex items-center justify-center text-[#57606A] hover:cursor-pointer hover:text-[#0969da] sm:min-w-[60px]'>
            {comments ? (
              <span className='hidden sm:block'>
                <CommentIcon />
              </span>
            ) : (
              <></>
            )}
            <p className='pl-2'>
              {comments ? (
                <span className='hidden sm:block'>{comments}</span>
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
