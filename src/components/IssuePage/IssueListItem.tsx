import { CommentIcon, IssueOpenedIcon } from '@primer/octicons-react';
import React, { useState } from 'react';
import Label from '../label/Label';
import avatar from '../../images/github_avatar.png';
import PopupMenu from './PopupMenu';
import { useGetIssuesQuery } from '../../sevices/api/issueApi';
import Item from './Item';

const subtitleList: string[] = ['Label', 'Assignee', 'Sort'];

const IssueListItem = () => {
  const { data, isSuccess } = useGetIssuesQuery('');
  if (isSuccess) console.log(data);
  return (
    <div className='container  md:px-6 lg:px-8 mx-auto mt-4 '>
      <div className='flex items-center  justify-between px-4 bg-primary-bg-gray border-solid border border-stone-300 sm:rounded-t-lg p-7 md:justify-start'>
        <input type='checkbox' className='mr-4 hidden lg:block' />
        {subtitleList.map((item, index) => (
          <PopupMenu key={index} item={item} />
        ))}
      </div>
      <>
        {data?.map((item, index) => {
          return <Item data={item} key={index} />;
        })}
      </>
    </div>
  );
};

export default IssueListItem;
