import { SmileyIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';

const Hr = styled.hr`
  width: 110%;
  border: 0.5px solid #d0d7de;
`;

export const dropDownMenu = [
  'Your profile',
  'Your repositories',
  'Your codespaces',
  'Your organizations',
  'Your projects',
  'Your stars',
  'Your gitst',
  <Hr key='hr' />,
  'Upgrade',
  'Feature preview',
  'Help',
  'Settings'
];

const Container = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  width: 180px;
  background-color: #fff;
  border: 1px solid #d0d7de;
  border-radius: 10px 10px 10px 10px;
  padding-bottom: 8px;
  position: relative;
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

const Strong = styled.strong`
  display: inline;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 178px;
  background-color: transparent;
  white-space: pre;
  line-height: 1.5;
  padding: 4px 8px 4px 16px;
  &:hover {
    background-color: #0969da;
    color: #ffffff;
  }
  &:first-child {
    pointer-events: none;
    padding: 8px 16px;
    border-bottom: 1px solid #d0d7de;
    margin-bottom: 8px;
  }
  &:nth-child(2) {
    /* pointer-events: none; */
    &:hover {
      background-color: #fff;
    }
    border-bottom: 1px solid #d0d7de;
  }
  &:nth-child(8) {
  }
`;
const Status = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 31px;
  padding: 4px 8px;
  background-color: #ffffff;
  color: #57606a;
  border: 1px solid #d0d7de;
  border-radius: 5px;
  margin: 8px 0px;
  margin-top: 0;
  cursor: pointer;
  &:hover {
    color: rgb(14, 81, 208);
  }
`;

const SmileIcon = styled(SmileyIcon)`
  margin-right: 4px;
`

interface UserDropDonw {
  dropDownMenu: (string | JSX.Element)[];
}

const UserDropDown = ({ dropDownMenu }: UserDropDonw) => {
  return (
    <Container>
      <Item>
        Signed in as <Strong>LinHeMa</Strong>
      </Item>
      <Item>
        <Status>
          <SmileIcon size={16} /> Set status
        </Status>
      </Item>
      {dropDownMenu.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
      <Item>Sign out</Item>
    </Container>
  );
};

export default UserDropDown;
