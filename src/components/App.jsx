import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import { ApolloProvider } from '@apollo/client';
import fontFaces from '../fonts/fontSetup';
import apolloClient from '../utils/apolloSetup';
import Loading from './general/Loading';

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

const Home = React.lazy(() => import('../containers/Home'));
const SinglePost = React.lazy(() => import('../containers/SinglePost'));

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Normalize />
        <GlobalStyle />
        <Switch>
          <Route path="/post/:id" exact>
            <Suspense fallback={<Loading width="100vw" height="100vh" />}>
              <SinglePost />
            </Suspense>
          </Route>
          <Route path="/page/:number">
            <Suspense fallback={<Loading width="100vw" height="100vh" />}>
              <Home />
            </Suspense>
          </Route>
          <Route path="/" exact>
            <Redirect to="/page/1" />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
export default App;
