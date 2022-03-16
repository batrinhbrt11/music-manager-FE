import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Itemsinger from "./ItemSinger";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinger } from "../redux/singerSlice";

const Singer = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const object = useSelector((state) => state.singer.object);
  const isUpdate = useSelector((state) => state.singer.isUpdate);
  const [listSinger, setListSinger] = useState(object.content);
  const [total, setTotal] = useState(object.totalElement);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getSinger(page));
  }, [dispatch, page, isUpdate]);
  useEffect(() => {
    setListSinger(object.content);

    setTotal(object.totalElement);
  }, [object]);
  return (
    <div className="Main">
      <div className="actionContainer">
      <h2>List Singer</h2>
      <hr></hr><br></br>
        <div>
          <Link to="/add-singer">
            <AddCircleIcon className="iconButton" />
          </Link>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Singer Name</TableCell>
              <TableCell align="right">Song Num</TableCell>

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          {listSinger && (
            <TableBody>
              {listSinger.map((singer) => (
                <Itemsinger singer={singer} key={singer.singerId} />
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

export default Singer;
