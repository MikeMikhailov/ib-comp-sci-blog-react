import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import Home from '../containers/Home';
import fontFaces from '../fonts/fontSetup';
import SinglePost from '../containers/SinglePost';

const GlobalStyle = createGlobalStyle`
${fontFaces}
  body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: #ffffff;
  font-family: 'Heebo', sans-serif;
  margin: 0;
  font-size: 20px;
}
`;

function App() {
  return (
    <Router>
      <Normalize />
      <GlobalStyle />
      <Switch>
        <Route path="/post/:id" exact>
          <SinglePost />
        </Route>
        <Route path="/page/:number">
          <Home />
        </Route>
        <Route path="/" exact>
          <Redirect to="/page/1" />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
