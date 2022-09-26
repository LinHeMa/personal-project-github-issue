import React from 'react';
import Button from '../../components/button/Button';

export default function IssueList() {
  return (
    <div className='flex container mx-auto'>
      <Button text='Filters' hasDropDown={true} />
      <button className='bg-primary-green rounded-md	text-[#ffffff] w-fit p-[8px]'>
        New issue
      </button>
    </div>
  );
}
