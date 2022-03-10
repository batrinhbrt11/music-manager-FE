import { AddCircle, AddCircleOutline } from "@mui/icons-material";
import React from "react";

const Addmusic = () => {
  return (
    <div className="Main">
      <h2>Adding Music</h2>
      <hr></hr>

      <form className="formContainer">
      <div className="row">
    <div className="col-25">
      <label >Song name: </label>
    </div>
    <div className="col-75">
      <input type="text" placeholder="Song name.." />
    </div>
  </div>
  
  <div className="row">
    <div className="col-25">
      <label >Genre: </label>
    </div>
    <div className="col-75">
      <select id="country" name="country">
        <option value="australia">Australia</option>
        <option value="canada">Canada</option>
        <option value="usa">USA</option>
      </select>
      <AddCircle className="iconButton" />
    </div>
  </div>
  <div className="row">
    <div className="col-25">
      <label >Singer: </label>
    </div>
    <div className="col-75">
      <select id="country" name="country">
        <option value="australia">Australia</option>
        <option value="canada">Canada</option>
        <option value="usa">USA</option>
      </select>
      <AddCircle className="iconButton" />
    </div>
  </div>
  <div className="row">
    <div className="col-25">
      <label >Release Time: </label>
    </div>
    <div className="col-75">
    <input type="date"  onChange={e => console.log(e.target.value)}/>
    </div>
  </div>
  <div className="row">
    <input type="submit" value="Submit" />
  </div>
      </form>
    </div>
  );
};

export default Addmusic;
