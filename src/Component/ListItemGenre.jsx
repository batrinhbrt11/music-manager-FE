import React,{useState,useRef} from "react";
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
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { deleteGenre, updateGenre } from "../redux/genreSlice";
import { Link, useParams } from "react-router-dom";
const Listitemgenre = ({ genre }) => {
 
  const name = useRef("");
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch()
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeleteClick = () => {
    
    dispatch(deleteGenre( genre.genreId));
  
};

  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleSubmitEdit= (e)=>{
    e.preventDefault()
    
    dispatch(updateGenre({id: genre.genreId , genre:{genreName:name.current.value}}))

    setOpenEdit(false);
  }

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Link to ={`/genre/${genre.genreId}`} className="linkText"> 
        {genre.genreName}
        </Link>
     
      </TableCell>
      <TableCell align="right">{genre.count}</TableCell>
      <TableCell align="right" className="actionIcon">
        <DeleteIcon className="iconButton" onClick={handleClickOpenDelete}/> |
        <CreateIcon className="iconButton" onClick={handleClickOpenEdit}/>
      </TableCell>


      {/* edit dialog */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <div className="row">
              <div className="col-25">
                <label>Genre name: </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  placeholder="Song name.."
                  defaultValue={genre.genreName}
                  ref={name}
                />
              </div>
            </div>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleCloseEdit}>Cancel</Button>
           <Button  autoFocus onClick={handleSubmitEdit}>
            Agree
          </Button>
         
        </DialogActions>
      </Dialog>
      {/* end edit dialog */}

      {/* delete dialog */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {(genre.count >0 ) ?   <DialogContentText id="alert-dialog-description">
            This genre has song, can not remove 
          </DialogContentText>  :  <DialogContentText id="alert-dialog-description">
            Are you sure to remove this genre ?
          </DialogContentText>}
     
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleCloseDelete}>Cancel</Button>
          {(genre.count >0 )  ? null :  <Button  onClick={handleDeleteClick} autoFocus>
            Agree
          </Button>}
         
        </DialogActions>
      </Dialog>
      {/* end delete dialog */}
    </TableRow>
  );
};

export default Listitemgenre;
