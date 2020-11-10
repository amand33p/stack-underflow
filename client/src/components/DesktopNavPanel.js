import { useLocation, Link as RouterLink } from 'react-router-dom';

import { List, MenuItem, useMediaQuery, Divider } from '@material-ui/core';
import { useMenuStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import PublicIcon from '@material-ui/icons/Public';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PeopleIcon from '@material-ui/icons/People';

const DesktopNavPanel = () => {
  const { pathname } = useLocation();
  const classes = useMenuStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  if (isMobile) return null;

  return (
    <div className={classes.rootPanel}>
      <List component="nav" className={classes.list}>
        <MenuItem selected={pathname === '/'} component={RouterLink} to="/">
          <PublicIcon className={classes.menuIcon} />
          Stack Overflow
        </MenuItem>
        <MenuItem
          selected={pathname === '/tags'}
          component={RouterLink}
          to="/tags"
        >
          <LocalOfferIcon className={classes.menuIcon} />
          Tags
        </MenuItem>
        <MenuItem
          selected={pathname === '/users'}
          component={RouterLink}
          to="/users"
        >
          <PeopleIcon className={classes.menuIcon} />
          Users
        </MenuItem>
      </List>
      <Divider orientation="vertical" flexItem />
    </div>
  );
};

export default DesktopNavPanel;
