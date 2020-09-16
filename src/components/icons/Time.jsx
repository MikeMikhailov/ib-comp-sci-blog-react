import React from 'react';
import PropTypes from 'prop-types';

function Time({ color, height }) {
  return (
    <svg height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M256 512C114.836 512 0 397.164 0 256S114.836 0 256 0s256 114.836 256 256-114.836 256-256 256zm0-480C132.48 32 32 132.48 32 256s100.48 224 224 224 224-100.48 224-224S379.52 32 256 32zm0 0"
        fill={color}
      />
      <path
        d="M368 394.668a15.879 15.879 0 01-11.309-4.695l-112-112A16.002 16.002 0 01240 266.668V117.332c0-8.832 7.168-16 16-16s16 7.168 16 16v142.7L379.309 367.34c6.25 6.25 6.25 16.383 0 22.633A15.879 15.879 0 01368 394.668zm0 0"
        fill={color}
      />
    </svg>
  );
}

Time.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default Time;
