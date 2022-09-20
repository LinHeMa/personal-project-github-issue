import React from 'react';
import styled from 'styled-components';
import {
  BellIcon,
  MarkGithubIcon,
  PlusIcon,
  ThreeBarsIcon,
  TriangleDownIcon
} from '@primer/octicons-react';
import profileImg from '../images/github_avatar.png';

const Wrapper = styled.div`
  height: 62px;
  width: 100%;
  background-color: #24292f;
  padding: 16px 32px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1.5;
  @media screen and (max-width: 767px) {
    ${(props) => props.showOnMobile && 'justify-content: space-between;'}
  }
`;

const Icon = styled(MarkGithubIcon)`
  cursor: pointer;
  margin-right: 16px;
`;

const SearchWrapper = styled.div`
  border-radius: 6px;
  width: 272px;
  border: 1px solid #57606a;
  min-height: 28px;
  display: flex;
  align-items: center;
  margin-right: 16px;
  color: #57606a;
  transition: width 0.8s ease-in-out, background-color 0.01s ease-in-out;
  &:focus-within {
    background-color: #ffffff;
    width: 500px;
  }
`;

const SearchInput = styled.input`
  width: 270px;
  border: 0;
  opacity: 1;
  background-color: inherit;
  padding: 0 12px;
  outline: none;
  color: #ffffff;
  &::placeholder {
    color: #ffffff;
    opacity: 0.8; 
  }
  transition: width 1.3s ease-in-out;
  ${SearchWrapper}:focus-within & {
    background-color: #ffffff;
    width: 100%;
    color: #000000;
  }
`;

const SearchBtn = styled.div`
  cursor: pointer;
  width: 19.86px;
  height: 19.86px;
  border: 1px solid #57606a;
  border-radius: 4px;
  margin-right: 4px;
  line-height: 20px;
  ${SearchWrapper}:focus-within & {
    display: none;
  }
`;

const Link = styled.div`
  display: flex;
  font-size: 14px;
  margin-right: 16px;
  color: #ffffff;
  padding: 16px 0;
  font-weight: 600;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Request = styled.div`
  white-space: pre-wrap;
  @media screen and (max-width: 1011px) {
    ${(props) => props.hideOnMobile && 'display: none'};
  }
`;

const ProfileImage = styled.div`
  cursor: pointer;
  background-image: url(${(props) => props.bg});
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ListSearchContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  @media screen and (max-width: 767px) {
    ${(props) => props.hideOnMobile && 'display:none'}
  }
`;

const Bell = styled(BellIcon)`
  margin-right: 16px;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const PlusWrapper = styled.div`
  margin-right: 16px;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
  @media screen and (max-width: 767px) {
    ${(props) => props.hideOnMobile && 'display: none'};
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    ${(props) => props.hideOnMobile && 'display: none'};
  }
`;

const ProfileDown = styled(TriangleDownIcon)`
  ${ProfileWrapper}:hover & {
    fill: rgba(255, 255, 255, 0.7);
  }
`;

const MenuWrapper = styled.div`
  cursor: pointer;
  @media screen and (min-width: 767px) {
    ${(props) => props.showOnMobile && 'display: none;'}
  }
`;

// eslint-disable-next-line react/prop-types
const Header = ({ className }) => {
  return (
    <Wrapper className={className} showOnMobile>
      <MenuWrapper showOnMobile>
        <ThreeBarsIcon size={24} />
      </MenuWrapper>
      <Icon size={32} className='icon' />
      <ListSearchContainer hideOnMobile>
        <SearchWrapper>
          <SearchInput placeholder='Search or jump to...' />
          <SearchBtn>/</SearchBtn>
        </SearchWrapper>
        <Link href='#'>
          Pull<Request hideOnMobile> Request</Request>s
        </Link>
        <Link href='#'>Issues</Link>
        <Link href='#'>Marketplace</Link>
        <Link href='#'>Explore</Link>
      </ListSearchContainer>
      <Bell size={16} />
      <PlusWrapper hideOnMobile>
        <PlusIcon size={16} />
        <TriangleDownIcon size={16} />
      </PlusWrapper>
      <ProfileWrapper hideOnMobile>
        <ProfileImage className='profile-img' bg={profileImg} />
        <ProfileDown size={16} />
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Header;
