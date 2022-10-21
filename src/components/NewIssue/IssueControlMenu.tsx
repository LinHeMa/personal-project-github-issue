import {
  ArrowRightIcon,
  InfoIcon,
  LockIcon,
  PinIcon,
  TrashIcon,
} from '@primer/octicons-react';
import React from 'react';

const IssueControlMenu = () => {
  return (
    <div className='mt-8 flex flex-col items-start pl-[15px]'>
      <div className='mt-6 flex items-center text-[14px] font-bold hover:text-[#0969DA] cursor-pointer'>
        <span className='mr-2'>
          <LockIcon />
        </span>
        <span>Lock conversation</span>
      </div>
      <div className='mt-6 flex items-center text-[14px] font-bold hover:text-[#0969DA] cursor-pointer'>
        <span className='mr-2'>
          <PinIcon />
        </span>
        <span className='mr-2'>Pin issue</span>
        <InfoIcon fill='12' />
      </div>
      <div className='mt-6 flex items-center text-[14px] font-bold hover:text-[#0969DA] cursor-pointer'>
        <span className='mr-2'>
          <ArrowRightIcon />
        </span>
        <span>Transfer Issue</span>
      </div>
      <div className='mt-6 flex items-center text-[14px] font-bold hover:text-[#0969DA] cursor-pointer'>
        <span className='mr-2'>
          <TrashIcon />
        </span>
        <span>Delete Issue</span>
      </div>
    </div>
  );
};

export default IssueControlMenu;
