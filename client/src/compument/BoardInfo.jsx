import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function BoardInfo({ size, setSize }) {
  const listSize = [3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <Typography variant="h2">Board</Typography>
      <Box>
        <FormControl fullWidth>
          <InputLabel>Size</InputLabel>
          <Select label="Size">
            {listSize.map((item) => (
              <MenuItem key={item} value={item} onClick={() => setSize(item)}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Typography variant="h3">Size: {size}</Typography>
      </Box>
    </>
  );
}
