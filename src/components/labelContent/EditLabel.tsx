import { SyncIcon } from '@primer/octicons-react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useAddLabelListMutation,
  useUpdateLabelListMutation
} from '../../sevices/api/labelApi';
import Button from '../button/Button';
import ColorPicker from './ColorPicker';
type ChangeColorBtnProps = {
  color: string;
  $isRightFormat?: boolean;
  $newColor?: string;
};

type ChangeIconProps = {
  isLight?: boolean;
  $isWhite?: boolean;
};

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

type InputProps = {
  $isRightFormat?: boolean;
};
const ColorInput = styled.input<InputProps>`
  border: 1px solid #d0d7de;
  color: ${(props) => (props.$isRightFormat ? 'inherit' : '#cf222e')};
  height: 32px;
  width: 100%;
  margin-top: 8px;
  border-radius: 6px;
  background-color: #f6f8fa;
  padding: 5px 12px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
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
  position: relative;
  display: flex;
  align-items: center;
`;

const ChangeIcon = styled(SyncIcon)<ChangeIconProps>`
  color: ${(props) =>
    props.isLight || props.$isWhite ? '#ffffff;' : '#000000'};
`;

const ChangeColorBtn = styled.div<ChangeColorBtnProps>`
  cursor: pointer;
  min-width: 32px;
  min-height: 32px;
  margin-top: 8px;
  margin-right: 8px;
  border: 1px solid
    ${(props) =>
      _.lowerCase(props.color) === 'ffffff' ? '#d0d7de' : 'transparent'};
  background-color: ${(props) => '#' + props.color};
  background-color: ${(props) =>
    props.$isRightFormat ? props.$newColor : null};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const CancelWrapper = styled.div`
  margin-right: 5px;
`;
const SaveChangeWrapper = styled.div``;

type EditLabelProps = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setLabelColor: React.Dispatch<React.SetStateAction<string>>;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
  setIsRightFormat: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreating?: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  isLight?: boolean;
  newName: string;
  newDescription: string;
  labelColor: string;
  isRightFormat: boolean;
  name: string;
  description: string;
  isCreating?: boolean;
  $isWhite?: boolean;
};
interface updateBody {
  new_name?: string;
  color?: string;
  description?: string;
}
type postBody = {
  name: string;
  color?: string;
  description?: string;
};
const EditLabel = ({
  name,
  description,
  color,
  isLight,
  setIsEdit,
  setLabelColor,
  setNewName,
  setNewDescription,
  setIsRightFormat,
  newName,
  newDescription,
  labelColor,
  isRightFormat,
  isCreating,
  $isWhite,
  setIsCreating,
}: EditLabelProps) => {
  const userName = JSON.parse(sessionStorage.getItem('user')!);
  const userRepo = JSON.parse(sessionStorage.getItem('repo')!);
  const token = _.get(
    JSON.parse(localStorage.getItem('supabase.auth.token')!),
    ['currentSession', 'provider_token'],
  );
  const [visible, setVisible] = useState(false);
  const [updateBody, setUpdateBody] = useState<updateBody>();
  const [postBody, setPostBody] = useState<postBody>();
  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setNewName(target.value);
  };
  const handleDescriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setNewDescription(target.value);
  };
  const handleNewColorChange = (e: React.FormEvent<HTMLInputElement>) => {
    const colorReg = new RegExp('^#([A-F0-9]{2,3}|[A-F0-9]{5})$', 'i');
    const target = e.target as HTMLInputElement;
    setIsRightFormat(true);
    setLabelColor(target.value);
    if (!colorReg.test(labelColor)) {
      setIsRightFormat(false);
      return;
    }
  };
  const [useUpdateLabelList] = useUpdateLabelListMutation();
  const [addLabelList] = useAddLabelListMutation();
  function generateRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (randomColor.length !== 6) {
      generateRandomColor();
    } else {
      return randomColor;
    }
  }
  useEffect(() => {
    if (newName !== '' || newName !== name) {
      setUpdateBody((prev) => ({ ...prev, new_name: newName }));
      setPostBody((prev) => ({ ...prev, name: newName }));
    }
    if (newDescription !== description) {
      setUpdateBody((prev) => ({ ...prev, description: newDescription }));
      setPostBody((prev) => ({ ...prev, description: newDescription }));
    }
    if (labelColor !== color) {
      setUpdateBody((prev) => ({
        ...prev,
        color: _.trimStart(labelColor, '#'),
      }));
      setPostBody((prev) => ({
        ...prev,
        color: _.trimStart(labelColor, '#'),
      }));
    }
  }, [newName, newDescription, labelColor]);

  return (
    <Wrapper>
      <FormBlock>
        <Title>Label name</Title>
        <Input value={newName} onChange={handleNameChange} />
      </FormBlock>
      <DescriptionBlock>
        <Title>Description</Title>
        <Input
          placeholder='Descritpion(Optional)'
          value={newDescription}
          onChange={handleDescriptionChange}
        />
      </DescriptionBlock>
      <ColorBlock>
        <Title>Color</Title>
        <ChangeColorWrapper>
          <ChangeColorBtn
            color={color}
            $newColor={labelColor}
            $isRightFormat={isRightFormat}
            onClick={() => {
              setLabelColor(`#${generateRandomColor()}`);
            }}
          >
            <ChangeIcon isLight={isLight} $isWhite={$isWhite} />
          </ChangeColorBtn>
          <ColorInput
            maxLength={7}
            value={labelColor}
            onChange={handleNewColorChange}
            $isRightFormat={isRightFormat}
            onFocus={() => setVisible(true)}
          />
          {visible && (
            <ColorPicker
              setLabelColor={setLabelColor}
              setVisible={setVisible}
            />
          )}
        </ChangeColorWrapper>
      </ColorBlock>
      <BottomBlock>
        <CancelWrapper
          onClick={() => {
            setIsEdit(false);
            setLabelColor(`#${color}`);
            setNewName(name);
            setNewDescription(description ? description : '');
            if (setIsCreating) {
              setIsCreating(false);
            }
          }}
        >
          <Button
            text='Cancel'
            color='#000000'
            bgColor='#f6f8fa'
            fontSize='14px'
          />
        </CancelWrapper>

        <SaveChangeWrapper
          onClick={() => {
            setIsEdit(false);
            isCreating
              ? addLabelList({
                  name: userName,
                  repo: userRepo,
                  postBody: postBody,
                  token,
                })
              : useUpdateLabelList({
                  name: userName,
                  repo: userRepo,
                  lableName: name,
                  updateBody: updateBody,
                  token,
                });
            setIsEdit(false);
            if (setIsCreating) {
              setIsCreating(false);
            }
          }}
        >
          <Button
            text={isCreating ? 'Create label' : 'Save changes'}
            color='#ffffff'
            bgColor='#2da44e'
            fontSize='14px'
            hoverColor='#2c974b;'
          />
        </SaveChangeWrapper>
      </BottomBlock>
    </Wrapper>
  );
};

export default EditLabel;
