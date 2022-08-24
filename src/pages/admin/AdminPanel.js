import { Box, Button, Typography } from "@mui/material";
import { Fragment } from "react";
import { getAuth, signOut } from "firebase/auth";
import { userActions } from "../../store/slices/user-slice";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import DataTable from "../../components/login/DataTable";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const onSignOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(userActions.removeUser());
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Fragment>
      <Box sx={{p: 5, display: 'flex', flexDirection: 'column'}} alignItems="center">
        <Typography variant="h3" component="span" sx={{mr: 3}} gutterBottom>
          Панель администратора
        </Typography>
        <Button variant="contained" type="button" onClick={onSignOutHandler}>
          Выйти
        </Button>
      </Box>
      <DataTable />
    </Fragment>
  );
};

export default AdminPanel;
