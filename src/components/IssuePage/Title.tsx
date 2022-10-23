import {
  IssueClosedIcon,
  IssueOpenedIcon,
  SkipIcon
} from '@primer/octicons-react';
import clsx from 'clsx';
import _ from 'lodash';
import React, { useRef } from 'react';
import Image from 'react-image-webp';
import { useNavigate } from 'react-router-dom';
import { useBoolean, useIntersectionObserver } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUpdateIssueMutation } from '../../sevices/api/issueApi';
import { checkLight } from '../../sevices/api/labelApi';
import { editTitle, resetAll } from '../../slices/issueSlice/issueSlice';
import Button from '../Button/Button';
import { timeCalc } from '../IssueListPage/Item';
import Label from '../Label/Label';
import { IssueData } from './fakeData/getAnIssue';

const Title: React.FC<IssueData> = ({
  title,
  number,
  state,
  state_reason,
  user,
  created_at,
  comments,
  assignees,
  labels,
  body: prevBody,
}) => {
  const { value, setFalse, setTrue } = useBoolean(false);
  const dispatch = useAppDispatch();
  const sessionRepo = JSON.parse(sessionStorage.getItem('repo')!);
  const sessionUser = JSON.parse(sessionStorage.getItem('user')!);
  const {
    title: issuedata,
    body: issueBody,
    labels: issueLabels,
    assignees: issueAssignees,
  } = useAppSelector((state) => state.createIssueAction);
  const token = useAppSelector((state) => state.userInfoAction.token);
  const titleInput = useAppSelector((state) => state.createIssueAction.title);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const [updateIssue] = useUpdateIssueMutation();
  const navigate = useNavigate();

  return (
    <div className='px-4 md:py-6' ref={ref}>
      <div className='md:flex'>
        <input
          value={titleInput}
          onChange={(e) => dispatch(editTitle(e.target.value))}
          type='text'
          className={`my-3 h-[32px] w-full rounded-lg border border-solid border-[#d0d7de] bg-[#F5F8FA] py-[5px] px-[12px] text-[16px] md:mr-4 ${clsx(
            {
              hidden: !value,
            },
          )}`}
        />
        <div className={`mb-3 flex ${clsx({ hidden: !value })}`}>
          <Button
            text='Save'
            hoverTextColor='#000000'
            fontSize='14px'
            onClick={_.debounce(() => {
              updateIssue({
                name: sessionUser,
                repo: sessionRepo,
                body: {
                  title: issuedata,
                  body: issueBody,
                  labels: issueLabels,
                  assignees: issueAssignees,
                },
                token,
                issueNumber: number,
              });
              dispatch(resetAll());
              setFalse();
            }, 250)}
          />
          <Button
            text='Cancel'
            fontSize='14px'
            hoverBgColor='transparent'
            hoverTextColor='#022e61'
            bgColor='transparent'
            color='#0969DA'
            borderColor='transparent'
            onClick={() => {
              setFalse();
            }}
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
            <Button
              text='Edit'
              hoverTextColor='black'
              onClick={() => {
                setTrue();
              }}
            />
            <Button
              text='New Issue'
              bgColor='#2CA44E'
              color='#ffffff'
              hoverBgColor='#2C974B'
              onClick={() => {
                navigate('/createissue');
              }}
            />
          </div>
          <a href='#bottom' className='cursor-pointer text-[#0969DA] md:hidden'>
            Jump to buttom
          </a>
        </div>
        <div className='flex flex-wrap pb-[8px] md:w-full'>
          <h1 className='text-left text-[26px] font-semibold tracking-wider	'>
            {title}
          </h1>
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
        {state === 'closed' && state_reason === 'completed' && (
          <div
            className={` mr-2 w-fit rounded-[2em] bg-[#8250DF] py-[5px] px-[12px] text-white`}
          >
            <IssueClosedIcon />
            <span className='ml-1'>{_.upperFirst(state)}</span>
          </div>
        )}
        {state === 'closed' && state_reason === 'not_planned' && (
          <div
            className={` mr-2 w-fit rounded-[2em] bg-[#818890] py-[5px] px-[12px] text-white`}
          >
            <SkipIcon />
            <span className='ml-1'>{_.upperFirst(state)}</span>
          </div>
        )}
        <div className='mt-2 flex  flex-wrap text-[#57606A]'>
          <span className='mr-1 font-semibold'>{user.login}</span> {state} this
          issue {timeCalc(created_at)} · {comments} comments
        </div>
      </div>
      <div className='md:hidden'>
        <div
          className={`mb-[16px] flex items-center justify-start ${clsx({
            hidden: _.isEmpty(assignees),
          })}`}
        >
          <span className='w-[17%] text-left font-semibold text-[#5A636C]'>
            Assignees
          </span>
          <div className='flex flex-wrap'>
            {assignees.map((assignee) => (
              <Image
                src={assignee.avatar_url}
                webp={assignee.avatar_url}
                key={assignee.id}
                className='h-[20px] w-[20px] rounded-full'
              />
            ))}
          </div>
        </div>
        <div
          className={`${clsx({
            hidden: _.isEmpty(labels),
          })} mb-[16px] flex items-center justify-start border-b border-solid border-stone-300 pb-[16px]`}
        >
          <span className={` w-[17%] text-left font-semibold text-[#5A636C]`}>
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
      <header
        className={`${
          !isVisible ? 'block' : 'hidden'
        } border-borderGray fixed top-0 left-0 right-0 z-[200] flex flex-col border-b border-solid bg-white px-2 py-[16px] `}
      >
        <div className='mx-auto flex w-full max-w-[1216px] items-start pl-10'>
          <div>
            {state === 'open' && (
              <div
                className={` mr-2 h-[32px] w-fit min-w-[77px] rounded-[2em] bg-primary-green py-[8px] px-[12px] text-white`}
              >
                <IssueOpenedIcon />
                <span className='ml-1 text-[14px]'>{_.upperFirst(state)}</span>
              </div>
            )}
            {state === 'closed' && state_reason === 'completed' && (
              <div
                className={` mr-2 h-[32px] w-fit min-w-[77px] rounded-[2em] bg-[#8250DF] py-[8px] px-[12px] text-white`}
              >
                <IssueClosedIcon />
                <span className='ml-1'>{_.upperFirst(state)}</span>
              </div>
            )}
            {state === 'closed' && state_reason === 'not_planned' && (
              <div
                className={` mr-2 h-[32px] w-fit min-w-[77px] rounded-[2em] bg-[#818890] py-[8px] px-[12px] text-white`}
              >
                <SkipIcon />
                <span className='ml-1'>{_.upperFirst(state)}</span>
              </div>
            )}
          </div>
          <div>
            <div className='flex  overflow-hidden pb-[2px]'>
              <h1 className='text-left text-[14px] font-semibold tracking-wider	'>
                {title}
              </h1>
              <h2 className='text-[14px] tracking-wider text-[#5A636C]'>
                #{number}
              </h2>
            </div>
            <div className=' flex items-center overflow-hidden whitespace-pre '>
              <div className='mt-2 flex  whitespace-pre text-[#57606A]'>
                <span className='whitespace-pre font-semibold'>
                  {user.login}
                </span>
                <span className='ml-1 whitespace-pre'>{state}</span>
                this issue {timeCalc(created_at)} · {comments} comments
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Title;
