import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = ({ size }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '3em', marginBottom: '1em' }}>
      <CircularProgress disableShrink size={size || 40} />
    </div>
  );
};

export default LoadingSpinner;
