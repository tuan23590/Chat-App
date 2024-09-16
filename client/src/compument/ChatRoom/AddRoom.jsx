import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { APISearchUser } from '../../utils/UserUtil';
import { AppContext } from '../../context/AppProvider';
import { DEBOUNCE } from '../../function/index';

export default function AddRoom() {
  const [listUser, setListUser] = useState([]);
  const [search, setSearch] = useState('');
  const { selectedUser, setSelectedUser } = useContext(AppContext);

  // Sử dụng useCallback để tạo hàm debounce chỉ tạo ra một lần
  const debounceSearch = useCallback(
    DEBOUNCE((value) => {
      setSearch(value);
    }, 1000), // Delay 1000ms
    []
  );

  useEffect(() => {
    const fetchUser = async () => {
      const res = await APISearchUser(search);
      setListUser(res.filter(user => !selectedUser.find(u => u.id === user.id)));
    };
    
    if (search) fetchUser();
    else setListUser([]);
    
  }, [search, selectedUser]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant='body1' mr={1}> Đến:</Typography>
      <Autocomplete
        multiple
        noOptionsText=""
        size='small'
        fullWidth
        sx={{ maxWidth: "90%" }}
        popupIcon={null}
        value={selectedUser}
        onChange={(event, newValue) => {
          setSelectedUser(newValue);
          debounceSearch('');  // Reset search field khi chọn user
          setListUser([]); // Clear list
        }}
        options={listUser}
        getOptionLabel={(option) => option.name + ' - ' + option.email}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => debounceSearch(e.target.value)} // Gọi debounce khi người dùng nhập vào
            placeholder="Tìm kiếm"
            autoFocus
          />
        )}
      />
    </Box>
  );
}
