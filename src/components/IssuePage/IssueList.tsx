import {
  CheckIcon,
  IssueOpenedIcon,
  MilestoneIcon,
  SearchIcon,
  TagIcon
} from '@primer/octicons-react';
import React from 'react';
import Button from '../../components/button/Button';
import BiFunctionButton from '../button/BiFunctionButton';
import IssueListItem from './IssueListItem';
import PopupMenu from './PopupMenu';

export default function IssueList() {
  return (
    <>
      <div className='container mx-auto flex flex-wrap justify-center px-4 md:px-6 lg:flex-nowrap  lg:px-8 '>
        <div className='md:order-2  md:ml-auto'>
          <BiFunctionButton
            icon={<TagIcon />}
            text='Labels'
            number={1}
            iconRight={<MilestoneIcon />}
            textRight='Milestones'
            numberRight={2}
          />
        </div>
        <button className='ml-auto  flex w-fit items-center whitespace-pre   rounded-md bg-primary-green px-4	py-[5x] text-sm font-medium text-[#ffffff] md:order-3 md:ml-4'>
          New<div className='hidden md:block'> issue</div>
        </button>
        <div className='my-6  flex w-full  rounded-md border border-solid border-gray-300 bg-primary-bg-gray md:my-0 md:w-6/12 lg:mr-4 lg:w-full '>
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
              placeholder='is:issue is:open'
              className=' bg-primary-bg-gray'
            />
          </div>
        </div>
        <div className='mr-auto flex items-center md:order-4 md:mt-4 lg:hidden'>
          <a href='#' className='flex items-center'>
            <IssueOpenedIcon />
            <p className='ml-1 '>4 Open</p>
          </a>
          <a href='#' className='flex items-center'>
            <CheckIcon />
            <p className='ml-1'>1 Closed</p>
          </a>
        </div>
      </div>
      <IssueListItem />
    </>
  );
}
