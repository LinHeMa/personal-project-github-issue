import { TriangleDownIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  line-height: 20px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  color: #24292f;
  background-color: #f6f8fa;
  padding: 3px 12px;
  margin-right: 8px;
  &:hover {
    background-color: #f3f4f6;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const Notification = styled.div`
  width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 50%;
  background-color: #1b1f2414;
  margin-left: 2px;
  margin-right: 4px;
`;

export interface ButtonProps {
  icon: React.ReactNode;
  text: string;
  number?: number;
  hasDropDown: boolean;
}

const Button = ({ icon, text, number, hasDropDown }: ButtonProps) => {
  return (
    <Wrapper>
      {icon}
      {text}
      {number ? <Notification>{number}</Notification> : null}
      {hasDropDown ? <TriangleDownIcon verticalAlign='middle' /> : null}
    </Wrapper>
  );
};

export default Button;
