import { IssueOpenedIcon } from '@primer/octicons-react';
import React from 'react';
import Button from '../button/Button';
import clsx from 'clsx';
import { timeCalc } from '../IssuePage/Item';
import { IssueData } from './fakeData/getAnIssue';
import Label from '../label/Label';
import { checkLight } from '../../sevices/api/labelApi';
import { useBoolean } from 'usehooks-ts';

const Title: React.FC<IssueData> = ({
  title,
  number,
  state,
  user,
  created_at,
  comments,
  assignees,
  labels,
}) => {
  const { toggle, value, setFalse, setTrue } = useBoolean(false);
  console.log(value);

  return (
    <div className='px-4 md:py-6'>
      <div className='md:flex'>
        <input
          type='text'
          className={`my-3 h-[32px] w-full rounded-lg border border-solid border-[#d0d7de] bg-[#F5F8FA] py-[5px] px-[12px] text-[16px] md:mr-4 ${clsx(
            {
              hidden: !value,
            },
          )}`}
        />
        <div className={`mb-3 flex ${clsx({ hidden: !value })}`}>
          <Button text='Save' fontSize='14px' />
          <Button
            text='Cancel'
            fontSize='14px'
            bgColor='transparent'
            color='#0969DA'
            borderColor='transparent'
            onClick={setFalse}
          />
        </div>
      </div>
      <div
        className={`md:flex md:flex-row-reverse ${clsx({
          hidden: value,
          'md:hidden': value,
        })}`}
      >
        <div className='flex w-full items-center justify-between pb-[16px]  md:w-fit'>
          <div className='flex'>
            <Button text='Edit' onClick={setTrue} />
            <Button
              text='New Issue'
              bgColor='#2C974B'
              color='#ffffff'
              hoverColor='#2C974B'
            />
          </div>
          <div className='text-[#0969DA] md:hidden'>Jump to buttom</div>
        </div>
        <div className='flex pb-[8px] md:w-full'>
          <h1 className='text-[26px] font-semibold tracking-wider'>{title}</h1>
          <h2 className='text-[26px] tracking-wider text-[#5A636C]'>
            #{number}
          </h2>
        </div>
      </div>
      <div className='mb-[12px] flex flex-wrap items-center whitespace-pre border-b border-solid border-stone-300 pb-[8px] md:pb-[16px]'>
        {state === 'open' && (
          <div
            className={` mr-2 w-fit rounded-[2em] bg-primary-green py-[5px] px-[12px] text-white`}
          >
            <IssueOpenedIcon />
            <span className='ml-1'>{state}</span>
          </div>
        )}
        {state === 'closed' && <div></div>}
        {state === 'closed2' && <div></div>}
        <div className='mt-2 flex  flex-wrap text-[#57606A]'>
          <span className='font-semibold '>{user.login}</span> {state} this
          issue {timeCalc(created_at)} · {comments} comments
        </div>
      </div>
      <div className='md:hidden'>
        <div className='mb-[16px] flex justify-start'>
          <span className='w-[17%] text-left font-semibold text-[#5A636C]'>
            Assignees
          </span>
          <div className='flex flex-wrap'>
            {assignees.map((assignee) => (
              <img
                src={assignee.avatar_url}
                key={assignee.id}
                className='h-[20px] w-[20px] rounded-full'
              />
            ))}
          </div>
        </div>
        <div className='mb-[16px] flex justify-start border-b border-solid border-stone-300 pb-[16px]'>
          <span className=' w-[17%] text-left font-semibold text-[#5A636C]'>
            Labels
          </span>
          <div className='flex w-[83%] flex-wrap'>
            {labels.map((label) => (
              <span key={label.id} className='mt-2'>
                <Label
                  text={label.name}
                  isLight={checkLight(label.color)}
                  color='#ffffff'
                  borderColor={'#' + label.color}
                  bgColor={'#' + label.color}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
