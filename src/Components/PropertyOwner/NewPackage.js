import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { InputLabel, MenuItem, Input, Card, CardContent } from "@material-ui/core";
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

export default function NewPackage() {
  const [progressValue, setProgressValue] = useState(0);
  const classes = useStyles();

  const formic = useFormik({
    initialValues: {
      packageName: "",
      packageType: "",
      packagePrice: "",
      packageParticipent: "",
      packageDescription: "",
      // packageOffer: "yes",
      packageOfferPercentage: "",
      packageVenue: "",
      packageImageUrl: "",
    },
    onSubmit: (values) => {
      onSubmitHandler(values);
      // toast.success("Insertion Successful!", {
      //   position: "bottom-right",
      //   autoClose: 2500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: 0,
      // });
      console.log(values);
    },
    // validationSchema: validationSchema,
  });

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
        formic.setFieldValue("packageImageUrl", response.data.url);
        setProgressValue(100);
      });
  };

  const onSubmitHandler = async (mValues) => {
    console.log("called");
    await axios
      .post("/propertyOwner/newpackage", {
        packageName: mValues.packageName,
        packageDetails: mValues.packageDescription,
        packageImageUrl: mValues.packageImageUrl,
        packageOffer: parseInt(mValues.packageOfferPercentage),
        packageVenue: mValues.packageVenue,
        participants: parseInt(mValues.packageParticipent),
        packageType: mValues.packageType,
        packagePrice: parseInt(mValues.packagePrice),
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("done");
          alert("succussfull");
        } else {
          alert("unsuccessful");
          console.log(response);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ border: "1px solid black" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <span>
          <AddCircleIcon />
        </span>
        <Typography component="h1" variant="h5">
          Add New Package
        </Typography>
        <form
          className={classes.form}
          // noValidate
          onSubmit={formic.handleSubmit}
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
            value={formic.values.packageName}
            onChange={formic.handleChange}
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
            value={formic.values.packageType}
            onChange={formic.handleChange}
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
            value={formic.values.packagePrice}
            onChange={formic.handleChange}
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
            value={formic.values.packageParticipent}
            onChange={formic.handleChange}
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
            value={formic.values.packageDescription}
            onChange={formic.handleChange}
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
            value={formic.values.packageOfferPercentage}
            onChange={formic.handleChange}
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
              values={formic.values.packageImageUrl}
              onChange={formic.handleChange}
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
                  // onChange={onInputChange}
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
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
