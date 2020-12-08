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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Link } from 'react-router-dom';

const columns = [
  { id: 'poolcode', label: 'Pool Code', minWidth: 170 },
  { id: 'testids', label: 'Test Barcode(s)', minWidth: 100 },
];

function createData(poolcode, testids) {
  return { poolcode, testids };
}

const rows = [];

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
    width: 400,
  },
  container: {
    maxHeight: 440,
  },
}));



export default function PoolMapping() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const poolCodeRef = useRef(); //reference
  const testIdsRef = useRef(); //reference

  const [isPoolCodeInvalid, setPoolCodeInvalid] = useState(false);
  const [isPoolCodeInvalidText, setPoolCodeInvalidText] = useState("");
  const [isTestIdsInvalid, setTestIdsInvalid] = useState(false);
  const [isTestIdsInvalidText, setTestIdsInvalidText] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const submitClicked = async e => {
    e.preventDefault();
    const createResult = await createAPI();
    const result = await submitAPI(testIdsRef.current.value.replace(/\s+/g, ''));
    if (result.status === 450) {
      setPoolCodeInvalid(false);
      setPoolCodeInvalidText("")
      setTestIdsInvalid(true);
      setTestIdsInvalidText("One of these IDS already exist: try EDIT")
    } else {
      setPoolCodeInvalid(false);
      setPoolCodeInvalidText("")
      setTestIdsInvalid(false);
      setTestIdsInvalidText("")
      poolCodeRef.current.value = ""
      testIdsRef.current.value = ""
      setRefreshKey(oldKey => oldKey + 1)
    }

  };

  const deleteClicked = async e => {
    e.preventDefault();
    let result = await deleteAPI(testIdsRef.current.value.replace(/\s+/g, ''));
    console.log(result.status);
    result = await poolRetAPI();
    if (result.length === 0) {
      result = await poolDelAPI();
    }
    setRefreshKey(oldKey => oldKey + 1);
  };

  const submitAPI = async (submitTestIds) => { //callAPI is our function, async is telling it that this is an async task
    const resp = await fetch('http://localhost:9000/poolMappingAPI/submit?poolcode=' + poolCodeRef.current.value + '&testids=' + submitTestIds);
    return resp;
  }

  const createAPI = async () => { //callAPI is our function, async is telling it that this is an async task
    const resp = await fetch('http://localhost:9000/poolMappingAPI/create?poolcode=' + poolCodeRef.current.value);
    return resp;
  }

  const deleteAPI = async (deleteTestIds) => { //callAPI is our function, async is telling it that this is an async task
    const resp = await fetch('http://localhost:9000/poolMappingAPI/del?poolcode=' + poolCodeRef.current.value + '&testids=' + deleteTestIds);
    return resp;
  }

  const poolRetAPI = async () => { //gets elements that contain that pool from poolmap
    const resp = await fetch('http://localhost:9000/poolMappingAPI/poolret?poolcode=' + poolCodeRef.current.value);
    return resp.json();
  }

  const poolDelAPI = async () => { //gets elements that contain that pool from poolmap
    const resp = await fetch('http://localhost:9000/poolMappingAPI/poolDel?poolcode=' + poolCodeRef.current.value);
    return resp;
  }

  useEffect(async () => { // like componentdidmount, runs at start
    async function retrieveData() {
      const resp = await fetch('http://localhost:9000/poolMappingAPI/ret')
      setData(resp);
      return resp.json();
    }
    const result = await retrieveData();
    clearRows();

    if (result.length !== rows.length) {

      var i;
      for (i = 0; i < result.length; i++) { //creates all data
        rows.push(createData(result[i].poolBarcode, result[i].testBarcode))
      }
      let poolCodesDone = [];
      let indexToRemove = [];
      rows.forEach(function(item1, index1, ar) { //adds each pool together
        if (poolCodesDone.includes(item1.poolcode)) {
          indexToRemove.push(index1);
        } else {
          poolCodesDone.push(item1.poolcode);
          rows.forEach(function(item2, index2, ar) {
            if (item1.poolcode === item2.poolcode && item1.testids !== item2.testids) {
              item1.testids = (item1.testids + ", " + item2.testids);
            }
          })
        }
      })
      for (i = rows.length; i >= 0; i--) {
        if (indexToRemove.includes(i)) {
          rows.splice(i, 1);
        }
      }

    }

    setData(result);
  }, [refreshKey]);

  const cellClicked = async e => {
    let poolcodeStr = "";
    let testIDStr = "";
    if (e.target.nextSibling === null) {
      //clicked test barcode, use previous sibling to get your info
      poolcodeStr = e.target.previousSibling.innerHTML;
      testIDStr = e.target.innerHTML;
    } else {
      testIDStr = e.target.nextSibling.innerHTML;
      poolcodeStr = e.target.innerHTML;
    }
    poolCodeRef.current.value = poolcodeStr;
    testIdsRef.current.value = testIDStr;
  }

  return (
    <div>
      <h1> Pool Mapping </h1>
      <Link to="/labhome">
        <Button variant="contained" color="primary" href="#contained-buttons">Back</Button>
      </Link>
      <br/>
      <br/>
      <br/>
      <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField InputLabelProps={{shrink: true}} error={isPoolCodeInvalid} helperText={isPoolCodeInvalidText} inputRef={poolCodeRef} required id="standard-required" label="Pool Code" defaultValue="" />
        <br/>
        <br/>
        <TextField InputLabelProps={{shrink: true}} error={isTestIdsInvalid} helperText={isTestIdsInvalidText} inputRef={testIdsRef} style={{width: '300px'}} required id="standard-required" label="Test ID(s)" defaultValue="" />
        <br/>
        <br/>
        <br/>
        <Button
          onClick={submitClicked}
        style={{margin: '5px'}}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >Submit</Button>
      <Button
        onClick={deleteClicked}
      style={{margin: '5px'}}
     variant="contained"
     color="secondary"
     className={classes.button}
     startIcon={<DeleteIcon />}
   >Delete</Button>
      </div>
      <br/>
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
                <TableRow onClick={cellClicked} hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell title={column.id} key={column.id} align={column.align}>
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