import React, { useState, useEffect, useRef,forwardRef } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Tablesong from "./TableSong";
import { useParams } from "react-router-dom";
import { getBySinger } from "../redux/musicSlice";
import CreateIcon from "@mui/icons-material/Create";
import TextField from "@mui/material/TextField";
import {storage} from "../FirebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Detailsinger = () => {
  const singerId = useParams().id;
  const [edit, setEdit] = useState(false);
  const URL_API = process.env.REACT_APP_API_URL;
  const [singer, setSinger] = useState();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const object = useSelector((state) => state.music.object);
  const isUpdate = useSelector((state) => state.music.isUpdate);
  const [listMusic, setListMusic] = useState(object.content);
  const [total, setTotal] = useState(object.totalElement);
  const name = useRef("");
  const valueRef = useRef("");
  const description = useRef("");
  const gender = useRef("");
  const [status,setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false);
  const [image,setImage] = useState(null)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
   
    setOpen(false);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const getSingerById = (id) => {
    fetch(`${URL_API}/singers/${id}`)
      .then((res) => res.json())
      .then((result) => setSinger(result.content[0]))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getSingerById(singerId);
  }, [singerId,singer]);
  useEffect(() => {
    dispatch(getBySinger({ id: singerId, page }));
  }, [dispatch, page, isUpdate]);

  useEffect(() => {
    setListMusic(object.content);
    setTotal(object.totalElement);
  }, [object]);

  const handleSubmit = (url) => {
  
    const newSinger = {
      singerName: name.current.value,
      singerSex: gender.current.value,
      singerBirthdy: valueRef.current.value,
      description: description.current.value,
      urlImage: url,
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(newSinger),
    };
    fetch(`${URL_API}/singers/${singerId}`, requestOptions)
      .then((res) => res.json())
      .then(result=> {
        setSinger(result.content[0])
        setStatus(result.status)
        setMessage(result.message)
        setOpen(true);
        setEdit(false)
      } )
      .catch((error) => {
        console.error(`Error ${error}`);
      });
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
      handleSubmit(singer.urlImage)
    }

  }

  return (
    <div className="Main">
      <Stack spacing={2} sx={{ width: "100%" }}>
      <div className="singerDetail">
        <h3>
          Singer Details
          <CreateIcon className="iconButton" onClick={(e) => setEdit(!edit)} />
        </h3>
        
        {singer && (
          <div className="singerDetail-container">
            <div className="square-loading ">
              <img
                src={singer.urlImage||"https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"}
                alt="Logo"
              />
            </div>
            {edit ? (
              // edit form
              <form className="formContainer" onSubmit={handleUpload}>
                <div className="row">
                  <div className="col-25">
                    <label>Singer name: </label>
                  </div>
                  <div className="col-75">
                    <input
                      type="text"
                      placeholder="Singer name.."
                      defaultValue={singer.singerName}
                      ref={name}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label>Gender: </label>
                  </div>
                  <div className="col-75">
                    <select
                      id="gender"
                      name="gender"
                      defaultValue={singer.singerSex}
                      ref={gender}
                    >
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
                      defaultValue={singer.singerBirthdy.slice(0, 10)}
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
                      defaultValue={singer.description}
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
            ) : (
              // info form
              <div className="singerDetail-info">
                <label>Name: </label> <span>{singer.singerName}</span>
                <br></br>
                <br></br>
                <label>Gender: </label>{" "}
                <span>{singer.singerSex ? "Male" : "Female"}</span>
                <br></br>
                <br></br>
                <label>Birthday:</label>{" "}
                <span>{singer.singerBirthdy.slice(0, 10)}</span>
                <br></br>
                <br></br>
                <label>Description:</label> <span>{singer.description}</span>
              </div>
            )}
          </div>
        )}
      
       
      </div>
      <hr></hr>
      <br></br>
      <Tablesong filter={"singer"} list={listMusic} />
      <div className="pagination">
        <Stack spacing={2}>
          {total > 0 && (
            <Pagination
              count={Math.ceil(total / 10)}
              color="secondary"
              page={page}
              onChange={handleChange}
            />
          )}
        </Stack>
      </div>

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

export default Detailsinger;
