import { Grid2 } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Pending() {
  return (
    <Grid2 container>
      <Grid2 size={3} borderRight={1} height={'98vh'}>
        <h1>Pending</h1>
      </Grid2>
      <Grid2 size={9}>
        <Outlet />
      </Grid2>
    </Grid2>
  )
}
