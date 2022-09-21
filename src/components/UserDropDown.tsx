import React from 'react';
import styled from 'styled-components';

const Hr = styled.hr`
  width: 110%;
  border: 0.5px solid #d0d7de;
`;

const dorpDownMenu = [
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  width: 180px;
  background-color: #fff;
  border: 1px solid #d0d7de;
  border-radius: 10px 10px 10px 10px;
  padding-bottom: 8px;
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
  }
  &:nth-child(9) {
    padding: 0;
    margin: 8px 0;
  }
`;

const UserDropDown = () => {
  return (
    <Container>
      <Item>
        Signed in as <Strong>LinHeMa</Strong>
      </Item>
      {dorpDownMenu.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
      <Item>Sign out</Item>
    </Container>
  );
};

export default UserDropDown;
