import React, { useState, useEffect, useRef,forwardRef } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Tablesong from "./TableSong";
import { useParams } from "react-router-dom";
import { getBySinger } from "../redux/musicSlice";
import CreateIcon from "@mui/icons-material/Create";
import TextField from "@mui/material/TextField";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSinger = {
      singerName: name.current.value,
      singerSex: gender.current.value,
      singerBirthdy: valueRef.current.value,
      description: description.current.value,
      urlImage: "",
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
                src="data:image/jpeg;base64,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"
                alt="Logo"
              />
            </div>
            {edit ? (
              // edit form
              <form className="formContainer" onSubmit={handleSubmit}>
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
