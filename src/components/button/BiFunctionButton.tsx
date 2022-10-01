import { TriangleDownIcon } from '@primer/octicons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  line-height: 20px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px 0 0 6px;
  color: #24292f;
  /* color: #f3f4f6; */
  background-color: #f6f8fa;

  /* background-color: #0969da; */
  padding: 5px 16px;
  font-weight: 500;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Right = styled.div`
  display: flex;
  font-weight: 500;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  line-height: 20px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 0 6px 6px 0;
  border-left: none;
  color: #24292f;
  /* background-color: #f6f8fa; */
  padding: 3px 8px;
  &:hover {
    background-color: #f3f4f6;
  }
`;
export const Notification = styled.div`
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

interface BifunctionButtonProps {
  icon: React.ReactNode;
  text: string;
  number?: number;
  hasDropDown?: boolean;
  iconRight: React.ReactNode;
  textRight: string;
  numberRight?: number;
}

const BiFunctionButton = ({
  icon,
  text,
  number,
  hasDropDown = false,
  iconRight,
  textRight,
  numberRight,
}: BifunctionButtonProps) => {
  return (
    <Wrapper>
      <Left>
        {icon}
        {text}
        {number !== undefined ? <Notification>{number}</Notification> : null}
      </Left>
      <Right>
        {iconRight}
        {textRight}
        {numberRight !== undefined ? (
          <Notification>{numberRight}</Notification>
        ) : null}
      </Right>
    </Wrapper>
  );
};

export default BiFunctionButton;
