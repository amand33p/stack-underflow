import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = () =>
  createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#bb44f0',
      },
      secondary: {
        main: '#24124b',
      },
    },
  });

export default customTheme;
