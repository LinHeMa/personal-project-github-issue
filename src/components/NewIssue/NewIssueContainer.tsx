import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetAnIssuesQuery } from '../../sevices/api/issueApi';
import { IssueData } from './fakeData/getAnIssue';
import Title from './Title';

const NewIssueContainer = () => {
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const { data: issueData, isSuccess } = useGetAnIssuesQuery({
    userName: 'LinHeMa',
    repo: 'TEST',
    token: userInfo.token,
    issueId: 58,
  });
  return (
    <div className='container mx-auto'>
      <Title {...(issueData as IssueData)} />
    </div>
  );
};

export default NewIssueContainer;
