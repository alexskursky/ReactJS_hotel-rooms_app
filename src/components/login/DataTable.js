import { useState, useEffect, useCallback } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import TableItem from "./TableItem";

const DataTable = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roomsData, setRoomsData] = useState([]);

  const fetchGet = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://hotel-rooms-ccdbc-default-rtdb.europe-west1.firebasedatabase.app/.json?auth=Zy6SlkMeZlvFYp3MrU1v7Q58iQnwSkoWM2bTF5bN"
      );
      if (!response.ok) {
        throw new Error("Something went wrong. Please, try later!");
      }
      const data = await response.json();

      const arr = [];
      for (const roomId in data) {
        arr.push({
          id: roomId,
          klvoMest: data[roomId]["Кол-во мест"],
          beds: data[roomId].Кровати,
          free: data[roomId].Свободен,
          roomType: data[roomId]["Тип комнаты"],
          comforts: data[roomId].Удобства,
          price: data[roomId].Цена,
          longPrice: data[roomId]["Цена за долгосроч"],
        });
      }

      setRoomsData(arr);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchGet();
  }, [fetchGet]);

  return (
    <Box sx={{ p: 6 }}>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>№ Комнаты</TableCell>
                <TableCell align="center">Кол-во мест</TableCell>
                <TableCell align="center">Кровати</TableCell>
                <TableCell align="center">Свободен</TableCell>
                <TableCell align="center">Тип комнаты</TableCell>
                <TableCell align="center">Удобства</TableCell>
                <TableCell align="center">Цена</TableCell>
                <TableCell align="center">Цена за долгосроч</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomsData.map((room) => (
                <TableItem
                  id={room.id}
                  key={room.id}
                  klvoMest={room.klvoMest}
                  beds={room.beds}
                  free={room.free}
                  roomType={room.roomType}
                  comforts={room.comforts}
                  price={room.price}
                  longPrice={room.longPrice}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default DataTable;
