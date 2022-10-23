import React from 'react';
import MarkdownView from '../CreateIssue/MarkdownView';

type CommentMarkdownProps = {
  avatar_url: string;
};

const CommentMarkdown: React.FC<CommentMarkdownProps> = ({ avatar_url }) => {
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
