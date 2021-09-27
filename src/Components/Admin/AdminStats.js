import React, { useEffect, useState } from "react";
import axios from "axios";
import localAxios from "../../Services/axios";
import AdminReport from "./AdminReport";

function AdminStats() {
  const [usersCount, setUsersCount] = useState(null);
  const [ownersCount, setOwnersCount] = useState(null);
  const [adsCount, setAdsCount] = useState(null);
  const [oganizersCount, setOrganizersCount] = useState(null);

  const [usersList, setUsersList] = useState([]);
  const [ownersList, setOwnersList] = useState([]);
  const [organizersList, setOrganizersList] = useState([]);

  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async () => {
    axios
      .all([
        localAxios.get("/admin/usercount"),
        localAxios.get("/admin/adcount"),
        localAxios.get("/admin/ownercount"),
        localAxios.get("/admin/organizercount"),
        localAxios.get("/admin/users"),
        localAxios.get("/admin/owners"),
        localAxios.get("/admin/organizers"),
      ])
      .then(
        axios.spread(
          (
            users,
            ads,
            owners,
            organizers,
            usersList,
            ownersList,
            organizersList
          ) => {
            setUsersCount(users.data.result);
            setAdsCount(ads.data.result);
            setOwnersCount(owners.data.result);
            setOrganizersCount(organizers.data.result);
            setUsersList(usersList.data.result);
            setOwnersList(ownersList.data.result);
            setOrganizersList(organizersList.data.result);
          }
        )
      );
  };
  //   console.log(organizersList);
  const loadingComponent = () => (
    <div class="flex justify-center items-center space-x-1 text-sm text-gray-700 text-center">
      <svg
        fill="none"
        class="w-10 h-10 animate-spin"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
          fill="currentColor"
          fill-rule="evenodd"
        />
      </svg>

      <div>Loading ...</div>
    </div>
  );
  return (
    <div>
      <div className="flex justify-center bg-gray-100 py-10 p-14">
        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-red-400 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">REGISTERED USERS</p>
            </div>
            <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>

            <p className="py-4 text-3xl ml-5">
              {usersCount === null ? loadingComponent() : usersCount}
            </p>
          </div>
        </div>

        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-blue-500 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">
                ACTIVE ADVERTISEMENTS
              </p>
            </div>
            <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">
              {adsCount === null ? loadingComponent() : adsCount}
            </p>
          </div>
        </div>

        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-purple-400 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">PROPERTY OWNERS</p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">
              {ownersCount === null ? loadingComponent() : ownersCount}
            </p>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-purple-900 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">EVENT ORGANIZERS</p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">
              {oganizersCount === null ? loadingComponent() : oganizersCount}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-gray-100 py-10 p-5">
        <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
          <div className="w-11/12 mx-auto">
            <div className="bg-white my-6">
              <h1 className="font-bold uppercase text-center text-gray-600 font-thin">
                <div className=" flex justify-between flex-row items-baseline">
                  <p> Users </p>
                  <span className="mb-2">
                    <AdminReport
                      title={"Users"}
                      headersArray={["Name", "Contact"]}
                      dataArray={usersList}
                    />
                  </span>
                </div>
              </h1>
              <table className="text-left w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                      Name
                    </th>
                    <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                      Contact Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.length === 0
                    ? loadingComponent()
                    : usersList.map((user, index) => (
                        <tr className="hover:bg-grey-lighter" key={index}>
                          <td className="py-4 px-6 border-b border-grey-light">
                            {user.firstName + " " + user.lastName}
                          </td>
                          <td className="py-4 px-6 text-center border-b border-grey-light">
                            {user.phoneNo}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container mr-5 mx-auto bg-white shadow-xl">
          <div className="w-11/12 mx-auto">
            <div className="bg-white my-6">
              <h1 className="font-bold uppercase text-center text-gray-600 font-thin">
                <div className=" flex justify-between flex-row items-baseline">
                  <p> Owners </p>
                  <span className="mb-2">
                    <AdminReport
                      title={"Owners"}
                      headersArray={["Name", "Location"]}
                      dataArray={ownersList}
                    />
                  </span>
                </div>
              </h1>
              <table className="text-left w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                      NAME
                    </th>
                    <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                      LOCATION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ownersList.length === 0
                    ? loadingComponent()
                    : ownersList.map((user, index) => (
                        <tr className="hover:bg-grey-lighter" key={index}>
                          <td className="py-4 px-6 border-b border-grey-light">
                            {user.name}
                          </td>
                          <td className="py-4 px-6 text-center border-b border-grey-light">
                            {user.location}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container mx-auto bg-white shadow-xl">
          <div className="w-11/12 mx-auto">
            <div className="bg-white my-6">
              <h1 className="font-bold uppercase text-center text-gray-600 font-thin">
                <div className=" flex justify-between flex-row items-baseline">
                  <p> Organizers </p>
                  <span className="mb-2">
                    <AdminReport
                      title={"Organizers"}
                      headersArray={["Name", "Contact Number"]}
                      dataArray={organizersList}
                    />
                  </span>
                </div>
              </h1>
              <table className="text-left w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                      Name
                    </th>
                    <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                      Contact Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {organizersList.length === 0
                    ? loadingComponent()
                    : organizersList.map((user, index) => (
                        <tr className="hover:bg-grey-lighter" key={index}>
                          <td className="py-4 px-6 border-b border-grey-light">
                            {user.name}
                          </td>
                          <td className="py-4 px-6 text-center border-b border-grey-light">
                            {user.phone}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStats;
