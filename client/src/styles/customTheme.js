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
    overrides: {
      MuiMenuItem: {
        root: {
          '&$selected': {
            borderRight: '4px solid #f4649f',
            fontWeight: '700',
          },
        },
      },
      MuiPopover: {
        paper: {
          borderRadius: 2,
        },
      },
      MuiButton: {
        root: {
          borderRadius: 2,
          textTransform: 'none',
        },
      },
    },
    props: {
      MuiButton: {
        disableElevation: true,
      },
    },
  });

export default customTheme;
