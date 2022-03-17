import { AddCircle } from "@mui/icons-material";
import React, { useState, useEffect, useRef, forwardRef } from "react";

import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addMusic } from "../redux/musicSlice";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../FirebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Addmusic = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [file,setFile] = useState(null)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (status === "ok") {
      return navigate("/");
    }
    setOpen(false);
  };
  const URL_API = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [listGenre, setListGenre] = useState([]);
  const [listSinger, setListSinger] = useState([]);
  const [valid, setValid] = useState({});
  const [singer, setSinger] = useState("0");
  const [name, setName] = useState("");

  const [genre, setGenre] = useState("0");
  const status = useSelector((state) => state.music.status);
  const message = useSelector((state) => state.music.error);
  const valueRef = useRef("");
  const fectchGenre = () => {
    fetch(`${URL_API}/genres/getAll`)
      .then((res) => res.json())
      .then((result) => setListGenre(result))
      .catch((error) => console.log(error));
  };
  const fectchSinger = () => {
    fetch(`${URL_API}/singers/getAll`)
      .then((res) => res.json())
      .then((result) => setListSinger(result))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fectchGenre();
    fectchSinger();
  }, []);
  const handleFileChange =(e)=>{
    if(e.target.files[0]){
      setFile(e.target.files[0])
    }
  }
  const handleUpload = (e)=>{
    e.preventDefault();
  
      const storageRef = ref(storage, `/music/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
   
      uploadTask.on("state_changed",
        snapshot=>{},
        error=>{
          console.log(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(url=>handleSubmit(url))
        }
      )
   

  }
  const handleSubmit = (url) => {
    
    try {
      if (name === "") {
        setValid({ ...valid, name: "Song name is required!!" });
      } else if (genre === "0") {
        setValid({ ...valid, genre: "Genre is required!!" });
      } else if (singer === "0") {
        setValid({ ...valid, singer: "Singer is required!!" });
      } else {
        const newMusic = {
          musicName: name,
          idGenre: genre,
          idSinger: singer,
          isPlaylist: false,
          realeaseTime: valueRef.current.value,
          urlFile: url,
        };
        dispatch(addMusic(newMusic));
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Main">
      <h2>Adding Music</h2>
      <hr></hr>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <form className="formContainer" onSubmit={handleUpload}>
          <div className="row">
            <div className="col-25">
              <label>Song name: </label>
            </div>
            <div className="col-75">
              <input
                type="text"
                placeholder="Song name.."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setValid({});
                }}
              />
            </div>
          </div>
          {valid.name && (
            <div className="row">
              <div className="col-25"></div>
              <div className="col-75">
                <span className="errorMessage">{valid.name}</span>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-25">
              <label>Genre: </label>
            </div>
            <div className="col-75">
              <select
                id="genres"
                name="genres"
                onChange={(e) => {
                  setGenre(e.target.value);
                  setValid({});
                }}
                value={genre}
              >
                <option defaultValue="0">Choose Genre...</option>
                {listGenre.map((genre) => (
                  <option key={genre.genreId} value={genre.genreId}>
                    {genre.genreName}
                  </option>
                ))}
              </select>
              <Link to="/add-genre">
                <AddCircle className="iconButton" />
              </Link>
            </div>
          </div>
          {valid.genre && (
            <div className="row">
              <div className="col-25"></div>
              <div className="col-75">
                <span className="errorMessage">{valid.genre}</span>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-25">
              <label>Singer: </label>
            </div>
            <div className="col-75">
              <select
                id="singer"
                name="singer"
                onChange={(e) => {
                  setSinger(e.target.value);
                  setValid({});
                }}
                value={singer}
              >
                <option defaultValue="0">Choose Singer...</option>
                {listSinger.map((singer) => (
                  <option key={singer.singerId} value={singer.singerId}>
                    {singer.singerName}
                  </option>
                ))}
              </select>
              <Link to="/add-singer">
                <AddCircle className="iconButton" />
              </Link>
            </div>
          </div>
          {valid.singer && (
            <div className="row">
              <div className="col-25"></div>
              <div className="col-75">
                <span className="errorMessage">{valid.singer}</span>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-25">
              <label>Release Time: </label>
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
              <label>File: </label>
            </div>
            <div className="col-75">
            <input type="file" id="myfile" name="myfile"  accept=".mp3" onChange={handleFileChange}/>
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

export default Addmusic;
