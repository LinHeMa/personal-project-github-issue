import React from 'react';
import MenuItem from '../CreateIssue/MenuItem';

const DevelpomentMenu = () => {
  return (
    <div className='border-b border-solid border-stone-300 pb-4'>
      <MenuItem>
        <MenuItem.Title
          source={{
            title: 'Development',
            default: 'No branches or pull requests',
          }}
          isLabel={false}
        />
        <MenuItem.Toggle>
          <MenuItem.List>
            <MenuItem.ListTitle>Apply labels to this page</MenuItem.ListTitle>
            <MenuItem.SearchBar />
          </MenuItem.List>
        </MenuItem.Toggle>
      </MenuItem>
    </div>
  );
};

export default DevelpomentMenu;
