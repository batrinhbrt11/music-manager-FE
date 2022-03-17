import React, { useState, useRef, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { addSinger } from "../redux/singerSlice";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {storage} from "../FirebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Addsinger = () => {
  const navigate = useNavigate();
  const valueRef = useRef("");
  const name = useRef("");
  const [open, setOpen] = useState(false);
  const gender = useRef("");
  const description = useRef("");
  const [valid, setValid] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.singer.status);
  const message = useSelector((state) => state.singer.error);
  const [image,setImage] = useState(null)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if(status ==='ok'){
      return navigate("/singer") 
    }
    setOpen(false);
  };
  const handleSubmit = (url) => {
    if (name.current.value === "") {
      setValid("Singer name is required!!");
    } else {
      const newSinger = {
        singerName: name.current.value,
        singerSex: gender.current.value,
        singerBirthdy: valueRef.current.value,
        description: description.current.value,
        urlImage: url,
      };
     
      dispatch(addSinger(newSinger));
      setOpen(true);
      
    }
  };
  const handleFileChange =(e)=>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }
  const handleUpload = (e)=>{
    e.preventDefault();
    if(image){
      const storageRef = ref(storage, `/image/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
   
      uploadTask.on("state_changed",
        snapshot=>{},
        error=>{
          console.log(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(url=>handleSubmit(url))
        }
      )
    }else{
      handleSubmit("")
    }
  }
  return (
    <div className="Main">
      <h2>Adding Singer</h2>
      <hr></hr>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <form className="formContainer" onSubmit={handleUpload}>
          <div className="row">
            <div className="col-25">
              <label>Singer name: </label>
            </div>
            <div className="col-75">
              <input
                type="text"
                placeholder="Singer name.."
                ref={name}
                onFocus={(e) => setValid("")}
              />
            </div>
          </div>
          {valid && (
            <div className="row">
              <div className="col-25"></div>
              <div className="col-75">
                <span className="errorMessage">{valid}</span>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-25">
              <label>Gender: </label>
            </div>
            <div className="col-75">
              <select id="gender" name="gender" ref={gender}>
                <option value={true}>Male</option>
                <option value={false}>Female</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label>Birthday: </label>
            </div>
            <div className="col-75">
              <TextField
                id="date"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={valueRef}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Description: </label>
            </div>
            <div className="col-75">
              <textarea
                id="subject"
                name="subject"
                placeholder="Write something.."
                ref={description}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Image: </label>
            </div>
            <div className="col-75">
            <input type="file" id="myfile" name="myfile"  accept=".png,.jpeg,.jpg" onChange={handleFileChange}/>
            </div>
          </div>
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

export default Addsinger;
