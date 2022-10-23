import { MilestoneIcon, SearchIcon, TagIcon } from '@primer/octicons-react';
import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { LabelsList } from '../../sevices/api/labelApi';
import {
  initializeLabelList,
  searchLables
} from '../../slices/labelSlice/LabelList';
import BiFunctionButton from '../Button/BiFunctionButton';
import Button from '../Button/Button';
import ContentItem from './ContentItem';

const Wrapper = styled.div`
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
  @media screen and (min-width: 680px) and (max-width: 767px) {
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
  @media screen and (min-width: 1011px) {
    margin-right: 8px;
  }
`;

const NewLabelWrapper = styled.div`
  order: 2;
`;

const CreateWrapper = styled.div`
  display: flex;
  width: 100%;
  order: 4;
  background-color: #f6f8fa;
  margin-top: 24px;
`;

type FunctionBarProps = {
  data?: LabelsList[];
};

const FunctionBar = ({ data }: FunctionBarProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <DoubleBtn>
        <BiFunctionButton
          iconLeft={<Tag />}
          iconRight={<MileStone />}
          textLeft='Labels'
          textRight='Milestones'
          numberLeft={0}
          numberRight={0}
        />
      </DoubleBtn>
      <SearchWrapper>
        <Icon />
        <SearchBar
          value={searchParams}
          onChange={(e) => {
            setSearchParams(e.target.value);
            if (e.target.value === '')
              return dispatch(initializeLabelList(data!));
            dispatch(searchLables(e.target.value));
          }}
          placeholder='Search all labels'
        />
      </SearchWrapper>

      <NewLabelWrapper onClick={() => setIsCreating((prev) => !prev)}>
        <NewLabel
          text='New label'
          hasDropDown={false}
          bgColor='#2da44e'
          color='#ffffff'
          hoverBgColor='#2c974b;'
          fontSize='14px'
        />
      </NewLabelWrapper>
      {isCreating && (
        <CreateWrapper>
          <ContentItem
            id={0}
            url={'url'}
            name='Lable preview'
            color='c2e0c6'
            description=''
            isLight={false}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        </CreateWrapper>
      )}
    </Wrapper>
  );
};

export default FunctionBar;
