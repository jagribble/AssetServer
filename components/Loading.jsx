import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styleLoading = {
  background: '#e9e9e9',
  display: 'inherit',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0.5,
  zIndex: 100000,
};

const styleLoadingIcon = {
  marginLeft: '47%', marginTop: '-15vh', zIndex: 100000, display: 'inherit',
};

const Loading = () => {
  return (
    <div>
      <CircularProgress style={styleLoadingIcon} size={80} thickness={5} />
      <div style={styleLoading} />
    </div>
  );
};

export default Loading;
