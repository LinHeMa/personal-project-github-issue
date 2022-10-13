import { IssueOpenedIcon } from '@primer/octicons-react';
import React, { useEffect } from 'react';
import Button from '../button/Button';
import clsx from 'clsx';
import { timeCalc } from '../IssuePage/Item';
import { IssueData } from './fakeData/getAnIssue';
import Label from '../label/Label';
import { checkLight } from '../../sevices/api/labelApi';
import { useBoolean } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addAssignee,
  addBody,
  addLabel,
  addTitle,
} from '../../feature/Label/createIssueSlice';
import { useUpdateIssueMutation } from '../../sevices/api/issueApi';
import _ from 'lodash';

const Title: React.FC<IssueData> = ({
  title,
  number,
  state,
  user,
  created_at,
  comments,
  assignees,
  labels,
  body: prevBody,
}) => {
  const { toggle, value, setFalse, setTrue } = useBoolean(false);
  const dispatch = useAppDispatch();
  const sessionRepo = JSON.parse(sessionStorage.getItem('repo')!);
  const sessionUser = JSON.parse(sessionStorage.getItem('user')!);
  const { name, repo, ...body } = useAppSelector(
    (state) => state.createIssueAction,
  );
  const token = useAppSelector((state) => state.userInfoAction.token);
  const titleInput = useAppSelector((state) => state.createIssueAction.title);

  useEffect(() => {
    const prevLabelsArray = labels.map((label) => label.name);
    const prevAssigneesArray = assignees.map((assignee) => assignee.login);
    console.log(prevLabelsArray, prevAssigneesArray, 'initialize');
    dispatch(addTitle(title));
    dispatch(addBody(prevBody));
    prevLabelsArray.forEach((label) => {
      dispatch(addLabel(label));
    });
    prevAssigneesArray.forEach((assignee) => {
      console.log(assignee);
      dispatch(addAssignee(assignee));
    });
  }, []);

  const [updateIssue] = useUpdateIssueMutation();

  return (
    <div className='px-4 md:py-6'>
      <div className='md:flex'>
        <input
          value={titleInput}
          onChange={(e) => dispatch(addTitle(e.target.value))}
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
            fontSize='14px'
            onClick={() => {
              console.log(body);
              updateIssue({
                name: sessionUser,
                repo: sessionRepo,
                body,
                token,
                issueNumber: number,
              });
              setFalse();
            }}
          />
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
            <Button
              text='Edit'
              onClick={() => {
                setTrue();
              }}
            />
            <Button
              text='New Issue'
              bgColor='#2C974B'
              color='#ffffff'
              hoverColor='#2C974B'
            />
          </div>
          <div className='text-[#0969DA] md:hidden'>Jump to buttom</div>
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
        {state === 'closed' && <div></div>}
        {state === 'closed2' && <div></div>}
        <div className='mt-2 flex  flex-wrap text-[#57606A]'>
          <span className='font-semibold '>{user.login}</span> {state} this
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
              <img
                src={assignee.avatar_url}
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
    </div>
  );
};

export default Title;
