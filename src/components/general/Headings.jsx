import styled from 'styled-components/macro';
import { darkGrayColor } from '../../constants/websiteColors';

export const Heading1 = styled.h1`
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-style: normal;
  font-variation-settings: 'wght' 900;
  font-size: 1.75rem;
  line-height: 1.5em;
  color: ${(props) => props.color || darkGrayColor};
`;

export const Heading2 = styled.h2`
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-style: normal;
  font-variation-settings: 'wght' 800;
  font-size: 2.5rem;
  line-height: 1.5em;
  color: ${(props) => props.color || darkGrayColor};
`;
export const Heading3 = styled.h3`
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-variation-settings: 'wght' 700;
  font-size: 2rem;
  line-height: 1.5em;
  color: ${(props) => props.color || darkGrayColor};
`;
export const Heading4 = styled.h4`
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: 'wght' 600;
  font-size: 1.5rem;
  line-height: 1.5em;
  color: ${(props) => props.color || darkGrayColor};
`;
export const Heading5 = styled.h5`
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: 'wght' 500;
  font-size: 1rem;
  line-height: 1.5em;
  color: ${(props) => props.color || darkGrayColor};
`;

export const Text = styled.p`
  margin: 0;
  font-family: 'Heebo', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'wght' 400;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${(props) => props.color || darkGrayColor};
`;

export const LinkText = styled(Text)`
  text-decoration: underline;
`;
