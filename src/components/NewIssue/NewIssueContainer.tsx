import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  useGetAnIssuesQuery,
  useGetCommentsQuery,
} from '../../sevices/api/issueApi';
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
  return (
    <div className='container mx-auto'>
      <Title {...(issueData as IssueData)} />
    </div>
  );
};

export default NewIssueContainer;
