import React from 'react';
import styled from 'styled-components';

interface WrapperProps {
  borderColor?: string;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '500')};
  padding: 0 7px;
  line-height: 18px;
  white-space: nowrap;
  color: ${(props) => props.color};
  background-color: ${(props) => (props.bgColor ? props.bgColor : '')};
  border-radius: 2em;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
`;

interface LabelProps {
  text: string;
  borderColor?: string;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
}

const Label = ({
  text,
  borderColor,
  color,
  bgColor,
  fontWeight,
  fontSize
}: LabelProps) => {
  return (
    <Wrapper
      borderColor={borderColor}
      color={color}
      bgColor={bgColor}
      fontWeight={fontWeight}
      fontSize={fontSize}
    >
      {text}
    </Wrapper>
  );
};

export default Label;
