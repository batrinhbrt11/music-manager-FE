import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Listitemmusic = ({ music, filter }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {music.name}
      </TableCell>
      <TableCell align="right">{music.calories}</TableCell>
      <TableCell align="right">{music.fat}</TableCell>
      <TableCell align="right">{music.carbs}</TableCell>

      {filter !== "playlist" ? (
        <TableCell align="right" className="actionIcon">
          <DeleteIcon className="iconButton" /> |
          <CreateIcon className="iconButton" /> |
          <FavoriteIcon className="iconButton" />
        </TableCell>
      ) : (
        <TableCell align="right" className="actionIcon">
          <FavoriteIcon className="iconButton like_active" />
        </TableCell>
      )}
    </TableRow>
  );
};

export default Listitemmusic;
