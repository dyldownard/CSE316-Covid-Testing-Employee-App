import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'testid', label: 'Test ID', minWidth: 170 },
  { id: 'employeeid', label: 'Employee ID', minWidth: 100 },
];

function createData(testid, employeeid) {
  return { testid, employeeid };
}
const rows = [];

function getDate() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

function clearRows() {
  rows.length = 0;
  return;
}

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



export default function TestCollection() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [isDelInvalid, setDelInvalid] = useState(false);
  const [isDelInvalidText, setDelInvalidText] = useState("");

  const [isIDInvalid, setIDInvalid] = useState(false);
  const [isIDInvalidText, setIDInvalidText] = useState("");

  const [isCodeInvalid, setCodeInvalid] = useState(false);
  const [isCodeInvalidText, setCodeInvalidText] = useState("");

  const addEmpId = useRef(); //reference
  const addTestId = useRef(); //reference
  const removeTestId = useRef(); //reference

  const addClicked = async e => { //add button clicked
    e.preventDefault();
    const result = await addAPI();
    if (result.status === 450) {
      setIDInvalid(false);
      setIDInvalidText("")
      setCodeInvalid(true);
      setCodeInvalidText("This test already exists.")
    } else if (result.status === 451) {
      setCodeInvalid(false);
      setCodeInvalidText("")
      setIDInvalid(true);
      setIDInvalidText("This employee does not exist.")
    } else {
      setIDInvalid(false);
      setIDInvalidText("")
      setCodeInvalid(false);
      setCodeInvalidText("")
      addEmpId.current.value = ""
      addTestId.current.value = ""
      setRefreshKey(oldKey => oldKey + 1)
    }
  };

  const delClicked = async e => { //add button clicked
    e.preventDefault();
    setDelInvalid(false);
    setDelInvalidText("")

    const result = await delAPI();
    setRefreshKey(oldKey => oldKey + 1)
    if (result.status !== null && result.status === 452) {
      setDelInvalid(true);
      setDelInvalidText("Barcode exists in a pool.")
    } else {
      if (result.affectedRows === 0) {
        setDelInvalid(true);
        setDelInvalidText("Barcode does not exist")
      } else {
        removeTestId.current.value = ""
        setDelInvalid(false);
        setDelInvalidText("")
      }
    }
  };

  const addAPI = async () => { //callAPI is our function, async is telling it that this is an async task
    const resp = await fetch('http://localhost:9000/testCollectionAPI/add?empid=' + addEmpId.current.value + '&testid=' + addTestId.current.value + '&date=' + getDate());
    return resp;
  }

  const delAPI = async () => { //callAPI is our function, async is telling it that this is an async task
    const resp = await fetch('http://localhost:9000/testCollectionAPI/del?testid=' + removeTestId.current.value)

    if (resp.status === 452) {
      console.log(resp);
      return resp;
    } else {
      return resp.json();
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(async () => { // like componentdidmount, runs at start
    async function retrieveData() {
      const resp = await fetch('http://localhost:9000/testCollectionAPI/ret')
      setData(resp);
      return resp.json();
    }
    const result = await retrieveData();
    clearRows();
    if (result.length !== rows.length) {
      var i;
      for (i = 0; i < result.length; i++) {
        rows.push(createData(result[i].testBarcode, result[i].employeeID))
      }
    }
    setData(result);
    console.log(data);
  }, [refreshKey]);

  const cellClicked = async e => {
    removeTestId.current.value = e.target.innerHTML;
  }


  return (
    <div>
      <h1> Test Collection </h1>
      <Link to="/labhome">
        <Button variant="contained" color="primary" href="#contained-buttons">Back</Button>
      </Link>
      <br/>
      <br/>
      <br/>
      <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField InputLabelProps={{shrink: true}} required error={isIDInvalid} helperText={isIDInvalidText} inputRef={addEmpId} id="standard-required" label="Employee ID" defaultValue="" />
        <TextField InputLabelProps={{shrink: true}} required error={isCodeInvalid} helperText={isCodeInvalidText} inputRef={addTestId} id="standard-required" label="Test ID" defaultValue="" />
        <Button
        variant="contained"
        color="default"
        onClick={addClicked}
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >Add</Button>
      </div>
      <br/>
      <br/>
      <div>
        <TextField InputLabelProps={{shrink: true}} required error={isDelInvalid} helperText={isDelInvalidText} inputRef={removeTestId} id="standard-required" label="Test ID" defaultValue="" />
        <Button
       variant="contained"
       color="secondary"
       onClick={delClicked}
       className={classes.button}
       startIcon={<DeleteIcon />}
     >Delete</Button>
      </div>
    </form>
    <br/>
    <br/>
    <br/>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell onClick={cellClicked} key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}