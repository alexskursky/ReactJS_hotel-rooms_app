import {
  TableCell,
  TableRow,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import ReactDOM from "react-dom";
import { Fragment, useCallback, useEffect, useState } from "react";
import TableCellCustom from "../UI/TableCellCustom";

const TableItem = (props) => {
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  const { id, klvoMest, beds, free, roomType, comforts, price, longPrice } =
    props;

  const [values, setValues] = useState({klvoMest, beds, roomType, comforts, price, longPrice });

  const [check, setChecked] = useState(free);
  const [success, setSuccess] = useState(false);

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const onChangeValueHandler = (newValue) => {
    setValues(newValue);
    setClicked(true);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const onChangeCheckHandler = async () => {
    setChecked((prevState) => !prevState);
    setClicked(true);
  };

  const putData = useCallback(async () => {
    setError(false);
    setSuccess(false);
    try {
      const response = await fetch(
        `https://hotel-rooms-ccdbc-default-rtdb.europe-west1.firebasedatabase.app/${id}.json?auth=Zy6SlkMeZlvFYp3MrU1v7Q58iQnwSkoWM2bTF5bN`,
        {
          method: "PUT",
          body: JSON.stringify({
            "Тип комнаты": values.roomType,
            "Кол-во мест": values.klvoMest,
            Цена: values.price,
            "Цена за долгосроч": values.longPrice,
            Кровати: values.beds,
            Удобства: values.comforts,
            Свободен: check,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Ошибка изменения статуса!");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message);
      setOpenError(true);
    }
  }, [values, check, id]);

  useEffect(() => {
    if (clicked) {
      putData();
    }
  }, [putData, clicked]);

  return (
    <Fragment>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell
          component="th"
          scope="row"
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          {id}
        </TableCell>
        <TableCellCustom value={values.klvoMest} allValues={values} onChange={onChangeValueHandler} valueId='klvoMest'/>
        <TableCellCustom value={values.beds} allValues={values} onChange={onChangeValueHandler} valueId='beds'/>
        <TableCell align="center">
          <Checkbox
            checked={check}
            onChange={onChangeCheckHandler}
            inputProps={{ "aria-label": "controlled" }}
            color="success"
          />
        </TableCell>
        <TableCellCustom value={values.roomType} allValues={values} onChange={onChangeValueHandler} valueId='roomType'/>
        <TableCellCustom value={values.comforts} allValues={values} onChange={onChangeValueHandler} valueId='comforts'/>
        <TableCellCustom value={values.price} allValues={values} onChange={onChangeValueHandler} valueId='price'/>
        <TableCellCustom value={values.longPrice} allValues={values} onChange={onChangeValueHandler} valueId='longPrice' />
      </TableRow>
      {success &&
        ReactDOM.createPortal(
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={handleSuccessClose}
          >
            <Alert
              onClose={handleSuccessClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Статус номера - {id} успешно изменен!
            </Alert>
          </Snackbar>,
          document.getElementById("success-alert")
        )}
      {error &&
        ReactDOM.createPortal(
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleErrorClose}
          >
            <Alert
              onClose={handleErrorClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>,
          document.getElementById("error-alert")
        )}
    </Fragment>
  );
};

export default TableItem;
