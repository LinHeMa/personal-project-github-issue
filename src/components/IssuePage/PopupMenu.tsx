import { CheckIcon, TriangleDownIcon } from '@primer/octicons-react';
import _ from 'lodash';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Root, useGetListAssigneesQuery } from '../../sevices/api/issueApi';
import { LabelsList, useGetLabelListQuery } from '../../sevices/api/labelApi';

type PopupMenuProps = {
  type: string;
  data?: Root[];
};

const sortList = [
  'Newest',
  'Oldest',
  'Most commented',
  'Least commented',
  'Recently updated',
  'Least recently updated'
];

const PopupMenu = ({ type, data }: PopupMenuProps) => {
  const [renderType, setRenderType] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [labelPop, setLabelPop] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { data: labels, isSuccess: isLableFetchSuccess } = useGetLabelListQuery(
    {
      name: 'LinHeMa',
      repo: 'TEST'
    }
  );
  const { data: assignees, isSuccess: isAssigneesFetchSuccess } =
    useGetListAssigneesQuery('');

  return (
    <div
      onClick={() => {
        setLabelPop(true);
        setRenderType(type);
      }}
      className='flex h-[21px] cursor-pointer items-center px-4 text-[14px] text-primary-icon-gray'
    >
      {type}
      <a href='#' className='hidden sm:block'>
        <TriangleDownIcon fill='#57606A' />
      </a>

      {labelPop && (
        <div>
          <div
            onClick={(e) => {
              setLabelPop(false);
              e.stopPropagation();
            }}
            className='fixed top-0 left-0 z-10 h-full w-full bg-black opacity-40 sm:bg-transparent'
          />
          <div className='absolute left-[20px] right-[20px] top-8  z-20 mx-auto flex min-h-[800px] flex-col rounded-xl border border-solid bg-white opacity-100 group-last:rounded-b-lg sm:min-h-fit sm:w-[300px] sm:border-stone-300 md:right-auto md:left-[5px] md:top-[25px]'>
            <div className='flex h-[54px] items-center justify-between border-b-[1px] border-solid border-stone-300 p-[16px]'>
              <div className='text-[14px] font-semibold '>Filter by label</div>
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
            {type !== 'Sort' && (
              <div className='border-b-[1px] border-solid border-stone-300 p-[16px] text-[14px] font-semibold'>
                <input
                  type='text'
                  className='h-[32px] w-full rounded-lg border border-solid border-stone-300 px-[12px] py-[5px] font-medium'
                  placeholder='Filter labels'
                />
              </div>
            )}
            {renderType === 'Label' && (
              <div className='flex items-center justify-start  border-b-[1px] border-solid border-stone-300 p-[16px] text-[14px] font-semibold leading-[21px]'>
                <div className={` mr-3 ${isClicked ? 'visible' : 'invisible'}`}>
                  <CheckIcon />
                </div>
                Unlabeled
              </div>
            )}
            <>
              {renderType === 'Label' &&
                labels?.map((label, index) => {
                  return (
                    <div
                      key={label.id}
                      className='flex items-center justify-start border-b-[1px] border-solid border-stone-300 p-[16px] text-[14px] font-semibold leading-[21px]'
                      onClick={() => {
                        setIsClicked((prev) => !prev);
                        navigate('/issuelist?labels=' + label.name);
                      }}
                    >
                      <div
                        className={` mr-3 ${
                          isClicked ? 'visible' : 'invisible'
                        }`}
                      >
                        <CheckIcon />
                      </div>
                      <div
                        style={{ backgroundColor: '#' + label.color }}
                        className={` mr-3 h-[14px] w-[14px] rounded-full `}
                      />
                      {label.name}
                    </div>
                  );
                })}
            </>
            <>
              {renderType === 'Assignee' &&
                assignees?.map((assignee, index) => {
                  return (
                    <div
                      key={assignee.id}
                      className='flex items-center justify-start p-[16px] text-[14px] font-semibold leading-[21px]'
                    >
                      <div
                        className={` mr-3 ${
                          isClicked ? 'visible' : 'invisible'
                        }`}
                      >
                        <CheckIcon />
                      </div>
                      <img
                        src={assignee.avatar_url}
                        alt='avatar_img'
                        className='mr-2 h-[20px] w-[20px] rounded-full'
                      />
                      {assignee.login}
                    </div>
                  );
                })}
            </>
            <>
              {renderType === 'Sort' &&
                sortList?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='flex items-center justify-start p-[16px] text-[14px] font-semibold leading-[21px]'
                    >
                      <div
                        className={` mr-3 ${
                          isClicked ? 'visible' : 'invisible'
                        }`}
                      >
                        <CheckIcon />
                      </div>
                      {item}
                    </div>
                  );
                })}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
