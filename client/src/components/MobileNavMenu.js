import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import PublicIcon from '@material-ui/icons/Public';

const MobileNavMenu = () => {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

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
      >
        <MenuItem selected={pathname === '/'} dense>
          Stack Overflow{' '}
          <PublicIcon style={{ marginLeft: '6px', fontSize: '20px' }} />
        </MenuItem>
        <MenuItem selected={pathname === '/tags'} dense>
          Tags
        </MenuItem>
        <MenuItem selected={pathname === '/users'} dense>
          Users
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileNavMenu;
