import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  useGetAnIssueLabelsQuery,
  useGetAnIssuesQuery,
  useGetCommentsQuery,
  useGetListAssigneesQuery,
} from '../../sevices/api/issueApi';
import CommentBlock from './CommentBlock';
import { IssueData } from './fakeData/getAnIssue';
import Title from './Title';
import ReactLoading from 'react-loading';
import MarkdownItem from '../CreateIssue/MarkdownItem';
import MarkdownView from '../CreateIssue/MarkdownView';
import CommentMarkdown from './CommentMarkdown';
import CreateIssueView from '../CreateIssue/CreateIssueView';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';
import AssigneeMenu from './AssigneeMenu';

const NewIssueContainer = () => {
  console.count('rendered');
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
  const { data: assignees } = useGetListAssigneesQuery({
    userName: userInfo.user_name,
    // repo: userInfo.chosenRepo,
    repo: 'TEST',
    token: userInfo.token,
  });
  const { data: labels } = useGetAnIssueLabelsQuery({
    userName: userInfo.user_name,
    // repo: userInfo.chosenRepo,
    issue_number: 58,
    repo: 'TEST',
    token: userInfo.token,
  });

  console.log('issueData', issueData?.assignees);

  if (isSuccess)
    return (
      <div className=' p-[16px] pb-[180px] max-w-[1280px] mx-auto '>
        <Title {...(issueData as IssueData)} />
        <div className='flex flex-col md:flex-row'>
          <div className=' grow mr-8'>
            {comments?.map((comment) => (
              <CommentBlock {...comment} key={comment.id} />
            ))}
            <CommentMarkdown userInfo={userInfo} />
          </div>
          <div className='grow'>
            <AssigneeMenu
              assignees={assignees}
              clickedAssignees={issueData?.assignees}
            />
          </div>
        </div>
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
