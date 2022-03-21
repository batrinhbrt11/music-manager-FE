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
export const getPlaylist = createAsyncThunk(
  "music/getPlaylist",
  async (page) => {
    return fetch(`${URL_API}/musics/playlist?page=${page}`)
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  }
);
export const getByGenre = createAsyncThunk(
  "music/getByGenre",
  async ({ id, page }) => {
    return fetch(`${URL_API}/musics/genre/${id}?page=${page}`)
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  }
);
export const getBySinger = createAsyncThunk(
  "music/getBySinger",
  async ({ id, page }) => {
    
    return fetch(`${URL_API}/musics/singer/${id}?page=${page}`)
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  }
);
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

  return fetch(`${URL_API}/musics`, requestOptions)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});
export const updateMusic = createAsyncThunk(
  "music/updateMusic",
  async ({ id, music }) => {
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(music),
    };

    return fetch(`${URL_API}/musics/${id}`, requestOptions)
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  }
);
export const addPlaylist = createAsyncThunk("music/addPlaylist", async (id) => {
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
  };
  return fetch(`${URL_API}/musics/playlist/${id}`, requestOptions)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
  
});

export const addMusicByLink = createAsyncThunk("music/addMusicByLink", async (link) => {
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  return fetch(`${URL_API}/musics/insert-from-link?url=${link}`, requestOptions)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error ${error}`);
    });
});
const musicSlice = createSlice({
  name: "music",
  initialState: {
    object: {
     

    },
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
    //get playlist
    [getPlaylist.pending]: (state, action) => {
      state.loading = true;
    },
    [getPlaylist.fulfilled]: (state, action) => {
      state.object = action.payload;

      state.loading = false;
    },
    [getPlaylist.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //get By Genre
    [getByGenre.pending]: (state, action) => {
      state.loading = true;
    },
    [getByGenre.fulfilled]: (state, action) => {
      state.object = action.payload;

      state.loading = false;
    },
    [getByGenre.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
     //get By Singer
     [getBySinger.pending]: (state, action) => {
      state.loading = true;
    },
    [getBySinger.fulfilled]: (state, action) => {
      state.object = action.payload;

      state.loading = false;
    },
    [getBySinger.rejected]: (state, action) => {
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
      state.status = action.payload.status;
      state.error = action.payload.message;
      state.loading = false;
    },
    [addMusic.rejected]: (state, action) => {
      state.loading = false;
    },
//addByLink
[addMusicByLink.pending]: (state, action) => {
  state.loading = true;
  state.isUpdate = true;
},
[addMusicByLink.fulfilled]: (state, action) => {
  state.isUpdate = false;
  state.status = action.payload.status;
  state.error = action.payload.message;
  state.loading = false;
},
[addMusicByLink.rejected]: (state, action) => {
  state.loading = false;
},
    //update
    [updateMusic.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [updateMusic.fulfilled]: (state, action) => {
      state.isUpdate = false;
      state.status = action.payload.status;
      state.error = action.payload.message;
      state.loading = false;
    },
    [updateMusic.rejected]: (state, action) => {
      state.loading = false;
    },
    //add playlist

    [addPlaylist.pending]: (state, action) => {
      state.loading = true;
      state.isUpdate = true;
    },
    [addPlaylist.fulfilled]: (state, action) => {
      state.isUpdate = false;
      //state.object= {...state.object,content:[...state.object.content.map((music)=> music.musicId === action.payload ? {...music, isPlayList:!isPlayList}:music)] }
      state.status = action.payload.status;
      state.error = action.payload.message;
      state.loading = false;
    },
    [addPlaylist.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default musicSlice.reducer;
