import React from 'react';
import styled from 'styled-components';
import { MarkGithubIcon } from '@primer/octicons-react';
interface Props {
  className: string;
}

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
  margin-right: 15px;
`;

const SearchWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid #57606a;
  min-height: 28px;
  display: flex;
  align-items: center;
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

const Header = ({ className }: Props) => {
  return (
    <Wrapper className={className}>
      <Icon size={32} className='icon' />
      <SearchWrapper>
        <SearchInput placeholder='Search or jump to...' />
        <SearchBtn>/</SearchBtn>
      </SearchWrapper>
    </Wrapper>
  );
};

export default Header;
