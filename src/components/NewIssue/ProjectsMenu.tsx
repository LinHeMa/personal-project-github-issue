import React from 'react';
import MenuItem from '../CreateIssue/MenuItem';

const ProjectsMenu = () => {
  return (
    <div className='border-b border-solid border-stone-300 pb-4'>
      <MenuItem>
        <MenuItem.Title
          source={{ title: 'Projects', default: 'None yet' }}
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

export default ProjectsMenu;
