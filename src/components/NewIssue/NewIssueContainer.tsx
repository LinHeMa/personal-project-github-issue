import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  useDeleteCommentMutation,
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
import { useBoolean } from 'usehooks-ts';
import _ from 'lodash';

const NewIssueContainer = () => {
  const sessionRepo = JSON.parse(sessionStorage.getItem('repo')!);
  const sessionUser = JSON.parse(sessionStorage.getItem('user')!);
  const [isEdit, setIsEdit] = useState(false);
  console.count('rendered');
  //  TODO use variables
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const { data: issueData, isSuccess } = useGetAnIssuesQuery({
    userName: sessionUser,
    repo: sessionRepo,
    token: userInfo.token,
    issueId: 58,
  });
  const { data: comments } = useGetCommentsQuery({
    userName: sessionUser,
    repo: sessionRepo,
    token: userInfo.token,
    issueId: 58,
  });
  const { data: assignees } = useGetListAssigneesQuery({
    userName: sessionUser,
    repo: sessionRepo,
    token: userInfo.token,
  });
  const { data: labels } = useGetLabelListQuery({
    name: sessionUser,
    repo: sessionRepo,
    token: userInfo.token,
  });

  const firstIssue = {
    body: issueData?.body,
    user: issueData?.user,
    created_at: issueData?.created_at,
    updated_at: issueData?.updated_at,
    author_association: issueData?.author_association,
    reactions: issueData?.reactions,
  };
  function returnEditStatus(status: boolean) {
    setIsEdit(status);
  }
  const editingComments = useAppSelector((state) => state.updateIssueAction);

  console.log('comments:', comments);
  if (isSuccess)
    return (
      <div className=' mx-auto max-w-[1280px] p-[16px] pb-[180px] '>
        <Title {...(issueData as IssueData)} isSuccess={isSuccess} />
        <div className='flex flex-col md:flex-row'>
          <div className='md:mr-8 md:w-full'>
            <CommentBlock {...firstIssue} />
            {comments?.map((comment) => (
              <CommentBlock
                {...comment}
                key={comment.id}
                returnEditStatus={returnEditStatus}
              />
            ))}
            <CommentMarkdown avatar_url={userInfo.avatar_url} />
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
