import { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  BellIcon,
  MarkGithubIcon,
  PlusIcon,
  ThreeBarsIcon,
  TriangleDownIcon,
} from '@primer/octicons-react';
import profileImg from '../images/github_avatar.png';
import UserDropDown from './UserDropDown';
import DropDown from './labelContent/DropDown';
import useOnClickOutside from '../utils/hooks/useOnClidkOutside';

const ListOfCreate = [
  'New repository',
  'Import repository',
  'New gist',
  'New organization',
];

const Hr = styled.hr`
  width: 110%;
  border: 0.5px solid #d0d7de;
`;
const dropDownMenu = [
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
  'Settings',
];
interface WrapperProps {
  showOnMobile: boolean;
}

interface RequestProps {
  hideOnMobile: boolean;
}

interface ListSearchContainerProps {
  hideOnMobile: boolean;
}

interface PlusWrapperProps {
  hideOnMobile: boolean;
}

interface ProfileWrapperProps {
  hideOnMobile: boolean;
}
interface MenuWrapperProps {
  showOnMobile: boolean;
}

interface ProfileImageProps {
  bg: string;
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;
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
  @media screen and (max-width: 1011px) {
    padding: 16px 24px;
  }
`;

const Icon = styled(MarkGithubIcon)`
  cursor: pointer;
  margin-right: 16px;
`;

const SearchWrapper = styled.div`
  border-radius: 6px;
  min-width: 272px;
  width: 272px;
  border: 1px solid #57606a;
  min-height: 28px;
  display: flex;
  align-items: center;
  margin-right: 16px;
  color: #57606a;
  justify-content: space-between;
  transition: width 0.8s ease-in-out, background-color 0.01s ease-in-out;
  &:focus-within {
    background-color: #ffffff;
    width: 52%;
  }
`;

const SearchInput = styled.input`
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
  ${SearchWrapper}:focus-within & {
    background-color: #ffffff;
    color: #000000;
    &::placeholder {
      color: #000000;
      opacity: 0.8;
    }
  }
`;

const SearchBtn = styled.div`
  cursor: pointer;
  opacity: 1;
  width: 19.86px;
  height: 19.86px;
  border: 1px solid #57606a;
  border-radius: 4px;
  margin-right: 4px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  ${SearchWrapper}:focus-within & {
    opacity: 0;
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

const Request = styled.div<RequestProps>`
  white-space: pre-wrap;
  @media screen and (max-width: 1011px) {
    ${(props) => props.hideOnMobile && 'display: none'};
  }
`;

export const ProfileImage = styled.div<ProfileImageProps>`
  cursor: pointer;
  background-image: url(${(props) => props.bg});
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ListSearchContainer = styled.div<ListSearchContainerProps>`
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
  @media screen and (max-width: 767px) {
    margin: 0;
  }
`;

const PlusWrapper = styled.div<PlusWrapperProps>`
  margin-right: 16px;
  cursor: pointer;
  display: flex;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
  @media screen and (max-width: 767px) {
    ${(props) => props.hideOnMobile && 'display: none'};
  }
`;

const ProfileWrapper = styled.div<ProfileWrapperProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  @media screen and (max-width: 767px) {
    ${(props) => props.hideOnMobile && 'display: none'};
  }
`;

const ProfileDown = styled(TriangleDownIcon)`
  ${ProfileWrapper}:hover & {
    fill: rgba(255, 255, 255, 0.7);
  }
`;

const MenuWrapper = styled.div<MenuWrapperProps>`
  cursor: pointer;
  @media screen and (min-width: 767px) {
    ${(props) => props.showOnMobile && 'display: none;'}
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  right: 26px;
  top: 49px;
`;
type User = {
  aud: string;
};
interface HeaderProps {
  className: string;
  signInWithGithub(): Promise<void>;
  signOut(): Promise<void>;
  user?: User | null;
}

// eslint-disable-next-line react/prop-types
const Header = ({
  className,
  signInWithGithub,
  signOut,
  user,
}: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const profileRef = useRef(null);
  const plusRef = useRef(null);
  useOnClickOutside(profileRef, () => setIsProfileOpen(false));
  useOnClickOutside(plusRef, () => setIsPlusOpen(false));


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
        <Link>
          Pull<Request hideOnMobile> Request</Request>s
        </Link>
        <Link>Issues</Link>
        <Link>Marketplace</Link>
        <Link>Explore</Link>
      </ListSearchContainer>
      <div onClick={signInWithGithub}>
        <Bell size={16} />
      </div>
      <PlusWrapper
        hideOnMobile
        onClick={() => setIsPlusOpen((prev) => !prev)}
        ref={plusRef}
      >
        <PlusIcon size={16} />
        <TriangleDownIcon size={16} />
      </PlusWrapper>
      {user?.aud === 'authenticated' ? (
        <ProfileWrapper
          hideOnMobile
          onClick={() => {
            console.log(isProfileOpen);
            setIsProfileOpen((prev) => !prev);
          }}
        >
          <ProfileImage className='profile-img' bg={profileImg} />
          <ProfileDown size={16} />
        </ProfileWrapper>
      ) : (
        <div
          onClick={() => {
            signInWithGithub();
          }}
        >
          Sign in
        </div>
      )}
      {isProfileOpen ? (
        <DropdownWrapper ref={profileRef}>
          <UserDropDown dropDownMenu={dropDownMenu} signOut={signOut} />
        </DropdownWrapper>
      ) : null}
      {isPlusOpen && <DropDown list={ListOfCreate} ref={plusRef} />}
    </Wrapper>
  );
};

export default Header;
