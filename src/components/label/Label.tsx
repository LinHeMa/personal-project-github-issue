import React from 'react';
import styled from 'styled-components';

interface WrapperProps {
  borderColor?: string;
  color?: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  padding: 0 7px;
  line-height: 18px;
  white-space: nowrap;
  color: ${(props) => props.color};
  border-radius: 2em;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
`;

interface LabelProps {
  text: string;
  borderColor?: string;
  color?: string;
}

const Label = ({ text, borderColor, color }: LabelProps) => {
  return (
    <Wrapper borderColor={borderColor} color={color}>
      {text}
    </Wrapper>
  );
};

export default Label;
