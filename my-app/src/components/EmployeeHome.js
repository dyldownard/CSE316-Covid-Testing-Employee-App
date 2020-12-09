import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

const columns = [
  { id: 'coldate', label: 'Collection Date', minWidth: 170 },
  { id: 'result', label: 'Result', minWidth: 100 },
];

function createData(coldate, result) {
  return { coldate, result };
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



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const history = useHistory();

  const linkPressed = async (path, empID) => {
    history.push({
      pathname: path,
      state: {
        labID: empID,
      }
    })
  }

  const refreshClicked = async () => {
    setRefreshKey(oldKey => oldKey + 1)
  }

  useEffect(async () => { // like componentdidmount, runs at start
    if (history.location.state === undefined || history.location.state.empID === "" || history.location.state.empID === undefined) {
      history.push('/employeelogin')
      return;
    }

    async function retrieveTests() {
      const resp = await fetch('http://localhost:9000/employeeResultAPI/testret?id=' + history.location.state.empID)
      setData(resp);
      return resp.json();
    }
    const testResults = await retrieveTests();
    clearRows();

    //for each result we need to find its pool
    for (var i = 0; i < testResults.length; i++) {
      let curBarcode = testResults[i].testBarcode;
      async function retrievePools() {
        const resp = await fetch('http://localhost:9000/employeeResultAPI/poolret?testcode=' + curBarcode)
        setData(resp);
        return resp.json();
      }
      const poolResults = await retrievePools();
      for (var j = 0; j < poolResults.length; j++) {
        let curPoolcode = poolResults[j].poolBarcode;
        async function retrieveWells() {
          const resp = await fetch('http://localhost:9000/employeeResultAPI/wellret?poolcode=' + curPoolcode)
          setData(resp);
          return resp.json();
        }
        const wellResults = await retrieveWells();
        for (var k = 0; k < wellResults.length; k++) {
          let dateStr = testResults[i].collectionTime;
          dateStr = dateStr.replace("-", "/").replace("-", "/").slice(0, -14);
          let newDate = dateStr.substring(5, 8) + dateStr.substring(8, 11) + "/" + dateStr.substring(0, 4)
          let resultStr = wellResults[k].result;
          if (resultStr === "") {
            resultStr = "In Progress";
          } else if (resultStr === "Positive") {
            resultStr = "Positive (candidate)";
          }
          rows.push(createData(newDate, resultStr))
        }
      }

    }

    setData(testResults);
  }, [refreshKey]);

  return (
    <div>
      <h1 style={{fontFamily: "roboto"}}> Employee Home </h1>
      <Button onClick={(data: any) => { {linkPressed('/employeelogin', "");}}} variant="contained" color="primary" href="">Back</Button>
      <br/>
      <br/>
      <IconButton onClick={refreshClicked} aria-label="refresh"  color="default">
        <RefreshIcon />
      </IconButton>
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
                      <TableCell key={column.id} align={column.align}>
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