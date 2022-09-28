import { CheckIcon, TriangleDownIcon } from '@primer/octicons-react';
import React, { Dispatch, SetStateAction, useState } from 'react';

type PopupMenuProps = {
  item: string;
};

const PopupMenu = ({ item }: PopupMenuProps) => {
  const [labelPop, setLabelPop] = useState(false);
  return (
    <div
      onClick={() => {
        setLabelPop(true);
      }}
      className='cursor-pointer h-[21px] flex items-center px-4 text-primary-icon-gray text-[14px]'
    >
      {item}
      <a href='#' className='hidden sm:block'>
        <TriangleDownIcon fill='#57606A' />
      </a>
      {item === 'Filters' && (
        <a href='#'>
          <TriangleDownIcon fill='#57606A' />
        </a>
      )}
      {labelPop && (
        <div>
          <div
            onClick={(e) => {
              console.log('clicked');
              setLabelPop(false);
              e.stopPropagation();
            }}
            className='bg-black opacity-40 fixed w-full h-full top-0 left-0 z-10'
          />
          <div className='group-last:rounded-b-lg bg-white opacity-100 absolute z-20 top-[3%] right-[20px] left-[20px] flex flex-col  mx-auto border border-solid border-primary-icon-gray rounded-lg'>
            <div className='flex justify-between items-center h-[54px] p-[16px] border-b-[1px] border-solid border-stone-300'>
              <div className='font-semibold text-[14px] '>Filter by label</div>
              <div
                onClick={(e) => {
                  setLabelPop(false);
                  e.stopPropagation();
                }}
                className='text-primary-icon-gray'
              >
                X
              </div>
            </div>
            {item !== 'Sort' && (
              <div className='font-semibold text-[14px] p-[16px] border-solid border-b-[1px] border-stone-300'>
                <input
                  type='text'
                  className='w-full px-[12px] py-[5px] h-[32px] border border-solid border-stone-300 rounded-lg font-medium'
                  placeholder='Filter labels'
                />
              </div>
            )}
            <div className='font-semibold text-[14px] p-[16px] leading-[21px] flex justify-start items-center'>
              <div className=' mr-3'>
                <CheckIcon />
              </div>
              Unlabeled
            </div>
            <div className='font-semibold text-[14px] p-[16px] leading-[21px] flex justify-start items-center'>
              <div className=' mr-3'>
                <CheckIcon />
              </div>
              <div className=' mr-3 w-[14px] h-[14px] rounded-full bg-red-300' />
              Apple
            </div>
            <div className='font-semibold text-[14px] p-[16px] leading-[21px] flex justify-start items-center'>
              <div className=' mr-3'>
                <CheckIcon />
              </div>
              <div className=' mr-3 w-[14px] h-[14px] rounded-full bg-red-300' />
              Banana
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
