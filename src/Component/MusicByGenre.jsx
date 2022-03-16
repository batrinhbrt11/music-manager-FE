import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByGenre } from "../redux/musicSlice";
import Tablesong from "./TableSong";
const Musicbygenre = () => {
    const idGenre = useParams().id
    const URL_API = process.env.REACT_APP_API_URL;
    const [genre,setGenre] = useState("")
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const object = useSelector((state) => state.music.object);
    const isUpdate = useSelector((state) => state.music.isUpdate);
    const [listMusic, setListMusic] = useState(object.content);
    const [total, setTotal] = useState(object.totalElement);
    const handleChange = (event, value) => {
      setPage(value);
    };
    const getGenreById = (id) => {
      fetch(`${URL_API}/genres/${id}`)
        .then((res) => res.json())
        .then((result) => setGenre(result.content[0].genreName))
        .catch((error) => console.log(error));
    };
    useEffect (()=>{
      getGenreById(idGenre);
    },[idGenre])
    useEffect(() => {
      dispatch(getByGenre({id:idGenre, page}))
    }, [dispatch, page, isUpdate]);
    
    useEffect(() => {
      setListMusic(object.content);
      setTotal(object.totalElement);
    }, [object]);
    return (

        <div className="Main">
          {genre ? (<>
            <h2>{genre}</h2>
        <hr></hr>
        <br></br>
        <Tablesong list={listMusic} filter={"genre"} />
        <div className="pagination">
          <Stack spacing={2}>
            {(total >0)  && (
              <Pagination
                count={Math.ceil(total / 10)}
                color="secondary"
                page={page}
                onChange={handleChange}
              />
            )}
          </Stack>
        </div>
          </>) : <h2> Error. Genre is not found.</h2>}
       
      </div>
    );
}

export default Musicbygenre;
