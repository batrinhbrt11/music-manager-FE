import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "../redux/musicSlice";
import Tablesong from "./TableSong";
import { over } from "stompjs";
import SockJS from "sockjs-client";
const Playlist = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const object = useSelector((state) => state.music.object);
  const [listMusic, setListMusic] = useState(object.content);
  const [total, setTotal] = useState(object.totalElement);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getPlaylist(page));
  }, [dispatch, page, listMusic]);

  useEffect(() => {
    setListMusic(object.content);
    setTotal(object.totalElement);
  }, [object]);

  var stompClient = null;
  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");

    stompClient = over(Sock);

    stompClient.connect({}, onConnected, onError);
  };
  const onError = (err) => {
    console.log("error", err);
  };
  const onConnected = () => {
    stompClient.subscribe("/music/getPlaylist", onMessageReceived);
  };
  useEffect(() => {
    connect();
  }, []);
  const onMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
  
    if(payloadData.isPlayList === false){
      setListMusic(listMusic.filter((music)=> music.musicId !== payloadData.musicId))
    }else{
      setListMusic([payloadData,...listMusic])
    }
    
  };

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
