import { useState } from 'react';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useMenuStyles } from '../styles/muiStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const MobileUserMenu = ({ user, handleLogout }) => {
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
      <IconButton onClick={handleOpenMenu} color="primary">
        <MoreVertIcon color="primary" />
      </IconButton>
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
        marginThreshold={0}
        elevation={1}
      >
        <MenuItem>
          <ExitToAppIcon className={classes.menuIcon} />
          Log In
        </MenuItem>
        <MenuItem>
          <PersonAddIcon className={classes.menuIcon} />
          Sign Up
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileUserMenu;
