import { MarkGithubIcon } from '@primer/octicons-react';
import styled from 'styled-components';

const Outer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  @media screen and (max-width: 1012px) {
    padding: 0 40px;
  }
  @media screen and (max-width: 544px) {
    padding: 0 16px;
  }
`;

const Wrapper = styled.footer`
  font-size: 12px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 1.5;
  padding-top: 40px;
  padding-bottom: 8px;
  margin-top: 40px;
  border-top: 1px solid hsla(210, 18%, 87%, 1);
  @media screen and (max-width: 1012px) {
    padding-top: 40px;
    padding-bottom: 8px;
    margin-top: 40px;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const Logo = styled.div`
  width: 183px;
  height: 34px;
  display: flex;
  color: #6e7781;
  align-items: center;
  @media screen and (max-width: 1011px) {
    margin-top: 8px;
  }
`;
const Icon = styled(MarkGithubIcon)`
  fill: #6e7781;
  margin-right: 8px;
`;
const Link = styled.a`
  text-decoration: none;
  margin-right: 16px;
  font-size: 12px;
  color: #0969da;
`;
const LinkWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-bottom: 0;
  width: 64%;
  @media screen and (max-width: 1011px) {
    justify-content: center;
  }
`;
const Footer = () => {
  const list = [
    'Terms',
    'Privacy',
    'Security',
    'Status',
    'Docs',
    'Contact GitHub',
    'Pricing',
    'Training',
    'API',
    'Blog',
    'About'
  ];
  return (
    <Outer>
      <Wrapper>
        <Logo>
          <Icon size={24} />
          <span>© 2022 GitHub, Inc.</span>
        </Logo>
        <LinkWrapper>
          {list.map((item, index) => (
            <Link key={index}>{item}</Link>
          ))}
        </LinkWrapper>
      </Wrapper>
    </Outer>
  );
};

export default Footer;
