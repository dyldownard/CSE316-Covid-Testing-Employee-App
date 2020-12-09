import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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



export default function Home() {
  const classes = useStyles();

  return (
    <div>
        <h1 style={{fontFamily: "roboto"}}> Home </h1>
      <br/>
      <br/>
      <Link to="/labtech">
      <Button
        style={{margin: '5px'}}
        variant="contained"
        color="default"
        className={classes.button}
        >
          Lab Login
      </Button>
    </Link>
      <br/>
      <Link to="/employeelogin">
      <Button
        style={{margin: '5px'}}
        variant="contained"
        color="default"
        className={classes.button}
        >
          Employee Login
      </Button>
    </Link>
    </div>
  );
}