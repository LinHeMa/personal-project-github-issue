import React from 'react';
import { issueData } from './fakeData/getAnIssue';
import Title from './Title';

const NewIssueContainer = () => {
  return (
    <div className='container mx-auto'>
      <Title {...issueData} />
    </div>
  );
};

export default NewIssueContainer;
