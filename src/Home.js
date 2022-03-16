import React from 'react';

import Headerbar from './Component/HeaderBar';
import Mainlist from './Component/MainList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Genre from './Component/Genre';
import Singer from './Component/Singer';
import Detailsinger from './Component/DetailSinger';
import Addmusic from './Component/AddMusic';
import Addgenre from './Component/AddGenre';
import Addsinger from './Component/AddSinger';
import Playlist from './Component/PlayList';
import Musicbygenre from './Component/MusicByGenre';





const Home = () => {
    return (
        <>
   
        <BrowserRouter>
        <Headerbar />
            <Routes>
            <Route
              exact
              path="/"
              element={<Mainlist />}
            />
             <Route
              exact
              path="/add-music"
              element={<Addmusic />}
            />
              <Route
              exact
              path="/genre"
              element={<Genre />}
            />
               <Route
              exact
              path="/add-genre"
              element={<Addgenre />}
            />
             <Route
              exact
              path="/singer"
              element={<Singer/>}
            />
                  <Route
              exact
              path="/add-singer"
              element={<Addsinger />}
            />
            <Route
              exact
              path="/playlist"
              element={<Playlist />}
            />
             <Route
              exact
              path="/genre/:id"
              element={<Musicbygenre />}
            />
             <Route
              exact
              path="/singer/:id"
              element={<Detailsinger />}
            />
            </Routes>

        </BrowserRouter>
   
        </>
    )
}

export default Home;
