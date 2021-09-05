import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  MenuItem,
  Input,
  InputLabel,
} from "@material-ui/core";
import * as Yup from "yup";
import AdComponent from "./AdComponent";
import Modal from "react-modal";
import axios from "../../Services/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DetailsModel.css";
import Progress from "react-progressbar";
import CancelIcon from "@material-ui/icons/Cancel";
import Moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AdminHeader from "./AdminHeader";

Modal.setAppElement("#root");

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
  adTime: Yup.string().required("Time is required"),
  adVenue: Yup.string().required("Venue is required"),
});

function AddNewAd() {
  const [progressValue, setProgressValue] = useState(0);
  const [updateProgressValue, setUpdateProgressValue] = useState(0);
  const [adList, setAdList] = useState([]);
  const [check, setCheck] = useState(false);

  // useStates for update fields BEGIN HERE
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateEventType, setUpdateEventType] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateScheduleDate, setUpdateScheduleDate] = useState("");
  const [updateScheduleTime, setUpdateScheduleTime] = useState("");
  const [updateVenue, setUpdateVenue] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateImageUrl, setUpdateImageUrl] = useState("");
  const [updateId, setUpdateId] = useState("");
  // useStates for update fields END HERE

  // console.log("g" + updateEventType + updateScheduleDate);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/admin/ads")
        .then((response) => {
          console.log(response.data.result);
          setAdList(response.data.result.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [check]);

  const formic = useFormik({
    initialValues: {
      adTitle: "",
      adDescription: "",
      adDate: "",
      adEmail: "",
      adType: "",
      adPrice: "",
      adImageUrl: "",
      adTime: "",
      adVenue: "",
    },
    onSubmit: (values) => {
      onSubmitHandler(values);

      console.log(values);
    },
    validationSchema: validationSchema,
  });

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    if (isOpen) setUpdateProgressValue(0);
    setIsOpen(!isOpen);
  }

  const onDeleteHandler = async () => {
    confirmAlert({
      title: "Are you sure want to delete " + updateTitle,
      // message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await axios
              .delete(`/admin/deletead/${updateId}`)
              .then((response) => {
                if (response.status === 200) {
                  setIsOpen(false);
                  setCheck(!check);
                  toast.success("Advertisement Deleted Successfully!", {
                    position: "top-right",
                    autoClose: 2700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else {
                  toast.error("Deletion Unsuccessful!", {
                    position: "top-right",
                    autoClose: 2700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  console.log("error");
                }
              })
              .catch((error) => {
                console.log("Catch " + error);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const onSubmitHandler = async (mValues) => {
    if (isOpen) {
      await axios.patch(`/admin/updatead/${updateId}`, {
        title: updateTitle,
        description: updateDescription,
        scheduleTime: updateScheduleTime,
        scheduleDate: updateScheduleDate,
        ticketPrice: updatePrice,
        venue: updateVenue,
        imageUrl: updateImageUrl,
        email: updateEmail,
        adType: updateEventType,
      });
    } else {
      await axios
        .post("/admin/newadd", {
          title: mValues.adTitle,
          description: mValues.adDescription,
          scheduleTime: mValues.adTime,
          scheduleDate: mValues.adDate,
          ticketPrice: mValues.adPrice,
          venue: mValues.adVenue,
          imageUrl: mValues.adImageUrl,
          email: mValues.adEmail,
          adType: mValues.adType,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("New Advertisement Added Successfully!", {
              position: "top-right",
              autoClose: 2700,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setCheck(!check);
            setProgressValue(0);
            // formic.setFieldValue("adTitle", "");
            // formic.setFieldValue("adDescription", "");
            // formic.setFieldValue("adDate", "");
            // formic.setFieldValue("adEmail", "");
            // formic.setFieldValue("adType", "");
            // formic.setFieldValue("adPrice", "");
            // formic.setFieldValue("adImageUrl", "");
            // formic.setFieldValue("adTime", "");
            // formic.setFieldValue("adVenue", "");
            formic.resetForm();
          } else {
            toast.error("Insertion Unsuccessful!", {
              position: "top-right",
              autoClose: 2700,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log("error");
          }
        })
        .catch((error) => {
          console.log("Catch : " + error);
        });
    }
  };

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
          if (isOpen) {
            setUpdateProgressValue((p.loaded / p.total) * 100);
          } else {
            setProgressValue((p.loaded / p.total) * 100);
          }
        },
      })
      .then((response) => {
        if (isOpen) {
          setUpdateImageUrl(response.data.url);
          setUpdateProgressValue(100);
        } else {
          formic.setFieldValue("adImageUrl", response.data.url);
          setProgressValue(100);
        }
      });
  };

  const onClickHandler = async (adData) => {
    const {
      adType,
      description,
      email,
      imageUrl,
      scheduleDate,
      scheduleTime,
      ticketPrice,
      title,
      venue,
      _id,
    } = adData;
    setUpdateTitle(title);
    setUpdateDescription(description);
    setUpdateEmail(email);
    setUpdateEventType(adType);
    setUpdateImageUrl(imageUrl);
    setUpdatePrice(ticketPrice);
    setUpdateVenue(venue);
    setUpdateScheduleDate(scheduleDate);
    setUpdateScheduleTime(scheduleTime);
    setUpdateId(_id);
  };

  return (
    <div className="text-center max-h-1">
      {/* <AdminHeader /> */}
      <p className="sm:text-4xl text-lg mt-5">Ads Management</p>
      <div className="grid grid-cols-2 divide-x divide-gray-400 items-center justify-center mt-20">
        {/* left container BEGIN */}
        <div className="md:ml-5 sm:ml-5 mr-2">
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

            <TextField
              className="text-left"
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
              <MenuItem value={"Wedding"}>Wedding</MenuItem>
              <MenuItem value={"Party"}>Party</MenuItem>
              <MenuItem value={"Show"}>Show</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </TextField>

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
              label="Schedule date"
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
              id="adTime"
              name="adTime"
              label="Schedule Time"
              fullWidth
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 60, // 5 min
              }}
              values={formic.values.adTime}
              onChange={formic.handleChange}
              error={formic.touched.adTime && Boolean(formic.errors.adTime)}
              helperText={formic.touched.adTime && formic.errors.adTime}
              onBlur={formic.handleBlur}
            />
            <TextField
              id="adVenue"
              name="adVenue"
              label="Event Venue"
              value={formic.values.adVenue}
              onChange={formic.handleChange}
              error={formic.touched.adVenue && Boolean(formic.errors.adVenue)}
              helperText={formic.touched.adVenue && formic.errors.adVenue}
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
            <span className="flex flex-row ">
              <TextField
                className="flex-grow"
                id="adImageUrl"
                name="adImageUrl"
                label="Paste Image URL"
                // value={imageUrl}
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

            <span className="mt-5 md:mb-5 sm:mb-3">
              <Button type="submit" variant="outlined">
                Submit
              </Button>
              <ToastContainer
                position="top-right"
                autoClose={2700}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </span>
          </form>
        </div>

        {/* left container END */}

        {/* right container END */}

        <div
          onClick={toggleModal}
          className="overflow-y-auto max-h-96 min-h-full"
        >
          {adList.map((ad, index) => (
            <span key={index} onClick={() => onClickHandler(ad)}>
              <AdComponent cardContent={ad} />
            </span>
          ))}
        </div>

        {/* right container END */}

        {/* Model BEGIN */}

        <div>
          <div className="App">
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
            >
              <div>
                <div className="flex flex-row justify-between">
                  <div className="text-center">Update Document</div>
                  <CancelIcon onClick={toggleModal} />
                </div>
                <div>
                  <form
                    className="flex flex-col ml-auto mr-auto mt-auto items-stretch  "
                    onSubmit={onSubmitHandler}
                  >
                    <TextField
                      id="adTitle"
                      name="adTitle"
                      label="Ad Title"
                      value={updateTitle}
                      onChange={(event) => setUpdateTitle(event.target.value)}
                      required
                    />
                    <TextField
                      id="adDescription"
                      name="adDescription"
                      label="Ad Description"
                      value={updateDescription}
                      onChange={(event) =>
                        setUpdateDescription(event.target.value)
                      }
                      required
                    />

                    <TextField
                      className="text-left"
                      name="adType"
                      id="adType"
                      select
                      label="Event Type"
                      value={updateEventType}
                      onChange={(event) =>
                        setUpdateEventType(event.target.value)
                      }
                    >
                      <MenuItem key={""} value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Wedding"}>Wedding</MenuItem>
                      <MenuItem value={"Party"}>Party</MenuItem>
                      <MenuItem value={"Show"}>Show</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </TextField>

                    <TextField
                      id="adEmail"
                      name="adEmail"
                      label="Email"
                      value={updateEmail}
                      onChange={(event) => setUpdateEmail(event.target.value)}
                    />
                    <TextField
                      margin="dense"
                      id="adDate"
                      label="Schedule date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={Moment(updateScheduleDate).format("YYYY-MM-DD")}
                      onChange={(event) => {
                        setUpdateScheduleDate(event.target.value);
                      }}
                    />
                    <TextField
                      id="adTime"
                      name="adTime"
                      label="Schedule Time"
                      fullWidth
                      type="time"
                      // defaultValue="07:30"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 60,
                      }}
                      value={updateScheduleTime}
                      onChange={(event) => {
                        setUpdateScheduleTime(event.target.value);
                      }}
                    />
                    <TextField
                      id="adVenue"
                      name="adVenue"
                      label="Event Venue"
                      value={updateVenue}
                      onChange={(event) => {
                        setUpdateVenue(event.target.value);
                      }}
                    />
                    <TextField
                      id="adPrice"
                      name="adPrice"
                      label="Ticket Price"
                      value={updatePrice}
                      onChange={(event) => {
                        setUpdatePrice(event.target.value);
                      }}
                    />
                    <img
                      className="block object-contain h-auto w-full lg:w-48 flex-none bg-cover h-24"
                      src={updateImageUrl}
                    />
                    <span className="flex flex-row">
                      <TextField
                        fullWidth
                        id="adImageUrl"
                        name="adImageUrl"
                        label="Paste Image URL"
                        value={updateImageUrl}
                        onChange={(event) => {
                          setUpdateImageUrl(event.target.value);
                        }}
                      />
                      <p className="mt-4 ml-3">OR</p>
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
                    <Progress completed={updateProgressValue} />

                    <span className="mt-5 md:mb-5 sm:mb-3 flex flex-row justify-evenly">
                      <Button type="submit" variant="outlined">
                        Submit
                      </Button>
                      <Button variant="outlined" onClick={onDeleteHandler}>
                        Delete
                      </Button>
                    </span>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        {/* Model END */}
        <ToastContainer
          position="top-right"
          autoClose={2700}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default AddNewAd;
