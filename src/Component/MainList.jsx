import React,{useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Listitemmusic from "./ListItemMusic";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const Mainlist = ({filter}) => {

  
  return (
    <div className="Main">
  
      <div className="actionContainer">
        <div className="searchContainer">
          <input type="text" id="fname" name="fname" />
          <SearchIcon onClick={e => console.log("sdasdasd")} className='iconButton'/>
        </div>
        <div>
          <AddCircleIcon className='iconButton'/>
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
          <TableBody>
            {rows.map((row) => (
              
              <Listitemmusic music={row} filter={filter} key={row.name} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
      <Stack spacing={2}>
      <Pagination count={12} color="secondary" />
    </Stack>
      </div>

    </div>
  );
};

export default Mainlist;
