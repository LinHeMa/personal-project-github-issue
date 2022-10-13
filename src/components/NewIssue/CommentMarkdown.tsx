import { IssueClosedIcon, TriangleDownIcon } from '@primer/octicons-react';
import React from 'react';
import { useBoolean } from 'usehooks-ts';
import { User } from '../../feature/user/userSlice';
import BiFunctionButton from '../button/BiFunctionButton';
import Button from '../button/Button';
import MarkdownItem from '../CreateIssue/MarkdownItem';
import MarkdownView from '../CreateIssue/MarkdownView';

type CommentMarkdownProps = {
  userInfo: User;
};

const CommentMarkdown: React.FC<CommentMarkdownProps> = ({ userInfo }) => {
  const { avatar_url } = userInfo;
  return (
    <div className='border-t-2 border-solid border-stone-300 md:pt-8'>
      <div className='flex'>
        <img
          className='mr-[4px] hidden h-[40px] w-[40px] rounded-full md:block'
          src={avatar_url}
        />
        <MarkdownView
          hasInput={false}
          minHeight={'min-h-[100px]'}
          commentPage
        />
      </div>
    </div>
  );
};

export default CommentMarkdown;
