import * as React from 'react';
import {Box, CircularProgress} from '@mui/material';

export default function UseLoading() {

  return (
    <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
  );
}
