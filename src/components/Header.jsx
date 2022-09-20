import React from 'react';
import styled from 'styled-components';
import {
  BellIcon,
  MarkGithubIcon,
  PlusIcon,
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
`;

const Icon = styled(MarkGithubIcon)`
  cursor: pointer;
  margin-right: 16px;
`;

const SearchWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid #57606a;
  min-height: 28px;
  display: flex;
  align-items: center;
  margin-right: 16px;
  color: #57606a;
`;

const SearchInput = styled.input`
  width: 270px;
  border: 0;
  background-color: inherit;
  padding: 0 12px;
  outline: none;
`;

const SearchBtn = styled.div`
  cursor: pointer;
  width: 19.86px;
  height: 19.86px;
  border: 1px solid #57606a;
  border-radius: 4px;
  margin-right: 4px;
  line-height: 20px;
`;

const Link = styled.a`
  font-size: 14px;
  margin-right: 16px;
  color: #ffffff;
  padding: 16px 0;
  font-weight: 600;
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
`;

const Bell = styled(BellIcon)`
  margin-right: 16px;
`;
const PlusWrapper = styled.div`
  margin-right: 16px;
`;

// eslint-disable-next-line react/prop-types
const Header = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Icon size={32} className='icon' />
      <ListSearchContainer>
        <SearchWrapper>
          <SearchInput placeholder='Search or jump to...' />
          <SearchBtn>/</SearchBtn>
        </SearchWrapper>
        <Link href='#'>Pulls</Link>
        <Link href='#'>Issues</Link>
        <Link href='#'>Marketplace</Link>
        <Link href='#'>Explore</Link>
      </ListSearchContainer>
      <Bell size={16} />
      <PlusWrapper>
        <PlusIcon size={16} />
        <TriangleDownIcon size={16} />
      </PlusWrapper>
      <ProfileImage className='profile-img' bg={profileImg} />
      <TriangleDownIcon size={16} />
    </Wrapper>
  );
};

export default Header;
