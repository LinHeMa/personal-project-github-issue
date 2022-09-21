import { SignOutIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';
import profileImg from '../images/github_avatar.png';
import SearchBar from './SearchBar';

const itemList = [
  'Dashboard',
  'Pull request',
  'Issues',
  'Codespaces',
  'Marketplace',
  'Explore',
  'Sponsors',
  'Settings'
];
interface ContainerProps {
  hideOnDesktop: boolean;
}
interface ProfileProps {
  img: string;
}
const Conatainer = styled.div<ContainerProps>`
  ${(props) => props.hideOnDesktop && 'display: none;'}
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    background-color: #24292f;
    color: #ffffff;
    padding: 16px;
  }
`;

const Profile = styled.div<ProfileProps>`
  background-image: url(${(props) => props.img});
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 3px;
`;

const Signout = styled(SignOutIcon)`
  margin-right: 3px;
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
      <SearchBar />
      {itemList.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
      <Item>
        <Profile img={profileImg} /> LinHeMa
      </Item>
      <Item>
        <Signout size={16} />
        Sign out
      </Item>
    </Conatainer>
  );
};

export default ItemMenu;
