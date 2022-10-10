import { useAppSelector } from '../../app/hooks';
import { useGetListAssigneesQuery } from '../../sevices/api/issueApi';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';
import CreateIssueView from './CreateIssueView';
import MarkdownView from './MarkdownView';

const CreateIssueContainer = () => {
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const { data: assignees } = useGetListAssigneesQuery({
    userName: userInfo.user_name,
    repo: userInfo.chosenRepo,
    token: userInfo.token,
  });
  const { data: labels } = useGetLabelListQuery({
    name: userInfo.user_name,
    repo: userInfo.chosenRepo,
    token: userInfo.token,
  });
  return (
    <div className='flex flex-col p-8 pb-[200px] md:container md:mx-auto  md:flex-row'>
      <MarkdownView />
      <CreateIssueView assignees={assignees} labels={labels} />
    </div>
  );
};

export default CreateIssueContainer;
