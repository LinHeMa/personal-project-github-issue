import { useGetListAssigneesQuery } from '../../sevices/api/issueApi';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';
import CreateIssueView from './CreateIssueView';
import MarkdownView from './MarkdownView';

const CreateIssueContainer = () => {
  const { data: assignees } = useGetListAssigneesQuery('');
  const { data: labels } = useGetLabelListQuery({
    name: 'LinHeMa',
    repo: 'TEST',
  });
  return (
    <div className='flex flex-col p-8 pb-[200px] md:container md:mx-auto  md:flex-row'>
      <MarkdownView />
      <CreateIssueView assignees={assignees} labels={labels} />
    </div>
  );
};

export default CreateIssueContainer;
