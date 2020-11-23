import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthFormModal from './AuthFormModal';

import { Button, Menu, MenuItem, Avatar, Typography } from '@material-ui/core';
import { useMenuStyles } from '../styles/muiStyles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const UserMenuDesktop = ({ user, logoutUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useMenuStyles();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logoutUser();
    handleCloseMenu();
  };

  return (
    <div>
      {user ? (
        <div style={{ display: 'inline' }}>
          <Button
            className={classes.userBtn}
            onClick={handleOpenMenu}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <Avatar
              alt={user.username}
              src={`https://secure.gravatar.com/avatar/${user.id}?s=164&d=identicon`}
              className={classes.avatar}
            />
            <Typography color="secondary" variant="body2">
              {user.username}
            </Typography>
          </Button>
          <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            elevation={1}
          >
            <MenuItem
              component={RouterLink}
              to={`/user/${user.username}`}
              onClick={handleCloseMenu}
            >
              <AccountCircleIcon className={classes.menuIcon} />
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>
              <PowerSettingsNewIcon className={classes.menuIcon} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <AuthFormModal />
      )}
    </div>
  );
};

export default UserMenuDesktop;
