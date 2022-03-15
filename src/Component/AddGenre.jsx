import React from "react";

const Addgenre = () => {
  return (
    <div className="Main">
      <h2>Adding Genre</h2>
      <hr></hr>
      <form className="formContainer">
        <div className="row">
          <div className="col-25">
            <label>Genre name: </label>
          </div>
          <div className="col-75">
            <input type="text" placeholder="Genre name.." />
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Addgenre;
