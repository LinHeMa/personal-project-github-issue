import React from 'react';
import styled from 'styled-components';

interface BifunctionButtonProps extends RightProps {
  iconLeft: React.ReactNode;
  textLeft: string;
  numberLeft?: number;
  textRight?: string;
  iconRight?: React.ReactNode;
  numberRight?: number;
}

interface RightProps {
  $bgColorRight?: string;
}

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
  background-color: #f6f8fa;
  padding: 5px 16px;
  font-weight: 500;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Right = styled.div<RightProps>`
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
  background-color: ${(props) =>
    props.$bgColorRight ? props.$bgColorRight : '#f6f8fa'};
  padding: 3px 8px;
  &:hover {
    background-color: #f3f4f6;
  }
`;
export const Notification = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 50%;
  background-color: #1b1f2414;
  margin-left: 2px;
  margin-right: 4px;
`;

const BiFunctionButton = ({
  iconLeft,
  textLeft,
  numberLeft,
  iconRight,
  textRight,
  numberRight,
  $bgColorRight,
}: BifunctionButtonProps) => {
  return (
    <Wrapper>
      <Left>
        <span className='mr-2'>{iconLeft}</span>
        {textLeft}
        {numberLeft !== 0 ? (
          <Notification>{numberLeft}</Notification>
        ) : null}
      </Left>
      <Right $bgColorRight={$bgColorRight}>
        {iconRight}
        {textRight}
        {numberRight !== 0 ? (
          <Notification>{numberRight}</Notification>
        ) : null}
      </Right>
    </Wrapper>
  );
};

export default BiFunctionButton;
