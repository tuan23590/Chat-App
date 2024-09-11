import { Box, Typography } from '@mui/material';
import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <Box>
      <Typography variant="h1">Error</Typography>
      <Typography variant="body1">{error.message || error.status}</Typography>
      <Typography variant="body1" color='red' >{error.statusText}</Typography>
    </Box>
  )
}
