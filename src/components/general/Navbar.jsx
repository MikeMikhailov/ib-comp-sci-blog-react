import React from 'react';
import styled from 'styled-components/macro';
import { Link, NavLink } from 'react-router-dom';
import { grayColor, lightGrayColor, primaryColor } from '../../constants/websiteColors';
import { Heading1 } from './Headings';
import Science from '../icons/Science';

const Container = styled.header`
  width: 100%;
  padding: 40px 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 992px) {
    padding-bottom: 80px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
  @media (min-width: 768px) {
    & > *:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  color: ${lightGrayColor};
  transition-duration: 200ms;
  &:hover,
  &.active {
    color: ${grayColor};
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Navigation>
        <LogoLink to="/">
          <Heading1>Neutrino</Heading1>
        </LogoLink>
        <Science height={32} color={primaryColor} />
      </Navigation>
      <Navigation>
        <NavLinkStyled to="/" activeClassName="active" exact>
          Home
        </NavLinkStyled>
        <NavLinkStyled to="/about" activeClassName="active" exact>
          About
        </NavLinkStyled>
      </Navigation>
    </Container>
  );
};

export default Navbar;
