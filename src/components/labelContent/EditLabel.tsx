import { SyncIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';

const Wrapper = styled.div`
  margin-top: 8px;
  min-height: 93px;
  display: flex;
  width: 100%;
  margin-top: 8px;
  align-items: center;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 271px;
  padding-right: 16px;
  @media screen and (max-width: 767px) {
    margin-top: 16px;
    padding-right: 0;
    width: 100%;
  }
`;

const DescriptionBlock = styled(FormBlock)`
  width: 368px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const ColorBlock = styled(FormBlock)`
  width: 220px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Input = styled.input`
  height: 32px;
  width: 100%;
  margin-top: 8px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: #f6f8fa;
  padding: 5px 12px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 14px;
  text-align: left;
  color: #24292f;
  font-weight: 600;
`;

const BottomBlock = styled.div`
  display: flex;
  padding-top: 20px;
  margin-left: auto;
  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
`;

const ChangeColorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ChangeIcon = styled(SyncIcon)`
  color: #ffffff;
`;

const ChangeColorBtn = styled.div`
  min-width: 32px;
  min-height: 32px;
  margin-top: 8px;
  margin-right: 8px;
  background-color: #d73a4a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const EditLabel = () => {
  return (
    <Wrapper>
      <FormBlock>
        <Title>Label name</Title>
        <Input />
      </FormBlock>
      <DescriptionBlock>
        <Title>Description</Title>
        <Input placeholder='Descritpion(Optional)' />
      </DescriptionBlock>
      <ColorBlock>
        <Title>Color</Title>
        <ChangeColorWrapper>
          <ChangeColorBtn>
            <ChangeIcon />
          </ChangeColorBtn>
          <Input />
        </ChangeColorWrapper>
      </ColorBlock>
      <BottomBlock>
        <Button
          text='Cancel'
          color='#000000'
          bgColor='#f6f8fa'
          fontSize='14px'
        />
        <Button
          text='Save changes'
          color='#ffffff'
          bgColor='#2da44e'
          fontSize='14px'
        />
      </BottomBlock>
    </Wrapper>
  );
};

export default EditLabel;
