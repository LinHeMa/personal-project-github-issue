import { useAppSelector } from '../../app/hooks';
import { useGetListAssigneesQuery } from '../../sevices/api/issueApi';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';
import CreateIssueView from './CreateIssueView';
import MarkdownView from './MarkdownView';

const CreateIssueContainer = () => {
  const userToken = useAppSelector((state) => state.userInfoAction.token);
  const { data: assignees } = useGetListAssigneesQuery(`${userToken}`);
  const { data: labels } = useGetLabelListQuery({
    name: 'LinHeMa',
    repo: 'TEST',
    token: userToken,
  });
  return (
    <div className='flex flex-col p-8 pb-[200px] md:container md:mx-auto  md:flex-row'>
      <MarkdownView />
      <CreateIssueView assignees={assignees} labels={labels} />
    </div>
  );
};

export default CreateIssueContainer;
