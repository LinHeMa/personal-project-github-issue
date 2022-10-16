import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addLabel } from '../../feature/Label/createIssueSlice';
import { Label } from '../../sevices/api/issueApi';
import { LabelsList } from '../../sevices/api/labelApi';
import MenuItem from '../CreateIssue/MenuItem';

type LabelMenuProps = {
  labels?: LabelsList[];
  clickedLabelsArray?: Label[];
};

const LabelMenu = ({ labels, clickedLabelsArray }: LabelMenuProps) => {
  const dispatch = useAppDispatch();
  const handleAddLabel = (lable: string) => {
    dispatch(addLabel(lable));
  };
  const clickedLabelsArrayToString = useAppSelector(
    (state) => state.createIssueAction.labels,
  );

  return (
    <div className='border-b border-solid border-stone-300 pb-4'>
      <MenuItem>
        <MenuItem.Title
          source={{ title: 'Labels', default: 'None yet' }}
          clickedArray={clickedLabelsArray as LabelsList[]}
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
                    clickedArray={clickedLabelsArrayToString}
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
  );
};

export default LabelMenu;
