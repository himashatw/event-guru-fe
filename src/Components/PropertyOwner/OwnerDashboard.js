import React from "react";
// import { Card } from "bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
function OwnerDashboard(props) {
  return (
    <div>
      <div className="text-4xl text-center m-10 font-bold">Dashboard</div>
      <div className="grid grid-cols-2 gap-4 m-5">
        <div className="text-3xl">Hello, Property Owner!</div>
        <div></div>
      </div>

      <div className="flex flex-row p-20 justify-evenly mt-20">
        <Card
          className=" max-w-sm"
          onClick={() => props.history.push("/owner/newpackage")}
        >
          <CardActionArea>
            <CardMedia
              className="h-36"
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://i.ibb.co/K7QD15X/events-concept-illustration-114360-931.jpg
"
              title="Contemplative Reptile"
            />
            <CardContent className="text-center mt-3">
              <Typography gutterBottom variant="h5" component="h2">
                Add New Package
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Add new packages to the system
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          className=" max-w-sm"
          onClick={() => props.history.push("/owner/packages")}
        >
          <CardActionArea>
            <CardMedia
              className="h-36"
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://i.ibb.co/Lt6gZzg/Poster-for-social-media-web-page-banner-presentation-Flat-design-vector-illustration.jpg
"
              title="Contemplative Reptile"
            />
            <CardContent className="text-center mt-3">
              <Typography gutterBottom variant="h5" component="h2">
                View Packages
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                View all the packages currently available in the system
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card 
        className=" max-w-sm"
        onClick={() => props.history.push("/owner/customPackage")}>
          <CardActionArea>
            <CardMedia
              className="h-36"
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://i.ibb.co/nQsmsdg/businessman-planning-events-deadlines-agenda-74855-6274.jpg
"
              title="Contemplative Reptile"
            />
            <CardContent className="text-center mt-3">
              <Typography gutterBottom variant="h5" component="h2">
                View Package Requests
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Packages Management
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default OwnerDashboard;
