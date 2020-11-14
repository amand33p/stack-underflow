import { Switch, Route } from 'react-router-dom';
import NavMenuDesktop from './NavMenuDesktop';
import RightSidePanel from './RightSidePanel';
import QuesListPage from '../pages/QuesListPage';
import AllTagsPage from '../pages/AllTagsPage';
import AllUsersPage from '../pages/AllUsersPage';
import QuestionPage from '../pages/QuestionPage';

import { Container, Grid } from '@material-ui/core';
import { useMainLayoutStyles } from '../styles/muiStyles';

const Routes = () => {
  const classes = useMainLayoutStyles();

  return (
    <Container disableGutters>
      <Switch>
        <Route exact path="/ask">
          <h1>ask here</h1>
        </Route>
        <Route exact>
          <Grid container direction="row" wrap="nowrap">
            <Switch>
              <Route exact path="/">
                <NavMenuDesktop />
                <QuesListPage />
                <RightSidePanel />
              </Route>
              <Route exact path="/tags">
                <NavMenuDesktop />
                <AllTagsPage />
              </Route>
              <Route exact path="/users">
                <NavMenuDesktop />
                <AllUsersPage />
              </Route>
              <Route exact path="/questions/:quesId">
                <NavMenuDesktop />
                <QuestionPage />
              </Route>
            </Switch>
          </Grid>
        </Route>
      </Switch>
    </Container>
  );
};

export default Routes;
