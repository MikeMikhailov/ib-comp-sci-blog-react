import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components/macro';
import { lightGrayColor, primaryColor } from '../../constants/websiteColors';

const LoadingContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 4px solid ${lightGrayColor};
  border-right: 4px solid ${lightGrayColor};
  border-bottom: 4px solid ${lightGrayColor};
  border-left: 8px solid ${primaryColor};
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

function Loading({ height, width }) {
  return (
    <LoadingContainer height={height} width={width}>
      <Spinner size={height} />
    </LoadingContainer>
  );
}

Loading.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Loading;
