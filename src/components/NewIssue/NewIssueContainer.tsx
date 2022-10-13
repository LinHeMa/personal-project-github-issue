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
import LabelMenu from './LabelMenu';
import ProjectsMenu from './ProjectsMenu';
import MileStoneMenu from './MileStoneMenu';
import DevelpomentMenu from './DevelopmentMenu';
import Participants from './Participants';
import IssueControlMenu from './IssueControlMenu';

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
  const { data: labels } = useGetLabelListQuery({
    name: userInfo.user_name,
    // repo: userInfo.chosenRepo,
    repo: 'TEST',
    token: userInfo.token,
  });
  console.log('issueData', issueData?.labels);

  if (isSuccess)
    return (
      <div className=' mx-auto max-w-[1280px] p-[16px] pb-[180px] '>
        <Title {...(issueData as IssueData)} />
        <div className='flex flex-col md:flex-row'>
          <div className='md:mr-8 md:w-full'>
            {comments?.map((comment) => (
              <CommentBlock {...comment} key={comment.id} />
            ))}
            <CommentMarkdown userInfo={userInfo} />
          </div>
          <div className=' md:max-w-[300px]'>
            <AssigneeMenu
              assignees={assignees}
              clickedAssignees={issueData?.assignees}
            />
            <LabelMenu labels={labels} clickedLabelsArray={issueData?.labels} />
            <ProjectsMenu />
            <MileStoneMenu />
            <DevelpomentMenu />
            <Participants comments={comments} />
            <IssueControlMenu />
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
