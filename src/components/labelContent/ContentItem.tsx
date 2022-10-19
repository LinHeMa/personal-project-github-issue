import { KebabHorizontalIcon } from '@primer/octicons-react';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDeleteLabelListMutation } from '../../sevices/api/labelApi';
import { useOnClickOutside } from 'usehooks-ts';
import Label from '../label/Label';
import EditLabel from './EditLabel';
import { checkLight } from '../../sevices/api/labelApi';

type FunctionButtonMobileWrapperProps = {
  isToggle: boolean;
  ref: React.MutableRefObject<null>;
};

type WrapperProps = {
  isCreating?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d0d7de;
  border-top: ${(props) => (props.isCreating ? '' : 0)};
  &:last-child {
    border-radius: ${(props) => (props.isCreating ? '6px' : '0 0 6px 6px')};
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
  @media screen and (max-width: 767px) {
    display: none;
  }
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
  id?: number;
  url: string;
  name: string;
  color: string;
  description: string;
  isLight?: boolean;
  isCreating?: boolean;
  setIsCreating?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentItem = ({
  name,
  color,
  description,
  isLight,
  isCreating,
  setIsCreating,
}: ContentItemProps) => {
  const userName = JSON.parse(sessionStorage.getItem('user')!);
  const userRepo = JSON.parse(sessionStorage.getItem('repo')!);
  const token = _.get(
    JSON.parse(localStorage.getItem('supabase.auth.token')!),
    ['currentSession', 'provider_token'],
  );
  const [isToggle, setIsToggle] = useState(true);
  const toggleRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isWhite, setIsWhite] = useState(true);
  const [labelColor, setLabelColor] = useState<string>(`#${color}`);
  const [newName, setNewName] = useState<string>(name ? name : '');
  const [newDescription, setNewDescription] = useState<string>(
    description ? description : '',
  );
  const [isRightFormat, setIsRightFormat] = useState(true);
  const [deleteLabelList] = useDeleteLabelListMutation();
  useOnClickOutside(toggleRef, () => setIsToggle(true));
  useEffect(() => {
    const color = _.trimStart(labelColor, '#');
    setIsWhite(checkLight(color ? color : ''));
  }, [labelColor]);

  return (
    <Wrapper isCreating={isCreating}>
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
            $isWhite={isWhite}
          />
        </LabelContainer>
        {!isCreating && (
          <Description $isEdit={isEdit}>
            {newDescription ? newDescription : description}
          </Description>
        )}
        {!isCreating && (
          <FunctionWrapper>
            <FunctionBtn
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </FunctionBtn>
            <FunctionBtn
              onClick={() => {
                if (
                  confirm(
                    'Are you sure? Deleting a label will remove it from all issues and pull requests.',
                  )
                )
                  deleteLabelList({
                    name: userName,
                    repo: userRepo,
                    lableName: name,
                    token,
                  });
              }}
            >
              Delete
            </FunctionBtn>
          </FunctionWrapper>
        )}
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
            <FunctionBtnMobile
              onClick={() => {
                if (
                  confirm(
                    'Are you sure? Deleting a label will remove it from all issues and pull requests.',
                  )
                ) {
                  deleteLabelList({
                    name: userName,
                    repo: userRepo,
                    lableName: name,
                    token,
                  });
                }
              }}
            >
              Delete
            </FunctionBtnMobile>
          </FunctionBtnMobileWrapper>
        </ToggleBtn>
      </LabelWrapper>
      {isEdit || isCreating ? (
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
            setIsCreating={setIsCreating}
            isCreating={isCreating}
            $isWhite={isWhite}
          />
        </EditWrapper>
      ) : null}
    </Wrapper>
  );
};

export default ContentItem;
