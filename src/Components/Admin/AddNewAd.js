import React, { useState } from "react";
import { Field, useFormik } from "formik";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  NativeSelect,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import * as Yup from "yup";
import AdComponent from "./AdComponent";

const validationSchema = Yup.object({
  adTitle: Yup.string().required("Title is required"),
  adDescription: Yup.string().required("Description is required"),
  adEmail: Yup.string()
    .required("Email is required")
    .email("Enter valid email"),
  // adType: Yup.string().required("Type is required"),
  adDate: Yup.date().required("Schedule date required"),
  adPrice: Yup.string().required("Ticket price required"),
  adImageUrl: Yup.string().required("Image required"),
  adType: Yup.string().required("Type is required"),
});

function AddNewAd() {
  // const []

  const formic = useFormik({
    initialValues: {
      adTitle: "",
      adDescription: "",
      adDate: "",
      adEmail: "",
      adType: "",
      adPrice: "",
      adImageUrl: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
  });
  return (
    <div className="text-center">
      <p className="sm:text-4xl text-lg mt-5">Ads Management</p>
      <div className="grid grid-cols-2 divide-x divide-gray-400 items-center justify-center mt-20">
        {/* left container BEGIN */}
        <div>
          <form
            className="flex flex-col ml-auto mr-auto mt-auto items-stretch max-w-xl "
            onSubmit={formic.handleSubmit}
          >
            <TextField
              id="adTitle"
              name="adTitle"
              label="Ad Title"
              value={formic.values.adTitle}
              onChange={formic.handleChange}
              error={formic.touched.adTitle && Boolean(formic.errors.adTitle)}
              helperText={formic.touched.adTitle && formic.errors.adTitle}
              onBlur={formic.handleBlur}
            />
            <TextField
              id="adDescription"
              name="adDescription"
              label="Ad Description"
              value={formic.values.adDescription}
              onChange={formic.handleChange}
              error={
                formic.touched.adDescription &&
                Boolean(formic.errors.adDescription)
              }
              helperText={
                formic.touched.adDescription && formic.errors.adDescription
              }
              onBlur={formic.handleBlur}
            />
            {/* <FormControl>
              <InputLabel id="adType">Event Type</InputLabel>
              <Select
                className="text-left"
                id="adType"
                name="adType"
                // value=""
                values={formic.values.adType}
                onChange={formic.handleChange}
              >
                <MenuItem value={"Concert"}>Concert</MenuItem>
                <MenuItem value={"Workshop"}>Workshop</MenuItem>
                <MenuItem value={"Seminar"}>Seminar</MenuItem>
              </Select>
            </FormControl> */}
            {/* <FormControl error> */}
            {/* <InputLabel id="demo-simple-select-error-label">Name</InputLabel> */}
            <TextField
              // style={{ height: "200px" }}
              // className="mt-6"
              variant="outlined"
              name="adType"
              id="adType"
              select
              label="Event Type"
              value={formic.values.adType}
              onChange={formic.handleChange}
              error={formic.touched.adType && Boolean(formic.errors.adType)}
              helperText={formic.touched.adType && formic.errors.adType}
            >
              <MenuItem key={""} value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
            {/* <FormHelperText>Error</FormHelperText> */}
            {/* </FormControl> */}
            <TextField
              id="adEmail"
              name="adEmail"
              label="Email"
              values={formic.values.adEmail}
              onChange={formic.handleChange}
              error={formic.touched.adEmail && Boolean(formic.errors.adEmail)}
              helperText={formic.touched.adEmail && formic.errors.adEmail}
              onBlur={formic.handleBlur}
            />
            <TextField
              margin="dense"
              id="adDate"
              label="Due date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              values={formic.values.adDate}
              onChange={formic.handleChange}
              error={formic.touched.adDate && Boolean(formic.errors.adDate)}
              helperText={formic.touched.adDate && formic.errors.adDate}
              onBlur={formic.handleBlur}
            />
            <TextField
              id="adPrice"
              name="adPrice"
              label="Ticket Price"
              values={formic.values.adPrice}
              onChange={formic.handleChange}
              error={formic.touched.adPrice && Boolean(formic.errors.adPrice)}
              helperText={formic.touched.adPrice && formic.errors.adPrice}
              onBlur={formic.handleBlur}
            />
            <span className="flex flex-row justify-between">
              <TextField
                className="flex-grow"
                id="adImageUrl"
                name="adImageUrl"
                label="Image URL"
                values={formic.values.adImageUrl}
                onChange={formic.handleChange}
                error={
                  formic.touched.adImageUrl && Boolean(formic.errors.adImageUrl)
                }
                helperText={
                  formic.touched.adImageUrl && formic.errors.adImageUrl
                }
                onBlur={formic.handleBlur}
              />
              <span className="mt-3">
                <Button variant="contained" color="primary" className="p-10 ">
                  Upload Image
                </Button>
              </span>
            </span>

            <span className="mt-5">
              <Button className="m-20" type="submit" variant="outlined">
                Submit
              </Button>
            </span>
          </form>
        </div>
        {/* left container END */}

        {/* right container END */}
        <div className="overflow-y-auto h-80">
          <AdComponent />
          <AdComponent />
          <AdComponent />
          <AdComponent />
          <AdComponent />
        </div>
        {/* right container END */}
      </div>
    </div>
  );
}

export default AddNewAd;
