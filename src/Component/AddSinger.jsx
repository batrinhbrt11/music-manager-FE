import React,{useState} from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
const Addsinger = () => {
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="Main">
      <h2>Adding Music</h2>
      <hr></hr>

      <form className="formContainer">
        <div className="row">
          <div className="col-25">
            <label>Singer name: </label>
          </div>
          <div className="col-75">
            <input type="text" placeholder="Singer name.." />
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label>Gender: </label>
          </div>
          <div className="col-75">
            <select id="gender" name="gender">
              <option value="1">Male</option>
              <option value="0">Female</option>
             
            </select>

          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label>Birthday: </label>
          </div>
          <div className="col-75">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Description: </label>
          </div>
          <div className="col-75">
          <textarea id="subject" name="subject" placeholder="Write something.." ></textarea>
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Addsinger;
