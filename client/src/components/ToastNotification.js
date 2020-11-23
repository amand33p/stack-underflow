import { useStateContext } from '../context/state';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ToastNotification = () => {
  const { notification, clearNotif } = useStateContext();

  if (!notification?.message) {
    return null;
  }

  const { message, severity } = notification;

  return (
    <Snackbar
      open={!!notification}
      onClose={() => clearNotif()}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={() => clearNotif()} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
