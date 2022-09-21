import { CodeIcon } from '@primer/octicons-react';
import { number } from 'prop-types';
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
  color: #24292f;
  margin-right: 8px;
  &::before {
    /* border-bottom: 2px solid #fd8c73; */
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    min-height: 48px;
    content: '';
    transform: translateX(-50%) translateY(-50%);
  }
`;

const TabWrapper = styled.div`
  line-height: 30px;
  border: 0;
  border-radius: 6px;
  padding: 0 8px;
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
