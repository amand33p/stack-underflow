import React from 'react';
import NavBar from './components/NavBar';

import customTheme from './styles/customTheme';
import { useMainPaperStyles } from './styles/muiStyles';
import { Paper } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const classes = useMainPaperStyles();

  return (
    <ThemeProvider theme={customTheme()}>
      <Paper className={classes.root} elevation={0}>
        <NavBar />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
