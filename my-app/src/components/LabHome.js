import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
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



export default function LabHome() {
  const classes = useStyles();

  const history = useHistory();

  const linkPressed = async (path, labID) => {
    history.push({
      pathname: path,
      state: {
        labID: labID,
      }
    })
  }

  useEffect(() => { // like componentdidmount, runs at start
    console.log(history.location.state.labID)
    if (history.location.state === undefined || history.location.state.labID === "" || history.location.state.labID === undefined) {
      history.push('/labtech')
    }
  }, []);

  return (
    <div>
        <h1 style={{fontFamily: "roboto"}}> Lab Home </h1>
        <Button onClick={(data: any) => { {linkPressed('/labtech', '');}}} variant="contained" color="primary" href="">Back</Button>
      <br/>
      <br/>

      <Button
        onClick={(data: any) => { {linkPressed('/testcol', history.location.state.labID);}}}
        style={{margin: '5px'}}
        variant="contained"
        color="default"
        className={classes.button}
        >
          Test Collection
      </Button>
      <br/>
      <Button
        onClick={(data: any) => { {linkPressed('/poolmap', history.location.state.labID);}}}
        style={{margin: '5px'}}
        variant="contained"
        color="default"
        className={classes.button}
        >
          Pool Mapping
      </Button>
      <br/>
      <Button
        onClick={(data: any) => { {linkPressed('/welltest', history.location.state.labID);}}}
        style={{margin: '5px'}}
        variant="contained"
        color="default"
        className={classes.button}
        >
          Well Testing
      </Button>
    </div>
  );
}