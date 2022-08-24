import {
  Grid,
  Paper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandMore, People, Bed, RoomPreferences, Chair, Payments, Sell } from "@mui/icons-material";

const RoomItem = (props) => {
  let bgColor;
  if (props.free === "T" || props.free === true) {
    bgColor = "green";
  } else {
    bgColor = "#e16464";
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={2.4}>
      <Paper elevation={3}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ bgcolor: bgColor }}
          >
            <Typography sx={{fontWeight: 500}}>{props.id}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText
                  primary={props.klvoMest}
                  secondary="Кол-во мест"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Bed />
                </ListItemIcon>
                <ListItemText
                  primary={props.beds}
                  secondary="Кровати"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RoomPreferences />
                </ListItemIcon>
                <ListItemText
                  primary={props.roomType}
                  secondary="Тип комнаты"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chair />
                </ListItemIcon>
                <ListItemText
                  primary={props.comforts}
                  secondary="Удобства"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Payments />
                </ListItemIcon>
                <ListItemText
                  primary={props.price + " грн."}
                  secondary="Цена"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Sell />
                </ListItemIcon>
                <ListItemText
                  primary={props.longPrice + " грн."}
                  secondary="Цена за долгосроч"
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Grid>
  );
};

export default RoomItem;
