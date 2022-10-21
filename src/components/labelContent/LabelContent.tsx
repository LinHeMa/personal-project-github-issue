import { TriangleDownIcon } from '@primer/octicons-react';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import FunctionBar from './FunctionBar';
import SortDropdown from './SortDropdown';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';
import useOnClickOutside from '../../utils/hooks/useOnClidkOutside';
import { useAppSelector } from '../../app/hooks';
import { useBoolean } from 'usehooks-ts';
import _ from 'lodash';

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 24px;
  padding: 0 16px;
  padding-bottom: 143px;
  @media screen and (max-width: 1011px) {
    padding: 0 24px 143px;
  }
  @media screen and (max-width: 767px) {
    padding: 0 32px 183px;
  }
`;
const ContentContainer = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f6f8fa;
  padding: 16px;
  border: 1px solid #d0d7de;
  border-radius: 6px 6px 0 0;
`;
const LabelCount = styled.h1`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: #24292f;
`;

const SortBtn = styled.div`
  position: relative;
  font-size: 14px;
  color: #57606a;
  cursor: pointer;
`;

const LabelContent = () => {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const name = JSON.parse(sessionStorage.getItem('user')!);
  const repo = JSON.parse(sessionStorage.getItem('repo')!);
  const token = _.get(
    JSON.parse(localStorage.getItem('supabase.auth.token')!),
    ['currentSession', 'provider_token'],
  );
  const { data, isSuccess, isError } = useGetLabelListQuery({
    name,
    repo,
    token,
  });
  useOnClickOutside(dropDownRef, () => setOpen(false));

  if (isSuccess)
    return (
      <Wrapper>
        <FunctionBar />
        <ContentContainer>
          <Title>
            <LabelCount>{isSuccess ? data?.length : 0} labels</LabelCount>
            <SortBtn
              ref={dropDownRef}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Sort <TriangleDownIcon />
              {open && <SortDropdown />}
            </SortBtn>
          </Title>
        </ContentContainer>
        {data?.map(({ id, url, name, color, description, isLight }) => (
          <ContentItem
            key={id}
            id={id}
            url={url}
            name={name}
            color={color}
            description={description}
            isLight={isLight}
          />
        ))}
      </Wrapper>
    );
  return <>fetching</>;
};

export default LabelContent;
