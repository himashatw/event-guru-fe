import React, { useEffect, useState } from 'react';
import axios from '../../Services/axios';
import {
  Grid, Button, Typography, Divider, Dialog, Table,
  useMediaQuery, DialogContent, DialogContentText, DialogActions,
  DialogTitle, Paper, TableBody, TableRow, TableCell, TableContainer, TableHead,
  TablePagination, Toolbar, TextField, InputAdornment, TableSortLabel
} from '@material-ui/core';
import { Search, Edit, Print } from '@material-ui/icons';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import EditUserDetails from './EditUserDetails';
import UserNavBar from './UserNavBar';
import './styles/styles.css';
import IconButton from "@material-ui/core/IconButton";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  heading: {
    textAlign: 'center',
    marginTop: 10
  },
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer'
    },
  },
  searchInput: {
    width: 300,
    borderRadius: 20,
    border: "2 px solid black",
    marginBlockEnd: 1
  }
}));

const headCells = [

  { id: 'title', lable: 'Title' },
  { id: 'description', lable: 'Description' },
  { id: 'scheduleTime', lable: 'Schedule Time' },
  { id: 'scheduleDate', lable: 'Schedule Date' },
  { id: 'ticketPrice', lable: 'Ticket Price' },
  { id: 'venue', lable: 'Venu' },
  { id: 'adType', lable: 'Event Type' },

]

export default function UserDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [opendel, setOpendel] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrdeBy] = useState();
  const [filterfn, setFilterFn] = useState({ fn: items => { return items } });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  //const [imageUrl, setimageUrl] = useState("");
  const [events, setEvents] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const TblPagination = () => (<TablePagination
    component="div"
    rowsPerPageOptions={pages}
    page={page}
    rowsPerPage={rowsPerPage}
    count={events.length}
    onChange={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
  />)

  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc')
    setOrdeBy(cellId)
  }

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    } if (b[orderBy] < a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordAfterPagingAndSorting = () => {
    return stableSort(filterfn.fn(events), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  const handleSearch = (e) => {
    const target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter(x => x.advert.title.toLowerCase().includes(target.value))
        }
      }
    })
  }

  const getUserDetails = () => {
    axios.get(`/user/${user.user._id}`)
      .then(res => {
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setEmail(res.data.data.email);
        setPhoneNo(res.data.data.phoneNo);
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  const deleteUserProfile = () => {
    axios.delete(`/user/${user.user._id}`)
      .then(res => {
        console.log(res.data.message);
        localStorage.removeItem("user");
        history.push('/login');
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  const getBookedEvent = () => {
    axios.get(`/user/booked/${user.user._id}`).then(response => {
      console.log(response.data.data);
      setEvents(response.data.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/user/dashboard')
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDel = () => {
    setOpendel(true);
  };

  const handleCloseDel = () => {
    setOpendel(false);
  };

  const downloadPdf = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Booked Event Details";
    const headers = [["Title", "Description", "Schedule Time", "Schedule Date", "Ticket Price", "Venu", "Event Type"]];

    const data = events.map(item => [
      item.advert.title,
      item.advert.description,
      item.advert.scheduleTime,
      item.advert.scheduleDate,
      item.advert.ticketPrice,
      item.advert.venue,
      item.advert.adType
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('events.pdf')
  }

  useEffect(() => {
    getUserDetails();
    getBookedEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <UserNavBar />
      <Grid item xs={12}>
        <Typography component="h1" variant="h5" className={classes.heading}>
          <b>Personal Details:</b>
        </Typography>
      </Grid>
      <div className="row">
        <div className="column left">
          <img src={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"}
            alt=""
            style={{ width: 300, height: 300, border: "1px solid black", borderRadius: '10%', display: 'block', margin: 'auto' }}
          />
        </div>
        <div className="column right">
          <div style={{ marginTop: 50 }}>
            <p className="dashp">First Name:{" " + firstName}</p>
            <p className="dashp">Last Name:{" " + lastName}</p>
            <p className="dashp">Email :{" " + email}</p>
            <p className="dashp">Phone:{" " + phoneNo}</p>
          </div>
          <br />
          <Button variant="outlined" color="primary" onClick={handleClickOpen} ><Edit />Edit</Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                <EditUserDetails />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Button variant="outlined" color="secondary"
            onClick={handleClickOpenDel}
            style={{ marginLeft: '10px' }}
          >
            <RemoveIcon />Delete
          </Button>
          <Dialog
            open={opendel}
            onClose={handleCloseDel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure want delete your account?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will premently delete your booking event details also
                your personal information and non another special data.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDel} color="primary">
                No
              </Button>
              <Button onClick={deleteUserProfile} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <br />
      <Divider />
      <Grid item xs={12}>
        <Typography component="h1" variant="h5" className={classes.heading}>
          <b>Booked Event Details:</b>
        </Typography>
      </Grid>
      <div style={{ marginTop: '10px', marginLeft: '100px', marginRight: '100px', marginBottom: '5px' }}>
        <Paper>
          <Toolbar>
            <TextField
              variant="outlined"
              placeholder="Search By Title"
              className={classes.searchInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={handleSearch}
            />
            <button onClick={downloadPdf} style={{ marginLeft: 10 }}>
              <Print />
            </button>
          </Toolbar>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {
                    headCells.map(headCell => (<TableCell key={headCell.id}>
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={() => { handleSortRequest(headCell.id) }}>
                        {headCell.lable}
                      </TableSortLabel>
                    </TableCell>))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {recordAfterPagingAndSorting().map(item =>
                (<TableRow key={item._id}>
                  <TableCell>{item.advert.title}</TableCell>
                  <TableCell>{item.advert.description}</TableCell>
                  <TableCell>{item.advert.scheduleTime}</TableCell>
                  <TableCell>{item.advert.scheduleDate}</TableCell>
                  <TableCell>{item.advert.ticketPrice}</TableCell>
                  <TableCell>{item.advert.venue}</TableCell>
                  <TableCell>{item.advert.adType}</TableCell>
                </TableRow>))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TblPagination />
        </Paper>
      </div>
    </div>
  );
}