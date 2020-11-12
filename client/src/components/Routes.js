import { Switch, Route } from 'react-router-dom';
import DesktopNavMenu from './DesktopNavMenu';
import QuesListPage from './QuesListPage';
import TagsMenu from './TagsMenu';

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
            <Grid item>
              <DesktopNavMenu />
            </Grid>
            <QuesListPage />
            <Grid item>
              <TagsMenu />
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </Container>
  );
};

export default Routes;
