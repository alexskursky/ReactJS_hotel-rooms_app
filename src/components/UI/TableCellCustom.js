import { TableCell, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import { Check } from "@mui/icons-material";

const TableCellCustom = (props) => {
  const { allValues, valueId } = props;

  const [value, setValue] = useState(props.value);

  const onChangeValueHandler = (event) => {
    setValue(event.target.value);
  };

  const onAcceptChangeHandler = () => {
    props.onChange({
      ...allValues,
      [valueId]: value,
    }); 
  }
      

  return (
    <TableCell align="center">
      <TextField
        id="standard-basic"
        variant="standard"
        onChange={onChangeValueHandler}
        value={value}
        sx={{width: '50%'}}
      /><IconButton component="span" color="success" onClick={onAcceptChangeHandler}><Check /></IconButton>
    </TableCell>
  );
};

export default TableCellCustom;
