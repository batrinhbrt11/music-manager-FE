import React from 'react';
import ReactDOM from 'react-dom';
import Headerbar from './Component/HeaderBar';
import Mainlist from './Component/MainList';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Genre from './Component/Genre';
import Singer from './Component/Singer';
import Detailsinger from './Component/DetailSinger';
import Addmusic from './Component/AddMusic';
import Addgenre from './Component/AddGenre';
import Addsinger from './Component/AddSinger';





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
              element={<Mainlist filter={"playlist"}/>}
            />
             <Route
              exact
              path="/genre/:id"
              element={<Mainlist filter={"genre"}/>}
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
