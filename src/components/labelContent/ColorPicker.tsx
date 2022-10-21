import React, { useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../utils/hooks/useOnClidkOutside';

const defaultColor = [
  '#b60205',
  '#d93f0b',
  '#fbca04',
  '#0e8a16',
  '#006b75',
  '#1d76db ',
  '#0052cc',
  '#5319e7',
  '#e99695',
  '#f9d0c4',
  '#fef2c0',
  '#c2e0c6 ',
  '#bfdadc',
  '#c5def5',
  '#bfd4f2',
  '#d4c5f9'
];

interface ColorBtn {
  $color: string;
}

const ColorBtn = styled.div<ColorBtn>`
  cursor: pointer;
  background-color: ${(props) => props.$color};
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  border-radius: 4px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 214px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 12px;
  color: #57606a;
  margin-bottom: 8px;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 30px;
  top: 50px;
  display: flex;
  padding: 8px 8px 0 8px;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #d0d7de;
  border-radius: 6px;
`;

type ColorPickerProps = {
  setLabelColor: React.Dispatch<React.SetStateAction<string>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  setLabelColor,
  setVisible
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setVisible(false);
  });
  return (
    <Wrapper ref={ref}>
      <Title>Choose from default colors:</Title>
      <BtnWrapper>
        {defaultColor.map((color) => (
          <ColorBtn
            key={color}
            $color={color}
            onClick={() => setLabelColor(color)}
          />
        ))}
      </BtnWrapper>
    </Wrapper>
  );
};

export default ColorPicker;
