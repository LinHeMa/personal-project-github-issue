import { CommentIcon, IssueOpenedIcon } from '@primer/octicons-react';
import React from 'react';
import Label from '../label/Label';
import avatar from '../../images/github_avatar.png';
import { Root } from '../../sevices/api/issueApi';

type ItemProps = {
  data: Root;
};

const Item: React.FC<ItemProps> = (props) => {
  const { data } = props;
  const { title, labels, state, number, comments } = data;
  return (
    <div>
      <div className='flex h-[85px] md:h-[62.31px] border-b-[1px] sm:border sm:border-t-[0px] border-solid  border-stone-300 last:rounded-b-lg'>
        <div className='flex justify-center items-start pl-[10px] py-[12.5px]'>
          <input type='checkbox' className='mr-4 hidden lg:block' />
        </div>
        <div className='pl-4 pt-5  self-start'>
          {state === 'open' ? <IssueOpenedIcon fill='#1a7f37' /> : null}
        </div>
        <div className='p-5 pl-3 pr-4 flex  flex-col items-start md:flex-row md:flex-wrap md:justify-start  '>
          <h1 className='font-semibold text-[16px] leading-5'>{title}</h1>
          <div className='flex mt-3 flex-col  items-start leading-5 md:mt-0 md:ml-2 '>
            {labels.map((label, index) => {
              return (
                <Label
                  text={label.name}
                  key={label.id}
                  bgColor={'#' + label.color}
                  borderColor='transparent'
                  fontWeight='700'
                />
              );
            })}
          </div>
          <a className='whitespace-pre mt-3 text-primary-icon-gray md:w-full text-start'>
            #{number} opened 10 days ago by LinHeMa
          </a>
        </div>
        <div className='hidden sm:flex ml-auto  items-start pt-5 pr-4 '>
          <div className='flex group'>
            <img
              src={avatar}
              className='h-[20px] w-[20px] rounded-full mr-[-12px] group-hover:mr-2'
            />
            <img
              src={avatar}
              className='h-[20px] w-[20px] rounded-full mr-[-12px] group-hover:mr-2 '
            />
            <img
              src={avatar}
              className='h-[20px] w-[20px] rounded-full mr-8  md:mr-[40px]'
            />
          </div>
          <div className='flex items-center'>
            {comments ? (
              <CommentIcon fill='#57606A' />
            ) : (
              <CommentIcon fill='#57606A' className=' invisible' />
            )}
            <p className='pl-2'>
              {comments ? (
                comments
              ) : (
                <span className=' invisible'>{comments}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
