import {
  Box,
  Grid,
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import RoomItem from "./RoomItem";

const Rooms = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roomsData, setRoomsData] = useState([]);

  const fetchPost = useCallback(async () => {
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
    fetchPost();
  }, [fetchPost]);

  return (
    <Fragment>
      {error && <p>{error}</p>}
      {isLoading && <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> }
      <Box>
          <List>
            <ListItem>
              <ListItemAvatar sx={{ bgcolor: 'green', width: 20, height: 20, minWidth: 0, mr: 1  }}>
              </ListItemAvatar>
              <ListItemText>
                - Номер свободен
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemAvatar sx={{ bgcolor: '#e16464', width: 20, height: 20, minWidth: 0, mr: 1  }}>
              </ListItemAvatar>
              <ListItemText>
                - Номер занят
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      <Box sx={{ p: 5 }}>
        <Grid container spacing={5}>
          {roomsData.map((room) => (
            <RoomItem
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
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Rooms;
