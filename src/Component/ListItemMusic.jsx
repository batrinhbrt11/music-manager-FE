import React, { useState, useRef, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addPlaylist, deleteMusic, updateMusic } from "../redux/musicSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { storage } from "../FirebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";


const Listitemmusic = ({ music, filter, setMusic ,stompClient}) => {
  const dispatch = useDispatch();
  const [listGenre, setListGenre] = useState([]);
  const [listSinger, setListSinger] = useState([]);
  const [genreOfSong, setGenreOfSong] = useState("");
  const [singerOfSong, setSingerOfSong] = useState("");
  const [file, setFile] = useState(null);
  const URL_API = process.env.REACT_APP_API_URL;
  const valueRef = useRef("");
  const name = useRef("");
  const [genre, setGenre] = useState(music.idGenre);
  const [singer, setSinger] = useState(music.idSinger);
  const getGenreById = () => {
    fetch(`${URL_API}/genres/${music.idGenre}`)
      .then((res) => res.json())
      .then((result) => setGenreOfSong(result.content[0].genreName))
      .catch((error) => console.log(error));
  };
  const getSingerById = () => {
    fetch(`${URL_API}/singers/${music.idSinger}`)
      .then((res) => res.json())
      .then((result) => setSingerOfSong(result.content[0].singerName))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if(music.idGenre !== "" && music.idGenre !== null){
      getGenreById();
    }
    if(music.idSinger!== ""&& music.idSinger!== null){
      getSingerById();
    }
  
  }, [music.idGenre, music.idSinger]);
  const handleDeleteClick = () => {
    dispatch(deleteMusic(music.musicId));
  };
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

  const [openEdit, setOpenEdit] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
    fectchGenre();
    fectchSinger();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSubmitEdit = (url) => {
    const newMusic = {
      musicName: name.current.value,
      idGenre: genre,
      idSinger: singer,
      isPlaylist: music.isPlayList,
      realeaseTime: valueRef.current.value,
      urlFile: url,
    };

    dispatch(updateMusic({ id: music.musicId, music: newMusic }));
    setOpenEdit(false);
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  
  const sendMessage = () => {
    
    if (stompClient) {
    
      stompClient.send("/app/addPlaylist", {},JSON.stringify( music.musicId));
    }
    
  };

  const handelAddPlaylist = (e) => {
    e.preventDefault();
    dispatch(addPlaylist(music.musicId));
    if(filter !== "playlist"){
      sendMessage();
    }
   
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      const storageRef = ref(storage, `/music/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) =>
            handleSubmitEdit(url)
          );
        }
      );
    } else {
      handleSubmitEdit(music.urlFile);
    }
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {music.musicName}
      </TableCell>
      <TableCell align="right">{ (music.realeaseTime!== ""&& music.realeaseTime!== null) ? music.realeaseTime.slice(0, 10) : "Unknown"}</TableCell>
      {filter !== "genre" && <TableCell align="right">{ (music.idGenre!== ""&& music.idGenre!== null) ? genreOfSong :"Unknown"}</TableCell>}
      {filter !== "singer" && (
        <TableCell align="right">{(music.idSinger!== ""&& music.idSinger!== null)?singerOfSong:"Unknown"}</TableCell>
      )}

      {filter !== "playlist" ? (
        <TableCell align="right" className="actionIcon">
          <PlayArrowIcon
            className="iconButton"
            onClick={(e) => setMusic(music.urlFile)}
          />
          <DeleteIcon className="iconButton" onClick={handleClickOpenDelete} />
          |
          <CreateIcon className="iconButton" onClick={handleClickOpenEdit} /> |
          {!music.isPlayList ? (
            <FavoriteIcon className="iconButton" onClick={handelAddPlaylist} />
          ) : (
            <FavoriteIcon
              className="iconButton like_active"
              onClick={handelAddPlaylist}
            />
          )}
        </TableCell>
      ) : (
        <TableCell align="right" className="actionIcon">
          <FavoriteIcon
            className="iconButton like_active"
            onClick={handelAddPlaylist}
          />
        </TableCell>
      )}
      {/* edit dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Edit Dialog</DialogTitle>
        <DialogContent>
          <form>
            <div className="row">
              <div className="col-25">
                <label>Song name: </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  placeholder="Song name.."
                  defaultValue={music.musicName}
                  ref={name}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label>Genre: </label>
              </div>
              <div className="col-75">
                <select
                  id="genres"
                  name="genres"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  {listGenre.map((genre) => (
                    <option key={genre.genreId} value={genre.genreId}>
                      {genre.genreName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label>Singer: </label>
              </div>
              <div className="col-75">
                <select
                  id="singer"
                  name="singer"
                  value={singer}
                  onChange={(e) => setSinger(e.target.value)}
                >
                  {listSinger.map((singer) => (
                    <option key={singer.singerId} value={singer.singerId}>
                      {singer.singerName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label>Release Time: </label>
              </div>
              <div className="col-75">
                <TextField
                  id="date"
                  type="date"
                  defaultValue={ (music.realeaseTime!== ""&& music.realeaseTime!== null) ? music.realeaseTime.slice(0, 10) : ""}
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
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  accept=".mp3"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpload}>
            Submit
          </Button>
          <Button onClick={handleCloseEdit} autoFocus>
            Close
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
        {" "}
        <DialogTitle>Delete Dialog</DialogTitle>
        <DialogContent>
          {music.isPlayList ? (
            <DialogContentText id="alert-dialog-description">
              The song is existed in Playlist, can not remove
            </DialogContentText>
          ) : (
            <DialogContentText id="alert-dialog-description">
              Are you sure to remove this song ?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          {music.isPlayList ? null : (
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

export default Listitemmusic;
