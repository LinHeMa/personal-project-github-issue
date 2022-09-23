import { TriangleDownIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import FunctionBar from './FunctionBar';
import { labelInfo } from './FakeLabelsInfo';
import SortDropdown from './SortDropdown';
import { useGetLabelListQuery } from '../../feature/Label/LabelListSlice';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 24px;
  padding: 0 16px;
  padding-bottom: 143px;
  @media screen and (max-width: 1011px) {
    padding: 0 24px 143px;
  }
  @media screen and (max-width: 767px) {
    padding: 0 32px 183px;
  }
`;
const ContentContainer = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f6f8fa;
  padding: 16px;
  border: 1px solid #d0d7de;
  border-radius: 6px 6px 0 0;
`;
const LabelCount = styled.h1`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: #24292f;
`;

const SortBtn = styled.div`
  position: relative;
  font-size: 14px;
  color: #57606a;
  cursor: pointer;
`;

const LabelContent = () => {
  const { data, isError, isFetching, isSuccess } =
    useGetLabelListQuery('LinHeMa');
  if (isFetching) console.log('success');
  if (isSuccess) console.table(data);
  const navigate = useNavigate();
  if (isError) {
    navigate('/ErrorPage');
  }
  return (
    <Wrapper>
      <FunctionBar />
      <ContentContainer>
        <Title>
          <LabelCount>15 labels</LabelCount>
          <SortBtn>
            Sort <TriangleDownIcon />
            {/* <SortDropdown /> */}
          </SortBtn>
        </Title>
      </ContentContainer>
      {data?.map(({ id, url, name, color, description }) => (
        <ContentItem
          key={id}
          id={id}
          url={url}
          name={name}
          color={color}
          description={description}
        />
      ))}
    </Wrapper>
  );
};

export default LabelContent;
