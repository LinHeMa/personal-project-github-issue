import React, { useState } from 'react';
import PopupMenu from './PopupMenu';
import { useGetIssuesQuery } from '../../sevices/api/issueApi';
import Item from './Item';
import { useLocation, useParams } from 'react-router-dom';
const subtitleList: string[] = ['Label', 'Assignee', 'Sort'];

const IssueListItem = () => {
  const { data, isSuccess } = useGetIssuesQuery('');
  const location = useLocation();
  console.log('query', location);
  const [renderListData, setRenderListData] = useState();
  if (isSuccess) console.log('外層', data);
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
