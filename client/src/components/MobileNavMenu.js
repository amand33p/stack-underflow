import { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useMenuStyles } from '../styles/muiStyles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import PublicIcon from '@material-ui/icons/Public';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PeopleIcon from '@material-ui/icons/People';

const MobileNavMenu = () => {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useMenuStyles();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleOpenMenu}>
        {!anchorEl ? (
          <MenuIcon />
        ) : (
          <CloseIcon style={{ backgroundColor: '#E8E8E8' }} />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        marginThreshold={0}
        elevation={1}
      >
        <MenuItem
          selected={pathname === '/'}
          dense
          component={RouterLink}
          to="/"
          onClick={handleCloseMenu}
        >
          <PublicIcon className={classes.menuIcon} />
          Stack Overflow
        </MenuItem>
        <MenuItem
          selected={pathname === '/tags'}
          dense
          component={RouterLink}
          to="/tags"
          onClick={handleCloseMenu}
        >
          <LocalOfferIcon className={classes.menuIcon} />
          Tags
        </MenuItem>
        <MenuItem
          selected={pathname === '/users'}
          dense
          component={RouterLink}
          to="/users"
          onClick={handleCloseMenu}
        >
          <PeopleIcon className={classes.menuIcon} />
          Users
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileNavMenu;
