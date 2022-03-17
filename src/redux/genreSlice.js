import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL_API = process.env.REACT_APP_API_URL;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
export const getGenre = createAsyncThunk("genre/getGenre", async (page) => {
  return fetch(`${URL_API}/genres?page=${page}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});
export const updateGenre = createAsyncThunk(
  "genre/updateGenre",
  async ({ id, genre }) => {
    
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(genre),
    };

    return fetch(`${URL_API}/genres/${id}`, requestOptions)
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  }
);
export const deleteGenre = createAsyncThunk("genre/deleteGenre", async (id) => {
  return fetch(`${URL_API}/genres/${id}`, { method: "DELETE" })
    .then((res) => id)
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});

export const addGenre = createAsyncThunk("genre/addGenre", async (genre) => {
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(genre),
  };
 
  return fetch(`${URL_API}/genres`, requestOptions)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});
const genreSlice = createSlice({
  name: "genre",
  initialState: {
    object: {},
    loading: false,
    error: "",
    status: "",
    isUpdate: false,
  },
  extraReducers: {
    //get
    [getGenre.pending]: (state, action) => {
      state.loading = true;
    },
    [getGenre.fulfilled]: (state, action) => {
      state.object = action.payload;
      state.loading = false;
    },
    [getGenre.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //update
    [updateGenre.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [updateGenre.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.status = action.payload.status;
      state.error = action.payload.message;
      state.loading = false;
    },
    [updateGenre.rejected]: (state, action) => {
      state.loading = false;
    },

    //delete
    [deleteGenre.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [deleteGenre.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.object.content.filter((c) => c.musicId !== action.payload);
      state.loading = false;
    },
    [deleteGenre.rejected]: (state, action) => {
      state.loading = false;
    },
    //add
    [addGenre.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [addGenre.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.status = action.payload.status;
      state.error = action.payload.message;
      state.loading = false;
    },
    [addGenre.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default genreSlice.reducer;
