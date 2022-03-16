import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL_API = process.env.REACT_APP_API_URL;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
export const getSinger = createAsyncThunk("singer/getSinger", async (page) => {
  return fetch(`${URL_API}/singers?page=${page}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});
export const updateSinger = createAsyncThunk(
  "singer/updateSinger",
  async ({ id, singer }) => {
    
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(singer),
    };

    return fetch(`${URL_API}/singers/${id}`, requestOptions)
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  }
);
export const deleteSinger = createAsyncThunk(
  "singer/deleteSinger",
  async (id) => {
    return fetch(`${URL_API}/singers/${id}`, { method: "DELETE" })
      .then((res) => id)
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  }
);

export const addSinger = createAsyncThunk(
  "singer/addSinger",
  async (singer) => {
      console.log(singer)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(singer),
    };

    return fetch(`${URL_API}/singers`, requestOptions)
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  }
);
const singerSlice = createSlice({
  name: "singer",
  initialState: {
    object: {},
    loading: false,
    error: "",
    status: "",
    isUpdate: false,
  },
  extraReducers: {
    //get
    [getSinger.pending]: (state, action) => {
      state.loading = true;
    },
    [getSinger.fulfilled]: (state, action) => {
      state.object = action.payload;
      state.loading = false;
    },
    [getSinger.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //update
    [updateSinger.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [updateSinger.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.status = action.payload.status;
      state.error = action.payload.message;
      state.loading = false;
    },
    [updateSinger.rejected]: (state, action) => {
      state.loading = false;
    },

    //delete
    [deleteSinger.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [deleteSinger.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.object.content.filter((c) => c.musicId !== action.payload);
      state.loading = false;
    },
    [deleteSinger.rejected]: (state, action) => {
      state.loading = false;
    },
    //add
    [addSinger.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [addSinger.fulfilled]: (state, action) => {
      state.isUpdate = false;
      
      state.status = action.payload.status;
      state.error = action.payload.message;
     
      state.loading = false;
    },
    [addSinger.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default singerSlice.reducer;
