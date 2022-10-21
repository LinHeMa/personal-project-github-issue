import { TriangleDownIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';
import { ButtonProps } from './Button';

const Wrapper = styled.div`
  display: flex;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  line-height: 20px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px 0 0 6px;
  color: #24292f;
  background-color: #f6f8fa;
  padding: 3px 12px;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  line-height: 20px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 0 6px 6px 0;
  border-left: none;
  color: #24292f;
  background-color: #f6f8fa;
  padding: 3px 8px;
  &:hover {
    background-color: #f3f4f6;
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
const DoubleButton = ({
  icon,
  text,
  number,
  hasDropDown = false
}: ButtonProps) => {
  return (
    <Wrapper>
      <Left>
        {icon}
        {text}
        {number !== undefined ? <Notification>{number}</Notification> : null}
      </Left>
      <Right>
        <TriangleDownIcon />
      </Right>
    </Wrapper>
  );
};

export default DoubleButton;
