import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addAssignee, addLabel } from '../../feature/Label/createIssueSlice';
import { User } from '../../sevices/api/issueApi';
import { LabelsList } from '../../sevices/api/labelApi';
import Label from '../label/Label';
import MenuItem from './MenuItem';

const sideBarList = [
  { title: 'Assignees', default: 'No one' },
  { title: 'Labels', default: 'None yet' },
  { title: 'Projects', default: 'None yet' },
  { title: 'Milestone', default: 'No milestone' },
  {
    title: 'Development',
    default: 'Shows branches and pull requests linked to this issue',
  },
  { title: 'Helpful resources', default: 'Github Community Guidelines' },
];

interface source {
  title: string;
  default: string;
}

interface Menu {
  source: source;
  hasSearchBar: boolean;
  assignees?: User[];
  labeles?: LabelsList[];
}

export function Menu({ source }: Menu) {
  return (
    <div>
      <MenuItem>
        <div className=' relative flex w-full justify-between border-b border-solid border-stone-300 py-8 px-6'>
          <MenuItem.Title source={source} isLabel={false} />
          <MenuItem.Toggle>
            <MenuItem.List>
              <MenuItem.ListTitle>
                Assign up to 10 people to this issue
              </MenuItem.ListTitle>
              <MenuItem.SearchBar />
              <MenuItem.Subtitle>Suggestions</MenuItem.Subtitle>
            </MenuItem.List>
          </MenuItem.Toggle>
        </div>
      </MenuItem>
    </div>
  );
}
interface CreateIssueView {
  assignees?: User[];
  labels?: LabelsList[];
}

const CreateIssueView = ({ assignees, labels }: CreateIssueView) => {
  const dispatch = useAppDispatch();
  const handleAddLabel = (lable: string) => {
    dispatch(addLabel(lable));
  };
  const handleAddAssignee = (assignee: string) => {
    dispatch(addAssignee(assignee));
  };
  const labelsArray = useAppSelector((state) => state.createIssueAction.labels);
  const assigneesArray = useAppSelector(
    (state) => state.createIssueAction.assignees,
  );
  const labelClickedArray = _.filter(labels, (label) =>
    _.includes(labelsArray, label.name),
  );
  const assigneeClickedArray = _.filter(assignees, (assignee) =>
    _.includes(assigneesArray, assignee.login),
  );
  console.log('assigneesArray', assigneesArray);
  console.log('labelsArray', labelsArray);
  return (
    <div className='flex w-full flex-col md:w-[240px] lg:w-[256px]'>
      <div className='border-b border-solid border-stone-300'>
        <MenuItem>
          <MenuItem.Title
            clickedArray={assigneeClickedArray}
            source={{ title: 'Assignees', default: 'No one' }}
            isLabel={false}
          />
          <MenuItem.Toggle>
            <MenuItem.List>
              <MenuItem.ListTitle>
                Assign up to 10 people to this issue
              </MenuItem.ListTitle>
              <MenuItem.SearchBar />
              <MenuItem.Subtitle>Suggestions</MenuItem.Subtitle>
              <div className=''>
                {assignees?.map(({ login, avatar_url }, index) => {
                  return (
                    <MenuItem.Item
                      key={index}
                      hasColor={false}
                      hasImg={true}
                      clickFn={(assignee: string) =>
                        handleAddAssignee(assignee)
                      }
                      img={avatar_url}
                      clickedArray={assigneesArray}
                    >
                      {login}
                    </MenuItem.Item>
                  );
                })}
              </div>
            </MenuItem.List>
          </MenuItem.Toggle>
        </MenuItem>
      </div>
      <div className='border-b border-solid border-stone-300 pb-4'>
        <MenuItem>
          <MenuItem.Title
            source={{ title: 'Labels', default: 'None yet' }}
            clickedArray={labelClickedArray}
            isLabel={true}
          />
          <MenuItem.Toggle>
            <MenuItem.List>
              <MenuItem.ListTitle>Apply labels to this page</MenuItem.ListTitle>
              <MenuItem.SearchBar />
              <div className=' '>
                {labels?.map(({ name, color }, index) => {
                  return (
                    <MenuItem.Item
                      key={index}
                      color={color}
                      hasColor={true}
                      hasImg={false}
                      clickFn={(label: string) => handleAddLabel(label)}
                      clickedArray={labelsArray}
                    >
                      {name}
                    </MenuItem.Item>
                  );
                })}
              </div>
            </MenuItem.List>
          </MenuItem.Toggle>
        </MenuItem>
      </div>
    </div>
  );
};

export default CreateIssueView;
