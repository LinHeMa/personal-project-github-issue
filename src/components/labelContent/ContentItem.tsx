import { KebabHorizontalIcon } from '@primer/octicons-react';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../utils/hooks/useOnClidkOutside';
import Label from '../label/Label';
import EditLabel from './EditLabel';

type FunctionButtonMobileWrapperProps = {
  isToggle: boolean;
  ref: React.MutableRefObject<null>;
};

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
type DescritpionProps = {
  $isEdit: boolean;
};
const Description = styled.div<DescritpionProps>`
  visibility: ${(props) => (props.$isEdit ? 'hidden' : 'visible')};
  color: #57606a;
  word-wrap: break-word;
  width: 239px;
  text-align: start;
`;
type IssueCommonProps = {
  $isEdit: boolean;
};
const IssueCommon = styled.a<IssueCommonProps>`
  visibility: ${(props) => (props.$isEdit ? 'hidden' : 'visible')};
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

const FunctionBtnMobileWrapper = styled.div<FunctionButtonMobileWrapperProps>`
  /* TODO */
  display: ${(props) => (props.isToggle ? 'none' : 'block')};
  position: absolute;
  z-index: 10;
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
  isLight?: boolean;
}

const ContentItem = ({
  id,
  url,
  name,
  color,
  description,
  isLight
}: ContentItemProps) => {
  const [isToggle, setIsToggle] = useState(true);
  const toggleRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [labelColor, setLabelColor] = useState<string>(`#${color}`);
  const [newName, setNewName] = useState<string>(name ? name : '');
  const [newDescription, setNewDescription] = useState<string>(
    description ? description : ''
  );
  const [isRightFormat, setIsRightFormat] = useState(true);

  useOnClickOutside(toggleRef, () => setIsToggle(true));

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
            isLight={isLight}
            $labelColor={labelColor}
            $newName={newName}
          />
        </LabelContainer>
        <Description $isEdit={isEdit}>
          {newDescription ? newDescription : description}
        </Description>
        <IssueCommon href={url} $isEdit={isEdit}>
          1 open issue or pull request{' '}
        </IssueCommon>
        <FunctionWrapper>
          <FunctionBtn
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Edit
          </FunctionBtn>
          <FunctionBtn>Delete</FunctionBtn>
        </FunctionWrapper>
        <ToggleBtn
          ref={toggleRef}
          onClick={() => {
            setIsToggle((prev) => !prev);
          }}
        >
          <ToggleIcon />
          <FunctionBtnMobileWrapper isToggle={isToggle} ref={toggleRef}>
            <FunctionBtnMobile onClick={() => setIsEdit(true)}>
              Edit
            </FunctionBtnMobile>
            <FunctionBtnMobile>Delete</FunctionBtnMobile>
          </FunctionBtnMobileWrapper>
        </ToggleBtn>
      </LabelWrapper>
      {isEdit ? (
        <EditWrapper>
          <EditLabel
            name={name}
            description={description}
            color={color}
            isLight={isLight}
            setIsEdit={setIsEdit}
            setLabelColor={setLabelColor}
            setNewName={setNewName}
            setNewDescription={setNewDescription}
            setIsRightFormat={setIsRightFormat}
            newName={newName}
            newDescription={newDescription}
            labelColor={labelColor}
            isRightFormat={isRightFormat}
          />
        </EditWrapper>
      ) : null}
    </Wrapper>
  );
};

export default ContentItem;
