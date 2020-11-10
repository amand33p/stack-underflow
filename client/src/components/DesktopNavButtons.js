import { Button } from '@material-ui/core';

const DesktopNavButtons = ({ user, handleLogout }) => {
  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        size="small"
        style={{ marginRight: '7px' }}
      >
        Log In
      </Button>
      <Button color="primary" variant="contained" size="small">
        Sign Up
      </Button>
    </div>
  );
};

export default DesktopNavButtons;
