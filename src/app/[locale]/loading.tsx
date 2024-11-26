import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { NextPage } from 'next';

const LoadingPage: NextPage = () => {
  return (
    <Box
      sx={{
        height: 'calc(100dvh - 100px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
