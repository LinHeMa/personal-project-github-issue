import React from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid #57606a;
  min-height: 28px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #57606a;
  transition: background-color 0.01s ease-in-out;
  &:focus-within {
    background-color: #ffffff;
  }
`;

const SearchInput = styled.input`
  width: 100%;
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
    &::placeholder {
      color: #000000;
      opacity: 0.8;
    }
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
// eslint-disable-next-line react/prop-types
const SearchBar = () => {
  return (
    <>
      <SearchWrapper>
        <SearchInput placeholder='Search or jump to...' />
        <SearchBtn>/</SearchBtn>
      </SearchWrapper>
    </>
  );
};

export default SearchBar;
