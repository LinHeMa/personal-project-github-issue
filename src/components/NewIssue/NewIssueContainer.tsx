import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  useGetAnIssuesQuery,
  useGetCommentsQuery,
} from '../../sevices/api/issueApi';
import CommentBlock from './CommentBlock';
import { IssueData } from './fakeData/getAnIssue';
import Title from './Title';

const NewIssueContainer = () => {
  //  TODO use variables
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const { data: issueData, isSuccess } = useGetAnIssuesQuery({
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
  console.log(comments);

  if (isSuccess)
    return (
      <div className='p-[16px] pb-[180px]'>
        <Title {...(issueData as IssueData)} />
        {comments?.map((comment) => (
          <CommentBlock {...comment} key={comment.id} />
        ))}
      </div>
    );
  return <>fetching</>;
};

export default NewIssueContainer;
