import { Link as RouterLink } from 'react-router-dom';
import SofLogo from '../svg/stack-overflow.svg';

import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  Container,
} from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const NavBar = () => {
  const classes = useNavStyles();

  return (
    <AppBar position="static" color="inherit">
      <Toolbar variant="dense">
        <Container disableGutters className={classes.contentContainer}>
          <div className={classes.leftPortion}>
            <div className={classes.logoWrapper}>
              <Button
                className={classes.logo}
                component={RouterLink}
                to="/"
                size="large"
              >
                <img src={SofLogo} width="28px" alt="sof-logo" />
                stack<strong>overflow</strong>-clone
              </Button>
              <Typography variant="caption" color="secondary">
                Made with <FavoriteIcon style={{ fontSize: 12 }} /> by
                <Link
                  href={'https://github.com/amand33p'}
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                >
                  <strong>{` amand33p`}</strong>
                </Link>
              </Typography>
            </div>
          </div>
          <Typography>Logout</Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
