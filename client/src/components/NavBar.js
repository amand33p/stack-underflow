import { Link as RouterLink } from 'react-router-dom';
import NavMenuMobile from './NavMenuMobile';
import UserMenuMobile from './UserMenuMobile';
import UserMenuDesktop from './UserMenuDesktop';
import { useAuthContext } from '../context/auth';
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
  const { user, logoutUser } = useAuthContext();
  const classes = useNavStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleLogout = () => {
    logoutUser();
  };

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
              {isMobile && <NavMenuMobile />}
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
                <Typography
                  variant="caption"
                  className={classes.myLink}
                  color="secondary"
                >
                  | Made with{' '}
                  <FavoriteIcon style={{ fontSize: 10, color: '#f4649f' }} /> by
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
          {isMobile ? (
            <UserMenuMobile user={user} logoutUser={handleLogout} />
          ) : (
            <UserMenuDesktop user={user} logoutUser={handleLogout} />
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
