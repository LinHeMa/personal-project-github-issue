import CreateIssueView from './CreateIssueView';
import MarkdownView from './MarkdownView';

const CreateIssueContainer = () => {

  
  return (
    <div className='p-8 pb-[200px] md:flex'>
      <MarkdownView />
      <CreateIssueView />
    </div>
  );
};

export default CreateIssueContainer;
