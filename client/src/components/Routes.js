import { Switch, Route } from 'react-router-dom';
import DesktopNavPanel from './DesktopNavPanel';
import QuestionList from './QuestionList';
import PopularTagsPanel from './PopularTagsPanel';

import {} from '@material-ui/core';
import { useMainLayoutStyles } from '../styles/muiStyles';

const Routes = () => {
  const classes = useMainLayoutStyles();

  return (
    <Switch>
      <Route exact path="/ask">
        <h1>ask here</h1>
      </Route>
      <Route exact>
        <div className={classes.root}>
          <DesktopNavPanel />
          <QuestionList />
          <PopularTagsPanel />
        </div>
      </Route>
    </Switch>
  );
};

export default Routes;
