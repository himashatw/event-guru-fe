import React, { useEffect, useState } from "react";
import axios from "../../Services/axios";
import { Paper,TableRow,TableHead,TableContainer,TableCell,TableBody,Table } from '@material-ui/core';
import _ from "lodash";


export default function CustomPackages(){

    const [packs,setPacks] = useState([]);
    const [mainPacks, setMainPacks]= useState([])
    const [search, setSearch] = React.useState('');
const [trigger, setTrigger]= useState(false)

    useEffect(()=>{
      // console.log(JSON.parse(localStorage.getItem("owner")), "FFFFFFFF");
      const objectData = JSON.parse(localStorage.getItem("owner"))
      console.log(objectData.propertyOwner._id, "FFF");
        axios
        .get(`/propertyOwner/package/custom/${objectData.propertyOwner._id}`)
        .then(res=>{
            setPacks(res.data.result)
            setMainPacks(res.data.result)
        })
        .catch(err =>{
            console.log(err);
        })
    }, [trigger])


    function searchfun(rows){
      return rows.filter(row=> row.Title.toLowerCase().indexOf(search) >-1)
    }

    const onSearch = (event) => {
      setSearch(event.target.value)
      var newArray = _.filter(mainPacks, function (pack) {
        return pack.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      // setCoffeeList(newArray);
      setPacks(newArray)
    };

    const approveHandler = async (mData) => {
      await axios.patch(`/propertyOwner/package/customer/${mData}`, {
        approvestatus:"true"
      }).then(response => {
        if(response.status === 200) {
          setTrigger(!trigger)
        }
      }).catch(error => {
        console.log(error);
      })
    }

    const declineHandler = async (mData) => {
      await axios.patch(`/propertyOwner/package/customer/${mData}`, {
        approvestatus:"false"
      }).then(response => {
        if(response.status === 200) {
          setTrigger(!trigger)
        }
      }).catch(error => {
        console.log(error);
      })
    }

  return (
    <div style={{margin:'10%'}}>
    <label htmlFor="search" style={{marginBottom:10}}>
        Search by title:
        <input type="text" value={search} onChange={onSearch} style={{border:"1px solid black", marginLeft:10}}/>
    </label>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell align="right">Message</TableCell>
            <TableCell align="right">Participant count</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Title</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.message}</TableCell>
              <TableCell align="right">{row.noOfParticipants}</TableCell>
              <TableCell align="right">{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right"><button onClick={() => approveHandler(row._id)}>Approve</button></TableCell>
              <TableCell align="right"><button onClick={() => declineHandler(row._id)}>Decline</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
