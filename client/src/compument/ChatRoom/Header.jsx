import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { APISearchUser } from '../../utils/UserUtil';

export default function Header({selectedUser, setSelectedUser}) {
  const [listUser, setListUser] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const res = await APISearchUser(search);
      setListUser(res.filter(user => !selectedUser.find(u => u.id === user.id)));
    }
    if(search) fetchUser();
  }, [search])
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}} m={2}>
        <Typography variant='body1' mr={1} > Đến:</Typography>
        <Autocomplete
          multiple
          noOptionsText=""
          size='small'
          fullWidth
          popupIcon={null}
          value={selectedUser}
          onChange={(event, newValue) => {
            setSelectedUser(newValue);
            setSearch('');
            setListUser([]);
          }}
          options={listUser}
          getOptionLabel={(option) => option.name + ' - ' + option.email}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm"
              autoFocus
            />
          )}
        />
    </Box>
  )
}
