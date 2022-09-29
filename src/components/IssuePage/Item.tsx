import { CommentIcon, IssueOpenedIcon } from '@primer/octicons-react';
import React, { useState } from 'react';
import Label from '../label/Label';
import { Root, useGetIssuesQuery } from '../../sevices/api/issueApi';

type ItemProps = {
  data: Root;
};

const Item: React.FC<ItemProps> = ({ data }) => {
  const { title, labels, state, number, comments, assignees } = data;
  const { data: queryData, isSuccess } = useGetIssuesQuery({
    labels: '',
    assignee: '',
    sort: '',
  });

  return (
    <div>
      <div className='flex h-[85px] border-b-[1px] border-solid border-stone-300 last:rounded-b-lg sm:border  sm:border-t-[0px] md:h-[62.31px]'>
        <div className='flex items-start justify-center py-[12.5px] pl-[10px]'>
          <input type='checkbox' className='mr-4 hidden lg:block' />
        </div>
        <div className='self-start pl-4  pt-5'>
          {state === 'open' ? <IssueOpenedIcon fill='#1a7f37' /> : null}
        </div>
        <div className='flex flex-col items-start p-5  pl-3 pr-4 md:flex-row md:flex-wrap md:justify-start  '>
          <h1 className='text-[16px] font-semibold leading-5'>{title}</h1>
          <div className='mt-3 flex  items-start leading-5 md:mt-0 md:ml-2 '>
            {labels.map((label) => {
              return (
                <Label
                  text={label.name}
                  key={label.id}
                  bgColor={'#' + label.color}
                  borderColor='transparent'
                  fontWeight='700'
                />
              );
            })}
          </div>
          <a className='mt-3 whitespace-pre text-start text-primary-icon-gray md:w-full'>
            #{number} opened 10 days ago by LinHeMa
          </a>
        </div>
        <div className='ml-auto hidden items-start  pt-5 pr-4 sm:flex '>
          <div className='group mr-4  flex'>
            {assignees.length > 0
              ? assignees.map((assignee, index) => {
                  return (
                    <img
                      key={assignee.id}
                      src={assignee.avatar_url}
                      className={`h-[20px] w-[20px] rounded-full ${
                        index === assignees.length - 1 ? '' : 'mr-[-12px]'
                      }  ${assignees.length !== 1 && 'group-hover:mr-2'}`}
                    />
                  );
                })
              : null}
          </div>
          <div className='group flex items-center hover:cursor-pointer'>
            {comments ? (
              <CommentIcon fill='#57606A' />
            ) : (
              <CommentIcon fill='#57606A' className=' invisible' />
            )}
            <p className='pl-2'>
              {comments ? (
                comments
              ) : (
                <span className=' invisible'>{comments}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
