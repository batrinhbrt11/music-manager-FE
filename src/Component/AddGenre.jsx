import React, { useState, useEffect, useRef, forwardRef } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addGenre } from "../redux/genreSlice";
import { Link, useNavigate } from "react-router-dom";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Addgenre = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [valid,setValid]= useState("");
  const dispatch=useDispatch()
  const status = useSelector((state) => state.genre.status);
  const message = useSelector((state) => state.genre.error);
  const name = useRef("")
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if(status ==='ok'){
      return navigate("/genre") 
    }
    setOpen(false);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    try {
      if(name.current.value === ""){
        setValid("Genre name is required !!!")
      }
      
      else{
        const newGenre = {
          genreName:name.current.value
        };
        dispatch(addGenre(newGenre));
        setOpen(true);
       
      }
     
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Main">
      <h2>Adding Genre</h2>
      <hr></hr>
      <Stack spacing={2} sx={{ width: "100%" }}>
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label>Genre name: </label>
          </div>
          <div className="col-75">
            <input type="text" placeholder="Genre name.." ref={name} onFocus={e=>setValid("")}/>
          </div>
        </div>
        {valid && (     <div className="row">
            <div className="col-25">
            </div>
            <div className="col-75">
              <span className="errorMessage">{valid}</span>
            </div>
          </div>)}
        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          {status === "ok" ? (
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {message} !!
            </Alert>
          ) : (
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message} !!
            </Alert>
          )}
        </Snackbar>
      </Stack>
      
    </div>
  );
};

export default Addgenre;
