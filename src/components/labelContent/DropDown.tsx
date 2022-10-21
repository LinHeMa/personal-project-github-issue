import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  right: 77px;
  top: 49px;
  color: black;
  background-color: #fff;
  width: 160px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 4px 0px;
  &:after {
    border-right: solid 10px transparent;
    border-left: solid 10px transparent;
    border-bottom: solid 10px #ffffff;
    transform: translateX(-50%);
    position: absolute;
    z-index: 1;
    content: '';
    top: -10px;
    right: 0px;
    height: 0;
    width: 0;
  }
`;

const Item = styled.div`
  padding: 4px 8px 4px 16px;
  display: flex;
  justify-content: flex-start;
  &:hover {
    background-color: #0969da;
    color: #ffffff;
  }
`;
interface DropProps {
  list: (string | JSX.Element)[];
  ref: React.MutableRefObject<null>;
}

const DropDown: React.FC<DropProps> = ({ list }: DropProps) => {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
    </Wrapper>
  );
};

export default DropDown;
