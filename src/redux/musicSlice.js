import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL_API = process.env.REACT_APP_API_URL;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
export const getMusic = createAsyncThunk("music/getMusic", async (page) => {
  return fetch(`${URL_API}/musics?page=${page}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});

export const deleteMusic = createAsyncThunk("music/deleteMusic", async (id) => {
  return fetch(`${URL_API}/musics/${id}`, { method: "DELETE" })
    .then((res) => id)
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});

export const addMusic = createAsyncThunk("music/addMusic", async (music) => {
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(music),
  };
  console.log(music)
  return fetch(`${URL_API}/musics`, requestOptions)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});
export const updateMusic = createAsyncThunk("music/updateMusic", async ({id,music}) => {

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(music),
  };
  console.log(music)

  return fetch(`${URL_API}/musics/${id}`, requestOptions)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});
const musicSlice = createSlice({
  name: "music",
  initialState: {
    object: {},
    loading: false,
    error: "",
    status: "",
    isUpdate: false,
  },
  extraReducers: {
    //get
    [getMusic.pending]: (state, action) => {
      state.loading = true;
    },
    [getMusic.fulfilled]: (state, action) => {
      state.object = action.payload;

      state.loading = false;
    },
    [getMusic.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    //delete
    [deleteMusic.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [deleteMusic.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.object.content.filter((c) => c.musicId !== action.payload);
      state.loading = false;
    },
    [deleteMusic.rejected]: (state, action) => {
      state.loading = false;
    },

    //add
    [addMusic.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [addMusic.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.status=action.payload.status
      state.error= action.payload.message
      state.loading = false;
    },
    [addMusic.rejected]: (state, action) => {
      state.loading = false;
    },

    //update
    [updateMusic.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [updateMusic.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.status=action.payload.status
      console.log(action.payload.status)
      state.error= action.payload.message
      console.log(action.payload.message)
      state.loading = false;
    },
    [updateMusic.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default musicSlice.reducer;
