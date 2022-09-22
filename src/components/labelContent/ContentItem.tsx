import { KebabHorizontalIcon } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';
import Label from '../label/Label';
import EditLabel from './EditLabel';
const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d0d7de;
  border-top: 0;
  &:last-child {
    border-radius: 0 0 6px 6px;
  }
`;

const LabelContainer = styled.div`
  width: 200px;
  display: flex;
`;

const LabelWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 24px;
`;

const Description = styled.div`
  color: #57606a;
  word-wrap: break-word;
  width: 239px;
  text-align: start;
`;

const IssueCommon = styled.a`
  color: #57606a;
  word-wrap: break-word;
  width: 239px;
`;

const ToggleBtn = styled.button`
  display: none;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  min-width: 42px;
  min-height: 28px;
  background-color: #f6f8fa;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #0969da;
  }
  @media screen and (max-width: 1011px) {
    display: block;
  }
`;

const ToggleIcon = styled(KebabHorizontalIcon)`
  ${ToggleBtn}:hover & {
    color: white;
  }
`;

const FunctionWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 1011px) {
    display: none;
  }
`;

const FunctionBtn = styled.button`
  color: #57606a;
  cursor: pointer;
  margin-left: 16px;
`;

const FunctionBtnMobileWrapper = styled.div`
  position: absolute;
  right: 0;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: #fff;
  padding: 4px 0;
`;

const FunctionBtnMobile = styled.div`
  display: none;
  @media screen and (max-width: 1011px) {
    display: block;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    width: 158px;
    height: 26px;
    padding: 4px 8px 4px 16px;
    color: #24292f;
    font-size: 12px;
    &:hover {
      background-color: #0969da;
      color: #ffffff;
    }
  }
`;

const EditWrapper = styled.div`
  display: flex;
  width: 100%;
`;

interface ContentItemProps {
  id: number;
  url: string;
  name: string;
  color: string;
  description: string;
}

const ContentItem = ({
  id,
  url,
  name,
  color,
  description
}: ContentItemProps) => {
  return (
    <Wrapper>
      <LabelWrapper>
        <LabelContainer>
          <Label
            text={name}
            bgColor={'#' + color}
            color='#ffffff'
            borderColor='transparent'
            fontWeight='700'
            fontSize='12px'
          />
        </LabelContainer>
        <Description>{description}</Description>
        <IssueCommon href={url}>1 open issue or pull request </IssueCommon>
        <FunctionWrapper>
          <FunctionBtn>Edit</FunctionBtn>
          <FunctionBtn>Delete</FunctionBtn>
        </FunctionWrapper>
        <ToggleBtn>
          <ToggleIcon />
          <FunctionBtnMobileWrapper>
            <FunctionBtnMobile>Edit</FunctionBtnMobile>
            <FunctionBtnMobile>Delete</FunctionBtnMobile>
          </FunctionBtnMobileWrapper>
        </ToggleBtn>
      </LabelWrapper>
      <EditWrapper>
        <EditLabel />
      </EditWrapper>
    </Wrapper>
  );
};

export default ContentItem;
