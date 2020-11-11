import { Switch, Route } from 'react-router-dom';
import DesktopNavPanel from './DesktopNavPanel';
import QuesListPage from './QuesListPage';
import PopularTagsPanel from './PopularTagsPanel';

import { Grid } from '@material-ui/core';
import { useMainLayoutStyles } from '../styles/muiStyles';

const Routes = () => {
  const classes = useMainLayoutStyles();

  return (
    <Switch>
      <Route exact path="/ask">
        <h1>ask here</h1>
      </Route>
      <Route exact>
        <Grid container direction="row">
          <Grid item>
            <DesktopNavPanel />
          </Grid>

          <QuesListPage />
          <Grid item>
            <PopularTagsPanel />
          </Grid>
        </Grid>
      </Route>
    </Switch>
  );
};

export default Routes;
