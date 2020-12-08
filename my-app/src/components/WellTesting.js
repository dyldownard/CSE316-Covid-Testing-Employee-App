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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { Link } from 'react-router-dom';

const columns = [
  { id: 'wellcode', label: 'Well Barcode', minWidth: 150 },
  { id: 'poolcode', label: 'Pool Barcode', minWidth: 150 },
  { id: 'result', label: 'Result', minWidth: 100 },
];

function createData(wellcode, poolcode, result) {
  return { wellcode, poolcode, result };
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



export default function WellTesting() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [status, setStatus] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onSubmitClick = async e => {
    //if a well does not exist, create one.
    //otherwise simple submit
  }

  const onEditClick = async e => {
    //for the specific well/pool match, UPDATE the test status
  }

  const onDeleteClick = async e => {
    //delete the welltest from the table, but do not delete the well. wells are physical things that shouldn't* be deleted by a program
    // * - idk maybe that's what he wants

  }


  useEffect(async () => { // like componentdidmount, runs at start
    async function retrieveData() {
      const resp = await fetch('http://localhost:9000/wellTestingAPI/ret')
      setData(resp);
      return resp.json();
    }
    const result = await retrieveData();
    clearRows();
    if (result.length !== rows.length) {
      var i;
      for (i = 0; i < result.length; i++) {
        let statusStr = result[i].result
        if (statusStr === "") {
          statusStr = "In Progress";
        }
        rows.push(createData(result[i].wellBarcode, result[i].poolBarcode, statusStr))
      }
    }
    setData(result);
  }, [refreshKey]);

  const cellClicked = async e => {

  }

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <h1> Well Testing </h1>
      <Link to="/labhome">
        <Button variant="contained" color="primary" href="#contained-buttons">Back</Button>
      </Link>
      <br/>
      <br/>
      <br/>
      <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField InputLabelProps={{shrink: true}}  required id="standard-required" label="Well Barcode" defaultValue="" />
        <br/>
        <br/>
        <TextField InputLabelProps={{shrink: true}}  required id="standard-required" label="Pool Barcode" defaultValue="" />
        <br/>
        <br/>
        <br/>

        <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-label">Test Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          style={{width: "150px"}}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value={""}>In Progress</MenuItem>
          <MenuItem value={"Neg"}>Negative</MenuItem>
          <MenuItem value={"Pos"}>Positive</MenuItem>
        </Select>
         </FormControl>

        <br/>
        <br/>
        <br/>
        <Button
          onClick={onSubmitClick}
        style={{margin: '5px'}}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >Submit</Button>
      <Button

      style={{margin: '5px'}}
     variant="contained"
     color="default"
     className={classes.button}
     startIcon={<EditIcon />}
   >Edit</Button>
      <Button

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