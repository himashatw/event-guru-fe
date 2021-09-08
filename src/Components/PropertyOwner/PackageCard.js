import React from "react";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import axios from "../../Services/axios";

const PackageCard = ({ cardContent }) => {
  //   const btnHandler = () => {
  //     alert(id);
  //   };

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(0.5),
    },
  }));

  const deletePackage = () => {
    axios.delete(`/propertyOwner/packages/delete/${cardContent._id}`)
        .then((response) => {
            console.log(response);
            alert("Package Deleted Successfully!");
            window.location="/owner/packages";
        })
        .catch((error) => {
            console.log(error);
        });

}
  const classes = useStyles();
  return (
    <div className="col">
      <div className="card h-100" style={{ borderRadius: "20px" }}>
      <div className="card-body text-center">
          <h5 className="text-xl font-bold">{cardContent.packageName}</h5>   
        </div>
        <img
          src={cardContent.packageImageUrl}
          className="card-img-top"
          alt="..."
          style={{
            objectFit: "cover",
            maxHeight: "200px",
            borderRadius: "20px",
            border: "1px solid black",
          }}
        />
        <div className="card-body text-center">
          <p className="card-text" style={{ color: "black" }}>
            {cardContent.packageType}
          </p>
          <Link to={`/owner/editpackage/${cardContent._id}`}>          
          <Button
           variant="contained"
           color="primary"
           startIcon={<EditIcon />}
           >
           Edit
          </Button>
          </Link>
          <Button
           variant="contained"
           color="secondary"
           className={classes.button}
           startIcon={<DeleteIcon />}
           onClick={deletePackage}
           >
           Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
