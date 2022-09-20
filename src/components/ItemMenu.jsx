import React from 'react';
import styled from 'styled-components';

const itemList = [
  'Dashboard',
  'Pull request',
  'Issues',
  'Codespaces',
  'Marketplace',
  'Explore',
  'Sponsors',
  'Settings',
  'LinHeMa',
  'Sign out'
];

const Conatainer = styled.div`
  ${(props) => props.hideOnDesktop && 'display: none;'}
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    background-color: #24292f;
    color: #ffffff;
    padding: 16px;
  }
`;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 38px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 0;
  border-top: 1px solid #45494e;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const ItemMenu = () => {
  return (
    <Conatainer hideOnDesktop>
      {itemList.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
    </Conatainer>
  );
};

export default ItemMenu;
