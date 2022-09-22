import { TriangleDownIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';
import FunctionBar from './FunctionBar';

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 24px;
  padding: 0 16px;
  @media screen and (max-width: 1011px) {
    padding: 0 24px;
  }
  @media screen and (max-width: 767px) {
    padding: 0 32px;
  }
`;
const ContentContainer = styled.div`
`;

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
  font-size: 14px;
  color: #57606a;
`;

const LabelContent = () => {
  return (
    <Wrapper>
      <FunctionBar />
      <ContentContainer>
        <Title>
          <LabelCount>15 labels</LabelCount>
          <SortBtn>
            Sort <TriangleDownIcon />
          </SortBtn>
        </Title>
      </ContentContainer>
    </Wrapper>
  );
};

export default LabelContent;
