import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicSlice";
import genreReducer from "./genreSlice";
import singerReducer from "./singerSlice"
export default configureStore({
    reducer:{
        music:musicReducer,
        genre:genreReducer,
        singer:singerReducer,
    }
})