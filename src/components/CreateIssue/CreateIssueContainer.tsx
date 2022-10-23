import _ from 'lodash';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useGetListAssigneesQuery } from '../../sevices/api/issueApi';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';
import { newIssue } from '../../slices/issueSlice/issueSlice';
import CreateIssueView from './CreateIssueView';
import MarkdownView from './MarkdownView';

const CreateIssueContainer = () => {
  const userName = JSON.parse(sessionStorage.getItem('user')!);
  const repo = JSON.parse(sessionStorage.getItem('repo')!);
  const token = _.get(
    JSON.parse(localStorage.getItem('supabase.auth.token')!),
    ['currentSession', 'provider_token'],
  );
  const { data: assignees } = useGetListAssigneesQuery({
    userName,
    repo,
    token,
  });
  const { data: labels } = useGetLabelListQuery({
    name: userName,
    repo,
    token,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(newIssue());
  }, []);
  return (
    <div className='flex flex-col p-8 pb-[200px] md:mx-auto md:flex-row lg:px-[26px]'>
      <MarkdownView hasInput minHeight='' />
      <CreateIssueView assignees={assignees} labels={labels} />
    </div>
  );
};

export default CreateIssueContainer;
