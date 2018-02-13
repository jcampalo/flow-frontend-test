import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import FlowPage from 'containers/Flow/Page/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
`;

const App = () => {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Flow App"
        defaultTitle="Flow App"
      >
        <meta name="description" content="Flow App" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={FlowPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </AppWrapper>
  );
};

export default App;
