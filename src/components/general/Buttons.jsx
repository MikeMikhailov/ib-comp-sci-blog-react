import styled from 'styled-components/macro';
import { primaryColor } from '../../constants/websiteColors';

const PrimaryButton = styled.button`
  background-color: ${primaryColor};
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  margin: 0;
  padding: 15px 30px;
  text-align: center;
  cursor: pointer;
  transition-duration: 200ms;

  font-family: 'Raleway';
  font-style: normal;
  font-variation-settings: 'wght' 600;
  font-size: 1.5rem;
  line-height: 1.5em;
  color: #ffffff;
`;

export default PrimaryButton;
