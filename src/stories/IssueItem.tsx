import {
  CommentIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  SkipIcon,
} from "@primer/octicons-react";
import styled from "styled-components";
import avatar from "../images/github_avatar.png";

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
  min-width: 360px;
  max-width: 1280px;
`;

const CheckBox = styled.div`
  display: flex;
  margin-right: 8px;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Main = styled.div`
  display: flex;
`;

const Context = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const Icon = styled.div`
  padding-top: 8px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const Assignee = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  padding: 0 8px;
  @media screen and (max-width: 543px) {
    display: none;
  }
`;

const ProfileImg = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transition: margin-right 0.5s ease-out;

  &:last-child {
    margin-right: 0;
  }
  margin-right: -8px;
  ${Assignee}:hover & {
    margin-right: 2px;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 543px) {
    display: none;
  }
`;

const Count = styled.div`
  font-weight: 300;
  margin-left: 4px;
`;

type IssueItemProps = {
  status: string;
};

const IssueItem = ({ status }: IssueItemProps) => {
  return (
    <Wrapper>
      <CheckBox>
        <input type="checkbox" name="" id="" />
      </CheckBox>
      <Main>
        <Icon>
          {status === "open" ? (
            <IssueOpenedIcon fill="green" />
          ) : status === "closed" ? (
            <IssueClosedIcon fill="purple" />
          ) : (
            <SkipIcon fill="#57606a" />
          )}
        </Icon>
        <Context>
          <Title>這是標題的部分</Title>
          <SubTitle>這是副標的部分</SubTitle>
        </Context>
      </Main>
      <Assignee>
        <ProfileImg src={avatar} />
        <ProfileImg src={avatar} />
        <ProfileImg src={avatar} />
        <ProfileImg src={avatar} />
        <ProfileImg src={avatar} />
        <ProfileImg src={avatar} />
      </Assignee>
      <Message>
        <CommentIcon />
        <Count>2</Count>
      </Message>
    </Wrapper>
  );
};

export default IssueItem;
