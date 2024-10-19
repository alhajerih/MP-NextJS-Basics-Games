import React from 'react';

const ReloadButton = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <button className='rl-btn' onClick={handleReload}>Restart</button>
  );
};

export default ReloadButton;
