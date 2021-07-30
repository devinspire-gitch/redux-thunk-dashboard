import { React, useState, useEffect} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '45vw',
        padding: '20px',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },

    container: {
        maxHeight: '60vh',
        overflow: 'auto',
    },
  
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    titleBar: {
        height: '5vh',
        background: '#091224',
        color: 'white',
        padding: '10px',
    },

    tableFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
    },

    searchBar: {
        display: 'flex',
        padding: '10px',
        justifyContent: 'space-between',
    },

    pageCounter: {
            '& .MuiButton-label': {
              color: theme.palette.common.black,
            },
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid #9c9991',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
            width: '20ch',
            },
        },
    },
}));

export default function DataTable(props) {
  const classes = useStyles();
  const options = [10, 20, 50];
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState('');

  //user and todo data
  const data = props.data
  const headCells = props.headerData;

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setRowsPerPage(+options[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const requestSearch = event => {
    setSearched(event.target.value);    
  }

  useEffect(() => {
    const filterRows = data.filter((row) => {
      return row.username.toLowerCase().includes(searched.toLowerCase());
    });
    setRows(filterRows);
  }, [searched])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={ classes.root}>
        <div className={classes.titleBar}>
            <p>{props.title}</p>
        </div>
        <div className={ classes.searchBar}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searched}                 
                    onChange={requestSearch}
                />
            </div>
            <div className={classes.pageCounter}>
                <Button aria-controls="simple-menu" aria-haspopup="true" color="primary" onClick={handleClick}>
                    {options[selectedIndex]}
                    <ArrowDropDownIcon color="primary"/>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >{option}</MenuItem> ))}
                </Menu>
            </div>
        </div>
      <Paper className={classes.paper}>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader aria-label="sticky table"
          >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.booleanType ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice((page - 1)  * rowsPerPage, (page - 1 ) * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      {headCells.map((column) => {
                        const value = row[column.id];
                        return (   
                             <TableCell 
                              key={column.id}            
                              align={column.booleanType ? 'right' : 'left'}
                              padding={column.disablePadding ? 'none' : 'normal'}>
                                { !column.booleanType ? value : row.completed ? 'Complete' : 'Incomplete' }
                              </TableCell>                  
                        )
                      })}
                    </TableRow>
                  );
                })}
              {rows.length === 0 && (
                <TableRow >
                  <TableCell colSpan={6} align='center'>No data available in table</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.tableFooter}>
            <p>Showing {(page) * rowsPerPage - rowsPerPage + 1} to {(page) * rowsPerPage > rows.length ? rows.length : (page) * rowsPerPage} of {rows.length}entries</p>
            <Pagination 
                count={Math.ceil(rows.length / rowsPerPage) } 
                page={page} 
                variant="outlined" 
                shape="rounded" 
                onChange={handleChange} />
        </div>
      </Paper>
    </div>
  );
}