import _ from 'lodash';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addEditComment } from '../../feature/updateIssueSlice';
import { useDeleteCommentMutation } from '../../sevices/api/issueApi';

type FlyoutProps = {
  commentId?: number;
  openEdit?: () => void;
  body: string;
};

const Flyout = ({ commentId, openEdit, body }: FlyoutProps) => {
  const [deleteAcomments] = useDeleteCommentMutation();
  const name = JSON.parse(sessionStorage.getItem('user')!);
  const repo = JSON.parse(sessionStorage.getItem('repo')!);
  const token = _.get(
    JSON.parse(localStorage.getItem('supabase.auth.token')!),
    ['currentSession', 'provider_token'],
  );
  const dispatch = useAppDispatch();

  console.log(token);

  return (
    <div className='w-[185px] rounded-xl border border-solid border-stone-300 bg-white'>
      <div className='w-full border-b border-solid border-stone-300'>
        <div className='w-full p-[10px] pl-[16px] text-left hover:bg-[#0969DA] hover:text-white'>
          Copy link
        </div>
        <div className='w-full p-[10px] pl-[16px] text-left hover:bg-[#0969DA] hover:text-white'>
          Qoute reply
        </div>
        <div className='w-full p-[10px] pl-[16px] text-left hover:bg-[#0969DA] hover:text-white'>
          Reference in new issue
        </div>
      </div>
      <div className='w-full border-b border-solid border-stone-300'>
        <div
          className='w-full p-[10px] pl-[16px] text-left hover:bg-[#0969DA] hover:text-white'
          onClick={() => {
            console.log('clicked');
            
            dispatch(addEditComment({ id: commentId!, body: body! }));
          }}
        >
          Edit
        </div>
        <div className='w-full p-[10px] pl-[16px] text-left hover:bg-[#0969DA] hover:text-white'>
          Hide
        </div>
        <div
          className='w-full p-[10px] pl-[16px] text-left text-[#cf222e] hover:bg-[#cf232e] hover:text-white'
          onClick={() =>
            deleteAcomments({
              name,
              repo,
              token,
              commentId,
            })
          }
        >
          Delete
        </div>
      </div>
      <div className=' w-full'>
        <div className='w-full p-[10px] pl-[16px] text-left hover:bg-[#0969DA] hover:text-white'>
          Report Content
        </div>
      </div>
    </div>
  );
};

export default Flyout;
