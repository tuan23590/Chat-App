import { Box, Typography } from '@mui/material'
import React from 'react'
import UserMenu from './../compument/UserMenu';
import Board from '../compument/Board';

export default function Home() {
  return (
    <Box>
      <Typography variant="h1">Home</Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 2
      }} >
      <UserMenu/>
      </Box>
      <Board/>
    </Box>
  )
}
