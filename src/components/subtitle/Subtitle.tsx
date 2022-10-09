import {
  BookIcon,
  CodeIcon,
  EyeIcon,
  GearIcon,
  GitPullRequestIcon,
  GraphIcon,
  IssueOpenedIcon,
  PinIcon,
  PlayIcon,
  RepoForkedIcon,
  RepoIcon,
  ShieldIcon,
  StarIcon,
  TabIcon,
} from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { useGetIssuesQuery } from "../../sevices/api/issueApi";
import Button from "../button/Button";
import DoubleButton from "../button/DoubleButton";
import Label from "../label/Label";
import Tabs from "../label/Tabs";

const Wrapper = styled.div`
  line-height: 30px;
  padding-top: 16px;
  margin-bottom: 16px;
  background-color: #f6f8fa;
  border-bottom: 1px solid hsla(210, 18%, 87%, 1);
`;

const TitleWrapper = styled.div`
  padding: 0 32px;
`;

const Icon = styled(RepoIcon)`
  margin-right: 8px;
`;

const BreadCrumbWrapper = styled.div`
  margin-right: 16px;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 16px;
`;
const BreadCrumb = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1054px) {
    flex-direction: column;
  }
`;

const RouteWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 1054px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Owner = styled.a`
  align-self: stretch;
  color: #0969da;
`;

const Break = styled.span`
  margin: 0 4px;
  color: #57606a;
`;

const Repo = styled.a`
  font-weight: 600;
  align-self: stretch;
  color: #0969da;
  margin-right: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 1054px) {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Pin = styled(PinIcon)`
  margin-right: 8px;
`;

const Eye = styled(EyeIcon)`
  margin-right: 8px;
`;

const Fork = styled(RepoForkedIcon)`
  margin-right: 8px;
`;
const Star = styled(StarIcon)`
  margin-right: 8px;
`;

const Code = styled(CodeIcon)`
  margin-right: 8px;
`;
const Issue = styled(IssueOpenedIcon)`
  margin-right: 8px;
`;
const Actions = styled(PlayIcon)`
  margin-right: 8px;
`;

const PullRequest = styled(GitPullRequestIcon)`
  margin-right: 8px;
`;
const Projects = styled(TabIcon)`
  margin-right: 8px;
`;
const Wiki = styled(BookIcon)`
  margin-right: 8px;
`;
const Security = styled(ShieldIcon)`
  margin-right: 8px;
`;
const Insights = styled(GraphIcon)`
  margin-right: 8px;
`;
const Settings = styled(GearIcon)`
  margin-right: 8px;
`;

const TabsWrapper = styled.div`
  display: flex;
  min-height: 48px;
  padding: 0 32px;
  padding-left: 0;
  overflow-x: auto;
`;

const Subtitle = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.userInfoAction.token);
  const { data } = useGetIssuesQuery({ token: token, state: "all" });
  console.log(data);

  return (
    <Wrapper>
      <TitleWrapper>
        <BreadCrumbWrapper>
          <BreadCrumb>
            <RouteWrapper>
              <Icon size={16} />
              <Owner href="#">LinHeMa</Owner>
              <Break>/</Break>
              <Repo>GitHub-Issue</Repo>
              <Label text="Public" borderColor="#d0d7de" color="#57606a" />
            </RouteWrapper>
            <ButtonWrapper>
              <Button icon={<Pin />} text="Pin" hasDropDown={false} />
              <Button
                icon={<Eye />}
                text="Unwatch"
                number={1}
                hasDropDown={true}
              />
              <DoubleButton
                icon={<Fork />}
                text="Fork"
                number={0}
                hasDropDown={false}
              />
              <DoubleButton
                icon={<Star />}
                text="Star"
                number={0}
                hasDropDown={false}
              />
            </ButtonWrapper>
          </BreadCrumb>
        </BreadCrumbWrapper>
        <TabsWrapper>
          <Tabs icon={<Code size={16} />} text="Code" />
          <Tabs
            icon={<Issue size={16} />}
            text="Issues"
            onClick={() => {
              navigate("/issuelist");
            }}
            number={data?.length}
          />
          <Tabs icon={<PullRequest size={16} />} text="Pull requests" />
          <Tabs icon={<Actions size={16} />} text="Actions" />
          <Tabs icon={<Projects size={16} />} text="Projects" />
          <Tabs icon={<Wiki size={16} />} text="Wiki" />
          <Tabs icon={<Security size={16} />} text="Security" />
          <Tabs icon={<Insights size={16} />} text="Insights" />
          <Tabs icon={<Settings size={16} />} text="Settings" />
        </TabsWrapper>
      </TitleWrapper>
    </Wrapper>
  );
};

export default Subtitle;
