import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMusic } from "../redux/musicSlice";
import Tablesong from "./TableSong";

const Mainlist = () => {
  const dispatch = useDispatch();
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

  return (
    <div className="Main">
        <h2>List Song</h2>
      <hr></hr><br></br>
      <div className="actionContainer">
        <div className="searchContainer">
          <input type="text" id="fname" name="fname" />
          <SearchIcon className="iconButton" />
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
