import React, { useEffect, useState } from "react";
import axios from "../../Services/axios";
import { Paper,TableRow,TableHead,TableContainer,TableCell,TableBody,Table } from '@material-ui/core';



export default function CustomPackages(){

    const [packs,setPacks] = useState([]);
    const [search, setSearch] = React.useState('');


    useEffect(()=>{
      // console.log(JSON.parse(localStorage.getItem("owner")), "FFFFFFFF");
      const objectData = JSON.parse(localStorage.getItem("owner"))
      // console.log(objectData.propertyOwner._id, "FFF");
        axios
        .get(`/propertyOwner/package/custom/${objectData.propertyOwner._id}`)
        .then(res=>{
            console.log(res);
            setPacks(res.data.result)
        })
        .catch(err =>{
            console.log(err);
        })
    }, [])


    function searchfun(rows){
      return rows.filter(row=> row.Title.toLowerCase().indexOf(search) >-1)
    }

  return (
    <div>
    <label htmlFor="search">
        Search:
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
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
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
