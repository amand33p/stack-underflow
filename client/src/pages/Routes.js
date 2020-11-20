import { Switch, Route } from 'react-router-dom';
import NavMenuDesktop from '../components/NavMenuDesktop';
import RightSidePanel from '../components/RightSidePanel';
import QuesListPage from './QuesListPage';
import AllTagsPage from './AllTagsPage';
import AllUsersPage from './AllUsersPage';
import QuestionPage from './QuestionPage';
import AskQuestionPage from './AskQuestionPage';
import UserPage from './UserPage';

import { Container, Grid } from '@material-ui/core';

const Routes = () => {
  return (
    <Container disableGutters>
      <Grid container direction="row" wrap="nowrap" justify="space-between">
        <Switch>
          <Route exact path="/">
            <NavMenuDesktop />
            <QuesListPage />
            <RightSidePanel />
          </Route>
          <Route exact path="/ask">
            <NavMenuDesktop />
            <AskQuestionPage />
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
          <Route exact path="/user/:username">
            <NavMenuDesktop />
            <UserPage />
          </Route>
          <Route exact path="/questions/:quesId">
            <NavMenuDesktop />
            <QuestionPage />
          </Route>
          <Route exact path="/tags/:tagName">
            <NavMenuDesktop />
            <QuesListPage tagFilterActive={true} />
            <RightSidePanel />
          </Route>
        </Switch>
      </Grid>
    </Container>
  );
};

export default Routes;
