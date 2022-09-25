import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  line-height: 30px;
  font-size: 14px;
  padding: 0 8px;
  padding-bottom: 7px;
  &:nth-child(2) {
    border-bottom: 2px solid #fd8c73;
  }
  color: #24292f;
  margin-right: 8px;
`;

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 30px;
  border: 0;
  border-radius: 6px;
  padding: 0 8px;
  white-space: nowrap;
  ${Wrapper}:hover & {
    background-color: rgba(208, 215, 222, 0.32);
  }
`;

interface TabsProps {
  icon: ReactNode;
  text: string;
  // TODO
  // number: number;
}

const Tabs = ({ icon, text }: TabsProps) => {
  return (
    <Wrapper>
      <TabWrapper>
        {icon}
        {text}
      </TabWrapper>
    </Wrapper>
  );
};

export default Tabs;
