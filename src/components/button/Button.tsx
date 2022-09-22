import { TriangleDownIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';

interface WrapperProps {
  bgColor?: string;
  hoverColor?: string;
  fontSize?: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  white-space: nowrap;
  align-items: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '12px;')};
  font-weight: 500;
  cursor: pointer;
  line-height: 20px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  color: ${(props) => (props.color ? props.color : '#24292f;')};
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#f6f8fa;')};
  padding: 3px 12px;
  margin-right: 8px;
  &:hover {
    background-color: ${(props) =>
      props.hoverColor ? props.hoverColor : '#f3f4f6;'};
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
  icon?: React.ReactNode;
  text: string;
  number?: number;
  hasDropDown?: boolean;
  bgColor?: string;
  color?: string;
  hoverColor?: string;
  fontSize?: string;
}

const Button = ({
  icon,
  text,
  number,
  hasDropDown,
  bgColor,
  color,
  hoverColor,
  fontSize
}: ButtonProps) => {
  return (
    <Wrapper
      bgColor={bgColor}
      color={color}
      hoverColor={hoverColor}
      fontSize={fontSize}
    >
      {icon}
      {text}
      {number ? <Notification>{number}</Notification> : null}
      {hasDropDown ? <TriangleDownIcon verticalAlign='middle' /> : null}
    </Wrapper>
  );
};

export default Button;
