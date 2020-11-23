import { useStateContext } from '../context/state';

import { IconButton } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const DarkModeSwitch = () => {
  const { darkMode, toggleDarkMode } = useStateContext();
  const classes = useNavStyles();

  return (
    <IconButton
      color="primary"
      onClick={() => toggleDarkMode()}
      className={classes.iconBtn}
    >
      {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

export default DarkModeSwitch;
