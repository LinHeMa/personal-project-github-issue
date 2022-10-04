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
}

export function Menu({ source }: Menu) {
  return (
    <div>
      <MenuItem>
        <div className=' relative flex w-full justify-between border-b border-solid border-stone-300 py-8 px-6'>
          <MenuItem.Title source={source} />
          <MenuItem.Toggle>
            <MenuItem.List>
              <MenuItem.ListTitle>
                Assign up to 10 people to this issue
              </MenuItem.ListTitle>
              <MenuItem.SearchBar />
              <MenuItem.Subtitle>Suggestions</MenuItem.Subtitle>
              <MenuItem.Item>LinHeMa</MenuItem.Item>
              <MenuItem.Item>athenacheng15</MenuItem.Item>
            </MenuItem.List>
          </MenuItem.Toggle>
        </div>
      </MenuItem>
    </div>
  );
}

const CreateIssueView = () => {
  return (
    <div className='flex flex-col'>
      {sideBarList.map((item, index) => (
        <Menu source={item} key={index} />
      ))}
    </div>
  );
};

export default CreateIssueView;
