import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../sevices/api/issueApi';
import { editAssignee } from '../../slices/issueSlice/issueSlice';
import MenuItem from '../CreateIssue/MenuItem';

type assigneeMenuProps = {
  assignees?: User[];
  clickedAssignees?: User[];
};

const AssigneeMenu = ({ assignees, clickedAssignees }: assigneeMenuProps) => {
  const dispatch = useAppDispatch();
  const handleAddAssignee = (assignee: string) => {
    dispatch(editAssignee(assignee));
  };
  const clickedAssigneesToString = useAppSelector(
    (state) => state.createIssueAction.assignees,
  );
  return (
    <div>
      <div className='border-b border-solid border-stone-300'>
        <MenuItem>
          <MenuItem.Title
            clickedArray={clickedAssignees}
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
                      clickedArray={clickedAssigneesToString}
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
    </div>
  );
};

export default AssigneeMenu;
