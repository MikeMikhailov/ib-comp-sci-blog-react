import HeeboVariable from './Heebo-Variable.woff2';
import RalewayVariable from './Raleway-Variable.woff2';

const fontFaces = `
@font-face {
  font-family: 'Heebo';
  font-display: swap;
  src: url(${HeeboVariable}) format('woff2-variations');
}
@font-face {
  font-family: 'Raleway';
  font-display: swap;
  src: url(${RalewayVariable}) format('woff2-variations');
}`;

export default fontFaces;
