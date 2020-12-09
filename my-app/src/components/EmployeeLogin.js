import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: 'auto',
  },
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: 200,
  },
  container: {
    maxHeight: 440,
  },
}));



export default function EmployeeLogin() {
  const classes = useStyles();

  const [isUserInvalid, setUserInvalid] = useState(false);
  const [isUserInvalidText, setUserInvalidText] = useState("");

  const userInputRef = useRef(); //reference
  const passInputRef = useRef(); //reference

  const history = useHistory();

  const goClicked = async () => {
    submitCredentials();
  }

  const submitCredentials = async () => {
    async function retrieveData() {
      const resp = await fetch('http://localhost:9000/loginEmployeeAPI/?email=' + userInputRef.current.value + '&pass=' + passInputRef.current.value);
      return resp.json();
    }
    const result = await retrieveData();
    if (result.length === 1) {
      console.log("logged!")
      setUserInvalid(false);
      setUserInvalidText("")
      history.push({
        pathname: '/emphome',
        state: {
          empID: result[0].employeeID,
        }
      })
    } else {
      setUserInvalid(true);
      setUserInvalidText("Credentials did not match")
    }
  }

  useEffect(() => { // like componentdidmount, runs at start
    console.log("EmpID Cleared!")
  });

  return (
    <div>
        <h1 style={{fontFamily: "roboto"}}> Employee Login </h1>
        <Link to="/home">
          <Button variant="contained" color="primary" href="">Back</Button>
        </Link>
      <br/>
      <br/>
      <br/>
      <br/>
      <TextField  onKeyPress={(data: any) => { if (data.charCode === 13) {submitCredentials();}}}
        InputLabelProps={{shrink: true}} required error={isUserInvalid} helperText={isUserInvalidText} inputRef={userInputRef} id="standard-required" label="Email" defaultValue="" />
      <br/>
      <br/>
      <TextField onKeyPress={(data: any) => { if (data.charCode === 13) {submitCredentials();}}}
        type="password"  InputLabelProps={{shrink: true}} required  inputRef={passInputRef} id="standard-required" label="Password" defaultValue="" />
      <br/>
      <br/>
      <Button onClick={goClicked} variant="contained" color="primary" href="">Go!</Button>
    </div>
  );
}