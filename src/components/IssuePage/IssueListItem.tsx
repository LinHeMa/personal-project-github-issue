import React, { useState } from 'react';
import PopupMenu from './PopupMenu';
import { useGetIssuesQuery } from '../../sevices/api/issueApi';
import Item from './Item';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import _ from 'lodash';
const subtitleList: string[] = ['Label', 'Assignee', 'Sort'];

const IssueListItem = () => {
  const queryStringLabels = useAppSelector(
    (state) => state.labelListAction.lables,
  );
  const queryStringAssignees = useAppSelector(
    (state) => state.labelListAction.assignees,
  );
  const queryStringSort = useAppSelector((state) => state.labelListAction.sort);
  console.log(queryStringSort);

  const { data, isSuccess } = useGetIssuesQuery({
    labels:
      queryStringLabels.length > 0 ? `labels=${_.join(queryStringLabels)}` : '',
    assignee:
      queryStringAssignees.length > 0
        ? `&assignee=${_.join(queryStringAssignees)}`
        : '',
    sort: queryStringSort !== '' ? `&sort=${queryStringSort}` : '',
  });

  return (
    <div className='container  mx-auto mt-4 md:px-6 lg:px-8 '>
      <div className=' flex items-center  justify-between border border-solid border-stone-300 bg-primary-bg-gray p-7 px-4 sm:justify-start sm:rounded-t-lg md:justify-start'>
        <input type='checkbox' className='mr-4 hidden lg:block' />
        {subtitleList.map((item, index) => (
          <div className='sm:relative' key={index}>
            <PopupMenu key={index} type={item} data={data} />
          </div>
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
