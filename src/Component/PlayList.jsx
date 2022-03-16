import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "../redux/musicSlice";
import Tablesong from "./TableSong";
const Playlist = () => {
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
    dispatch(getPlaylist(page));
  }, [dispatch, page, isUpdate]);

  useEffect(() => {
    setListMusic(object.content);
    setTotal(object.totalElement);
  }, [object]);
  return (
    <div className="Main">
      <h2>Your PlayList</h2>
      <hr></hr>
      <br></br>
      <Tablesong list={listMusic} filter={"playlist"} />
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

export default Playlist;
