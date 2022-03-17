import React, { useState, useRef } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { deleteSinger } from "../redux/singerSlice";
import { Link } from "react-router-dom";

const Itemsinger = ({ singer }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeleteClick = () => {
    dispatch(deleteSinger(singer.singerId));
  };
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Link to={`/singer/${singer.singerId}`} className="linkText">
          {singer.singerName}
        </Link>
      </TableCell>
      <TableCell align="right">{singer.count}</TableCell>
      <TableCell align="right" className="actionIcon">
        <DeleteIcon className="iconButton" onClick={handleClickOpenDelete} /> 
     
      </TableCell>

      {/* delete dialog */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >   <DialogTitle>Delete Dialog</DialogTitle>
        <DialogContent>
          {singer.count > 0 ? (
            <DialogContentText id="alert-dialog-description">
              This singerId has song, can not remove
            </DialogContentText>
          ) : (
            <DialogContentText id="alert-dialog-description">
              Are you sure to remove this singer ?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          {singer.count > 0 ? null : (
            <Button onClick={handleDeleteClick} autoFocus>
              Agree
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {/* end delete dialog */}
    </TableRow>
  );
};

export default Itemsinger;
