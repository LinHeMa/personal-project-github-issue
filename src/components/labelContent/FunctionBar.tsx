import { MilestoneIcon, SearchIcon, TagIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';
import BiFunctionButton from '../button/BiFunctionButton';
import Button from '../button/Button';

const Wrapper = styled.div`
  outline: 1px solid;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Tag = styled(TagIcon)`
  margin-right: 8px;
`;

const MileStone = styled(MilestoneIcon)`
  margin-right: 8px;
`;

const SearchWrapper = styled.div`
  position: relative;
  height: 32px;
  padding: 5px 12px 5px 32px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: #f6f8fa;
  width: 320px;
  display: flex;
  margin-right: auto;
  @media screen and (max-width: 767px) {
    margin-top: 16px;
    order: 3;
  }
  @media screen and (min-width: 680px) and (max-width: 767px){
    margin-right: 100px;
  }
`;

const SearchBar = styled.input`
  height: 20px;
  border: 0;
  background-color: #f6f8fa;
  width: 100%;
  outline: 0;
`;

const Icon = styled(SearchIcon)`
  position: absolute;
  left: 8px;
  top: 7px;
`;

const NewLabel = styled(Button)`
  margin-left: auto;
`;

const DoubleBtn = styled.div`
  order: -1;
`;

const NewLabelWrapper = styled.div`
  order: 2;
`;

const FunctionBar = () => {
  return (
    <Wrapper>
      <DoubleBtn>
        <BiFunctionButton
          icon={<Tag />}
          iconRight={<MileStone />}
          text='Labels'
          textRight='Milestones'
        />
      </DoubleBtn>
      <SearchWrapper>
        <Icon />
        <SearchBar placeholder='Search all labels' />
      </SearchWrapper>

      <NewLabelWrapper>
        <NewLabel
          text='New label'
          hasDropDown={false}
          bgColor='#2da44e'
          color='#ffffff'
          hoverColor='#2c974b;'
          fontSize='14px'
        />
      </NewLabelWrapper>
    </Wrapper>
  );
};

export default FunctionBar;
