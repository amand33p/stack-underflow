import { Link as RouterLink } from 'react-router-dom';
import MobileNavMenu from './MobileNavMenu';
import MobileUserMenu from './MobileUserMenu';
import DesktopNavButtons from './DesktopNavButtons';
import SofLogo from '../svg/stack-overflow.svg';

import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  Container,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const NavBar = () => {
  const classes = useNavStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={1}
      className={classes.appBar}
    >
      <Toolbar variant="dense" disableGutters={isMobile}>
        <Container disableGutters className={classes.contentContainer}>
          <div className={classes.leftPortion}>
            <div className={classes.logoWrapper}>
              {isMobile && <MobileNavMenu />}
              {isMobile ? (
                <IconButton
                  className={classes.logo}
                  component={RouterLink}
                  to="/"
                >
                  <img src={SofLogo} width="25px" alt="sof-logo" />
                </IconButton>
              ) : (
                <Button
                  className={classes.logo}
                  component={RouterLink}
                  to="/"
                  size="large"
                >
                  <img
                    src={SofLogo}
                    width="28px"
                    alt="sof-logo"
                    style={{ marginRight: '5px' }}
                  />
                  stack<strong>overflow</strong>-clone
                </Button>
              )}
              {!isMobile && (
                <Typography variant="caption" className={classes.myLink}>
                  | Made with <FavoriteIcon style={{ fontSize: 12 }} /> by
                  <Link
                    href={'https://github.com/amand33p'}
                    color="inherit"
                    target="_blank"
                    rel="noopener"
                  >
                    <strong>{` amand33p`}</strong>
                  </Link>
                </Typography>
              )}
            </div>
          </div>
          {isMobile ? <MobileUserMenu /> : <DesktopNavButtons />}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
