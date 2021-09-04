import React, { useEffect, useState } from "react";
import SlideShow from "./SlideShow";
import SideBar from "../PropertyOwner/SideBar";
import axios from "../../Services/axios";

function ViewPackages() {
  const [packagesList, setPackagesList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/propertyOwner/packages")
        .then((response) => {
          console.log(response.data.result);

          setPackagesList(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4 m-3 mt-10 content-center ">
      <div className="col-span-1  ml-6">
        {/* <div className="flex flex-col justify-evenly ">
          <button className="mt-10">Wedding</button>
          <button className="mt-10">Party</button>
          <button className="mt-10">Concert</button>
          <button className="mt-10">Other</button>
        </div> */}
        <SideBar />
      </div>
      <div className="col-span-3 border-4 border-black-900 mr-10 items-center">
        <div className="mt-12">
          {packagesList.length !== 0 && <SlideShow data={packagesList} />}
        </div>
      </div>
    </div>
  );
}

export default ViewPackages;
