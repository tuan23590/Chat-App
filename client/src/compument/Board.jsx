import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BoardInfo from "./BoardInfo";

export default function Board() {
  const [size, setSize] = useState(4);
  const [board, setBoard] = useState([]);
  const boardWidth = 300;
  const boardHeight = 300;
  const cellSize = Math.min(boardWidth / size, boardHeight / size);
  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(" ");
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  }, [size]);

  return (
    <Box>
      <BoardInfo size={size} setSize={setSize} />
      <Box>
        <Typography variant="h3">Board</Typography>
        <Box
          sx={{
            border: 1,
            width: `${boardWidth}px`,
            height: `${boardHeight}px`,
            overflow: "hidden",
          }}
        >
          {board.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {row.map((cell, cellIndex) => (
                <Box
                  key={cellIndex}
                  sx={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    border: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    const newBoard = [...board];
                    if (newBoard[rowIndex][cellIndex] === " ") {
                      newBoard[rowIndex][cellIndex] = "O";
                    } else {
                      newBoard[rowIndex][cellIndex] = "X";
                    }
                    setBoard(newBoard);
                  }}
                >
                  <Typography sx={{fontSize: `${cellSize}px`}} >{cell}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
