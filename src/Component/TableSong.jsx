import React,{useState,useEffect,useRef} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Listitemmusic from "./ListItemMusic";
import { over } from "stompjs";
import SockJS from "sockjs-client";
const Tablesong = ({ list, filter }) => {
  const [play,setPlay] = useState("")
  const [stompClient, setStompClient] = useState(null);
  const audioRef = useRef()
  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    const stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    setStompClient(stompClient);
  };
  const onError = (err) => {
    console.log("error", err);
  };
  const onConnected = () => {
    console.log("connected");
  };
  useEffect(() => {
    connect();
    
  },[]);

  const updateSong = (source) => {
    setPlay(source);
    if(audioRef.current){
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play();
    }
}
  return (
    <>
    {play && (<audio controls autoPlay  ref={audioRef} >
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

          {list  && (
            <TableBody>
              {list.map((row) => (
                <Listitemmusic music={row} filter={filter} stompClient = {stompClient} setMusic={url => updateSong(url)} key={row.musicId} />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default Tablesong;
