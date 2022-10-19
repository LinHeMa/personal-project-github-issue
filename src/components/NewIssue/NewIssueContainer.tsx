import _ from 'lodash';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initializeIssue, resetAll } from '../../feature/issueSlice/issueSlice';
import {
  useGetAnIssuesQuery,
  useGetCommentsQuery,
  useGetListAssigneesQuery
} from '../../sevices/api/issueApi';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';
import AssigneeMenu from './AssigneeMenu';
import CommentBlock from './CommentBlock';
import CommentMarkdown from './CommentMarkdown';
import DevelpomentMenu from './DevelopmentMenu';
import { IssueData } from './fakeData/getAnIssue';
import IssueControlMenu from './IssueControlMenu';
import LabelMenu from './LabelMenu';
import MileStoneMenu from './MileStoneMenu';
import Participants from './Participants';
import ProjectsMenu from './ProjectsMenu';
import Title from './Title';

const NewIssueContainer = () => {
  const sessionRepo = JSON.parse(sessionStorage.getItem('repo')!);
  const sessionUser = JSON.parse(sessionStorage.getItem('user')!);
  const token = _.get(
    JSON.parse(localStorage.getItem('supabase.auth.token')!),
    ['currentSession', 'provider_token'],
  );
  const [isEdit, setIsEdit] = useState(false);
  const issueId = JSON.parse(sessionStorage.getItem('issueNumber')!);
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const { data: issueData, isSuccess } = useGetAnIssuesQuery({
    userName: sessionUser,
    repo: sessionRepo,
    token,
    issueId,
  });
  const { data: comments } = useGetCommentsQuery({
    userName: sessionUser,
    repo: sessionRepo,
    token,
    issueId,
  });
  const { data: assignees } = useGetListAssigneesQuery({
    userName: sessionUser,
    repo: sessionRepo,
    token,
  });
  const { data: labels } = useGetLabelListQuery({
    name: sessionUser,
    repo: sessionRepo,
    token,
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    let button = '';
    issueData?.state === 'open' ? (button = 'completed') : (button = 'reopen');
    dispatch(resetAll());
    const prevLabelsArray = issueData?.labels.map((label) => label.name);
    const prevAssigneesArray = issueData?.assignees.map(
      (assignee) => assignee.login,
    );
    dispatch(
      initializeIssue({
        title: issueData?.title,
        body: issueData?.body,
        assignees: prevAssigneesArray,
        labels: prevLabelsArray,
        state: issueData?.state as string,
        stateReason: issueData?.state_reason as string,
        buttonNow: button,
      }),
    );
  }, [issueData]);
  if (isSuccess)
    return (
      <div className=' mx-auto max-w-[1280px] p-[16px] pb-[250px] sm:pb-[180px]'>
        <Title {...(issueData as IssueData)} isSuccess={isSuccess} />
        <div className='flex flex-col md:flex-row'>
          <div className='md:mr-8 md:w-full'>
            <CommentBlock {...firstIssue} firstIssue />
            {comments?.map((comment) => (
              <CommentBlock
                {...comment}
                key={comment.id}
                returnEditStatus={returnEditStatus}
              />
            ))}
            <span id='bottom'>
              <CommentMarkdown avatar_url={userInfo.avatar_url} />
            </span>
          </div>
          <div className=' min-w-[256px] lg:min-w-[300px]'>
            <span>
              <AssigneeMenu
                assignees={assignees}
                clickedAssignees={issueData?.assignees}
              />
            </span>
            <span>
              <LabelMenu
                labels={labels}
                clickedLabelsArray={issueData?.labels}
              />
            </span>
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
