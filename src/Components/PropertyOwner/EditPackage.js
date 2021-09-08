import React, { useEffect, useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { InputLabel, MenuItem, Input } from "@material-ui/core";
import { useFormik } from "formik";
import Progress from "react-progressbar";
import axios from "../../Services/axios";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditPackage(props) {
  const{id}=props.match.params
  console.log(id);
  const [progressValue, setProgressValue] = useState(0);
  const classes = useStyles();

  useEffect(async()=>{
      await axios
      .get(`/propertyOwner/packages/get/${id}`)
      .then(response=>{
        console.log(response.data);
        setPackageName(response.data.data.packageName);
        setPackageType(response.data.data.packageType);
        setPackagePrice(response.data.data.packagePrice)
        setPackageParticipent(response.data.data.participants)
        setPackageDescription(response.data.data.packageDetails)
        setPackageOfferPercentage(response.data.data.packageOffer)
        setImgUrl(response.data.data.packageImageUrl)
      })
  },[])

  const [packageName,setPackageName]= useState("")
  const [packageType,setPackageType] = useState("")
  const [packagePrice,setPackagePrice]=useState("")
  const [packageParticipent, setPackageParticipent] = useState("")
  const [packageDescription,setPackageDescription] = useState("")
  const [packageOfferPercentage, setPackageOfferPercentage] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  
  const imageUploadHandler = async (e) => {
    const files = e.target.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "af-editor");
    data.append("cloud_name", "af-editorcloud");
    axios
      .request({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/af-editorcloud/image/upload",
        data: data,
        onUploadProgress: (p) => {
          setProgressValue((p.loaded / p.total) * 100);
        },
      })
      .then((response) => {
        console.log(response.data.url);
        setImgUrl(response.data.url)
        setProgressValue(100);
      });
  };


  const updatePackage=()=>{
    axios.put(`/propertyOwner/packages/update/${id}`,{
      packageName:packageName,
      packageDetails: packageDescription,
      packageImageUrl: imgUrl,
      packageOffer: parseInt(packageOfferPercentage),
      participants: parseInt(packageParticipent),
      packageType: packageType,
      packagePrice: parseInt(packagePrice)
    }).then((response)=>{
      alert("Updated Successfully!");
      window.location ="/owner/packages";
      console.log(response);
   
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <Container
      component="main"
      maxWidth="xs"
      //   style={{ border: "1px solid black" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <span>
          <AddCircleIcon />
        </span>
        <Typography component="h1" variant="h5">
          Edit Package
        </Typography>
        <form
          className={classes.form}
          // noValidate
          //onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="packageName"
            label="Package Name"
            name="packageName"
            // autoComplete="email"
            // autoFocus
            value={packageName}
            onChange={e=>setPackageName(e.target.value)}
          />

          <TextField
            className="text-left"
            name="packageType"
            id="packageType"
            required
            select
            fullWidth
            variant="outlined"
            label="Event Type"
            value={packageType}
            onChange={e=>setPackageType(e.target.value)}
            // error={formic.touched.adType && Boolean(formic.errors.adType)}
            // helperText={formic.touched.adType && formic.errors.adType}
          >
            <MenuItem key={""} value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Wedding"}>Wedding</MenuItem>
            <MenuItem value={"Party"}>Party</MenuItem>
            <MenuItem value={"Show"}>Show</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </TextField>
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="packagePrice"
            label="Package Price"
            name="packagePrice"
            value={packagePrice}
            onChange={e=>setPackagePrice(e.target.value)}
            // autoComplete="email"
            // autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="packageParticipent"
            label="Participent Count"
            name="packageParticipent"
            value={packageParticipent}
            onChange={e=>setPackageParticipent(e.target.value)}
            // autoComplete="email"
            // autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="packageDescription"
            label="Package Description"
            name="packageDescription"
            value={packageDescription}
            onChange={e=>setPackageDescription(e.target.value)}
            // autoComplete="email"
            // autoFocus
          />

          {/* <FormControl
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormLabel className="mr-3">Providing an Offer?</FormLabel>
            <RadioGroup
              name="packageOffer"
              id="packageOffer"
              //   value={formValues.gender}
              //   onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="yes"
                value="yes"
                control={<Radio size="small" />}
                label="Yes"
              />
              <FormControlLabel
                key="no"
                value="no"
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
          </FormControl> */}
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="packageOfferPercentage"
            label="Offer Percentage"
            name="packageOfferPercentage"
            value={packageOfferPercentage}
            onChange={e=>setPackageOfferPercentage(e.target.value)}
            // autoComplete="email"
            // autoFocus
          />
          <span className="flex flex-row justify-evenly mt-3">
            <TextField
              // className="mr-2"
              style={{ marginRight: "3px" }}
              id="packageImageUrl"
              name="packageImageUrl"
              label="Paste Image URL"
              variant="outlined"
              fullWidth
              // value={imageUrl}
              //value={packageImageUrl}
             
              // error={
              //   formic.touched.adImageUrl && Boolean(formic.errors.adImageUrl)
              // }
              // helperText={formic.touched.adImageUrl && formic.errors.adImageUrl}
              // onBlur={formic.handleBlur}
            />
            <p className="mt-4">OR</p>
            <span className="mt-3 mb-1">
              <InputLabel
                htmlFor="import-button"
                className="ml-2"
                style={{
                  color: "black",
                  width: "auto",
                  height: "37px",
                  borderRadius: "5px",
                  border: "1px solid #000",
                  padding: "1%",
                  paddingLeft: "8%",
                }}
              >
                Choose Image
                <Input
                  id="import-button"
                  inputProps={{
                    accept: "image/*",
                  }}
                  //onChange={e=>setImgUrl(e.target.value)}
                  style={{ display: "none" }}
                  type="file"
                  onChange={imageUploadHandler}
                />
              </InputLabel>
            </span>
          </span>
          <Progress completed={progressValue} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={updatePackage}
          >
            Update
          </Button>
        </form>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Card className=" max-w-sm">
          <CardActionArea>
            <CardMedia
              className="h-36"
              component="img"
              alt="Contemplative Reptile"
              height="140"
              img src={imgUrl}
              title="Contemplative Reptile"
            />
            </CardActionArea>
          </Card>
          </div>
      </div>
    </Container>
  );
}
