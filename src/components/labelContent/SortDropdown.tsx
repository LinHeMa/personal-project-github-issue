import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 280px;
  right: 0;
  top: 25px;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  position: absolute;
  z-index: 10;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 4px 0;
`;

const Title = styled.div`
  font-weight: 600;
  display: flex;
  padding: 8px 10px;
`;

const Choice = styled.div`
  text-align: start;
  padding: 8px;
  padding-left: 30px;
  width: 100%;
  border-top: 1px solid #d0d7de;
  &:hover {
    background-color: #0969da;
    color: #ffffff;
  }
`;

const SortDropdown = () => {
  return (
    <Wrapper>
      <Title>Sort</Title>
      <Choice>Alphabetically</Choice>
      <Choice>Reverse alphabetically</Choice>
      <Choice>Most issues</Choice>
      <Choice>Fewest issues</Choice>
    </Wrapper>
  );
};

export default SortDropdown;
