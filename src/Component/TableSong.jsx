import React,{useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Listitemmusic from "./ListItemMusic";
const Tablesong = ({ list, filter }) => {
  const [play,setPlay] = useState("")
  
  return (
    <>
    {play && (<audio controls autoPlay>
        <source
          src={play}
          type="audio/mpeg"
        />
      </audio>)}
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Song Name</TableCell>
              <TableCell align="right">RealeaseTime</TableCell>
              {filter !== "genre" && <TableCell align="right">Genre</TableCell>}
              {filter !== "singer" && (
                <TableCell align="right">Singer</TableCell>
              )}

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          {list && (
            <TableBody>
              {list.map((row) => (
                <Listitemmusic music={row} filter={filter} setMusic={url => setPlay(url)} key={row.musicId} />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default Tablesong;
