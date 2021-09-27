import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filter";
import axios from "../../Services/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageRegistrations = () => {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const doFetch = async () => {
      await axios
        .get("/admin/getrequests")
        .then((response) => {
          setData(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    doFetch();
  }, [check]);

  const acceptHandler = async (mOwnerId) => {
    await axios
      .patch(`/admin/acceptrequest/${mOwnerId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Registration Request Accepted!", {
            position: "top-right",
            autoClose: 2700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCheck(!check);
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          toast.error("Error Occurred!", {
            position: "top-right",
            autoClose: 2700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCheck(!check);
        }
        console.log(error);
      });
  };

  const deletHandler = async (mOwnerId) => {
    await axios
      .delete(`/admin/deleterequest/${mOwnerId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Registration Request Declined!", {
            position: "top-right",
            autoClose: 2700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCheck(!check);
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          toast.error("Error Occurred!", {
            position: "top-right",
            autoClose: 2700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCheck(!check);
        }
        console.log(error);
      });
  };

  const renderRowSubComponent = (row) => {
    const { bioDetails, propertyImageUrl, _id } = row.original;
    return (
      <Card style={{ width: "18rem", margin: "0 auto", padding: "1%" }}>
        <CardImg top src={propertyImageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle>
            <strong>{bioDetails} </strong>
          </CardTitle>
          <CardText>
            <div
              style={{
                justifyContent: "space-evenly",
                display: "flex",
                flexDirection: "row",
                margin: "1%",
              }}
            >
              <button
                type="button"
                className="py-3 px-3 text-white rounded-lg bg-green-400 shadow-lg block md:inline-block"
                onClick={() => acceptHandler(_id)}
              >
                Approve
              </button>
              <button
                className="py-3 px-3 text-white rounded-lg bg-red-500 shadow-lg block md:inline-block"
                type="button"
                onClick={() => deletHandler(_id)}
              >
                Decline
              </button>
            </div>
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "expander", // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
      },
      {
        Header: "Type",
        accessor: "propertyType",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Owner Name",
        accessor: "name",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Contact Number",
        accessor: "contactNumber",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      //   {
      //     Header: "Hemisphere",
      //     accessor: (values) => {
      //       const { latitude, longitude } = values.location.coordinates;
      //       const first = Number(latitude) > 0 ? "N" : "S";
      //       const second = Number(longitude) > 0 ? "E" : "W";
      //       return first + "/" + second;
      //     },
      //     disableSortBy: true,
      //     Filter: SelectColumnFilter,
      //     filter: "equals",
      //     Cell: ({ cell }) => {
      //       const { value } = cell;

      //       const pickEmoji = (value) => {
      //         let first = value[0]; // N or S
      //         let second = value[2]; // E or W
      //         const options = ["⇖", "⇗", "⇙", "⇘"];
      //         let num = first === "N" ? 0 : 2;
      //         num = second === "E" ? num + 1 : num;
      //         return options[num];
      //       };

      //       return (
      //         <div style={{ textAlign: "center", fontSize: 18 }}>
      //           {pickEmoji(value)}
      //         </div>
      //       );
      //     },
      //   },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 80 }}>
      <h3
        className="pl-8 lg:pl-0 text-gray-700 text-3xl"
        style={{ textAlign: "center", margin: "2%", marginLeft: "10%" }}
      >
        Manage Registration Requests
      </h3>
      <div
        className="ml-52"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TableContainer
          columns={columns}
          data={data}
          renderRowSubComponent={renderRowSubComponent}
        />
      </div>
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
    </Container>
  );
};

export default ManageRegistrations;
