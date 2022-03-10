import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
const Itemsinger = ({singer}) => {
    return (
        <TableRow
      
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {singer.name}
        </TableCell>
        <TableCell align="right">{singer.calories}</TableCell>
        <TableCell align="right" className='actionIcon'> < DeleteIcon className='iconButton'/> | <CreateIcon className='iconButton'/>  </TableCell>
      </TableRow>
    );
}

export default Itemsinger;
