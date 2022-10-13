import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  useGetAnIssuesQuery,
  useGetCommentsQuery,
} from '../../sevices/api/issueApi';
import CommentBlock from './CommentBlock';
import { IssueData } from './fakeData/getAnIssue';
import Title from './Title';
import ReactLoading from 'react-loading';
import MarkdownItem from '../CreateIssue/MarkdownItem';
import MarkdownView from '../CreateIssue/MarkdownView';
import CommentMarkdown from './CommentMarkdown';

const NewIssueContainer = () => {
  //  TODO use variables
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const {
    data: issueData,
    isSuccess,
    isFetching,
  } = useGetAnIssuesQuery({
    userName: 'LinHeMa',
    repo: 'TEST',
    token: userInfo.token,
    issueId: 58,
  });
  const { data: comments } = useGetCommentsQuery({
    userName: 'LinHeMa',
    repo: 'TEST',
    token: userInfo.token,
    issueId: 58,
  });
  console.count('rendered');

  if (isSuccess)
    return (
      <div className='p-[16px] pb-[180px]'>
        <Title {...(issueData as IssueData)} />
        {comments?.map((comment) => (
          <CommentBlock {...comment} key={comment.id} />
        ))}
        <CommentMarkdown userInfo={userInfo} />
      </div>
    );
  return (
    <div className='mt-16 flex justify-center'>
      <ReactLoading
        type='spinningBubbles'
        color='#23a7e4'
        height={'20%'}
        width={'20%'}
      />
    </div>
  );
};

export default NewIssueContainer;
