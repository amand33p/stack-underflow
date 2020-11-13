import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { AuthProvider } from './context/auth';

import customTheme from './styles/customTheme';
import { useBodyStyles } from './styles/muiStyles';
import { Paper } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const classes = useBodyStyles();

  return (
    <AuthProvider>
      <ThemeProvider theme={customTheme()}>
        <Paper className={classes.root} elevation={0}>
          <NavBar />
          <Routes />
        </Paper>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
