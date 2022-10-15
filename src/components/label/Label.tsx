import styled from 'styled-components';
import _ from 'lodash';
interface WrapperProps {
  borderColor?: string;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  isLight?: boolean;
  $labelColor?: string;
  $isWhite?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  width: fit-content;
  align-items: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '12px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '500')};
  padding: 0 7px;
  line-height: 20px;
  height: max-content;
  margin-right: 4px;
  white-space: nowrap;
  color: ${(props) =>
    props.isLight || props.$isWhite ? props.color : '#000000'};
  background-color: ${(props) => props.bgColor};
  background-color: ${(props) => (props.$labelColor ? props.$labelColor : '')};
  border-radius: 2em;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    _.lowerCase(props.bgColor) === 'ffffff' ? '#d0d7de' : props.borderColor};
`;

interface LabelProps {
  text: string;
  borderColor?: string;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  isLight?: boolean;
  $labelColor?: string;
  $newName?: string;
  $isWhite?: boolean;
  // $newDescription: string;
}

const Label = ({
  text,
  borderColor,
  color,
  bgColor,
  fontWeight,
  fontSize,
  isLight,
  $labelColor,
  $newName,
  $isWhite,
}: LabelProps) => {
  return (
    <Wrapper
      borderColor={borderColor}
      color={color}
      bgColor={bgColor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      isLight={isLight}
      $labelColor={$labelColor}
      $isWhite={$isWhite}
    >
      {$newName ? $newName : text}
    </Wrapper>
  );
};

export default Label;
