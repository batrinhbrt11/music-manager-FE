import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Listitemmusic from "./ListItemMusic";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMusic } from "../redux/musicSlice";

const Mainlist = ({ filter }) => {
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

  }, [dispatch, page,isUpdate]);

  useEffect(() => {
    setListMusic(object.content);
    setTotal(object.totalElement);
  }, [object]);

 
  return (
    <div className="Main">
      <div className="actionContainer">
        <div className="searchContainer">
          <input type="text" id="fname" name="fname" />
          <SearchIcon
            onClick={(e) => console.log("sdasdasd")}
            className="iconButton"
          />
        </div>
        <div>
          <Link to="/add-music">
          
            <AddCircleIcon className="iconButton" />
          </Link>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Song Name</TableCell>
              <TableCell align="right">RealeaseTime</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">Singer</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          {listMusic && (
            <TableBody>
              {listMusic.map((row) => (
                <Listitemmusic music={row} filter={filter} key={row.musicId} />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
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
