import React,{useEffect, useState} from "react";
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

import Listitemgenre from "./ListItemGenre";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenre } from "../redux/genreSlice";

const Genre = () => {
  const dispatch= useDispatch()
  const [page, setPage] = useState(1);
  const object = useSelector((state)=> state.genre.object)
  const isUpdate = useSelector((state) => state.genre.isUpdate);
  const [listGenre, setListGenre ] = useState(object.content)
  const [total, setTotal] = useState(object.totalElement);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(()=>{
    dispatch(getGenre(page));
    
  },[dispatch,page,isUpdate])
  useEffect(() => {
    setListGenre(object.content);
    
    setTotal(object.totalElement);
  }, [object]);
  return (
    <div className="Main">
      <div className="actionContainer">
      <h2>List Genre</h2>
      <hr></hr><br></br>
        <div>
          <Link to="/add-genre">
          <AddCircleIcon className="iconButton" />
            </Link>
  
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Genre Name</TableCell>
              <TableCell align="right">Song Num</TableCell>

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          {listGenre && (
            <TableBody>
            {listGenre.map((genre) => (
              <Listitemgenre genre={genre} key={genre.genreId} />
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

export default Genre;
