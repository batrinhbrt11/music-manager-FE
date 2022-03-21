import React, { useState, useEffect,useRef, forwardRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMusicByLink, getMusic } from "../redux/musicSlice";
import Tablesong from "./TableSong";

import AddIcon from '@mui/icons-material/Add';

const Mainlist = () => {
  const dispatch = useDispatch();
  const URL_API = process.env.REACT_APP_API_URL;
  const [page, setPage] = useState(1);
  const object = useSelector((state) => state.music.object);
  const isUpdate = useSelector((state) => state.music.isUpdate);
  const [listMusic, setListMusic] = useState(object.content);
  const [total, setTotal] = useState(object.totalElement);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getMusic(page));
  }, [dispatch, page, isUpdate]);

  useEffect(() => {
    setListMusic(object.content);
    setTotal(object.totalElement);
  }, [object]);

  const [timer, setTimer] = useState(null);

  const handleSearchText = (e) =>{
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        fetch(`${URL_API}/musics/search?text=${e.target.value}`)
        .then((res) => res.json())
        .then((result) => setListMusic(result.content))
        .catch((error) => console.log(error));
      }, 500)
    );
  
  }
  
  const musicLink= useRef("")
  const handleAddSongByLink=()=>{

    dispatch(addMusicByLink(musicLink.current.value))
    musicLink.current.value=""

  }

  
  return (
    <div className="Main">
        <h2>List Song</h2>
        
      <hr></hr><br></br>
     
      <div className="actionContainer">
        <div className="searchContainer">
          <input type="text" id="fname" name="fname" onChange={handleSearchText}   placeholder="Search.."/>
          <SearchIcon className="iconButton" />
        </div>
        <div className="searchContainer">
          <input type="text" id="fname" name="fname"   placeholder="Link to song.." ref={musicLink}/>
          <AddIcon className="iconButton" onClick={handleAddSongByLink}/>
        </div>
        <div>
          <Link to="/add-music">
            <AddCircleIcon className="iconButton" />
          </Link>
        </div>
      </div>
      <Tablesong list={listMusic} />
      <div className="pagination">
        <Stack spacing={2}>
          {total && (
            <Pagination
              count={Math.ceil(total / 10)}
              color="secondary"
              page={page}
              onChange={handleChange}
            />
          )}
        </Stack>
      </div>
      
     
    </div>
  );
};

export default Mainlist;
