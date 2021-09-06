import React from "react";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from "react-router-dom";

function AdminHeader() {
  const history = useHistory();
  return (
    <div>
      <div className="flex-1 flex flex-col">
        <nav className="px-4 flex justify-between bg-white h-16 border-b-2">
          <ul className="flex items-center">
            <li className="h-10 w-10">
              <img
                className="h-full w-full mx-auto"
                src="https://i.ibb.co/j8LMYsM/EG-modified.png"
                alt="svelte logo"
              />
            </li>
          </ul>

          <ul className="flex items-center">
            <li
              onClick={() => history.push("/admin/dashboard")}
              className="cursor-pointer"
            >
              <h1 className="pl-8 lg:pl-0 text-gray-700 text-xl">Admin</h1>
            </li>
          </ul>

          <ul className="flex items-center">
            <li className="h-8 w-8 mr-5">
              <img
                className="h-full w-full rounded-full mx-auto"
                src="https://e7.pngegg.com/pngimages/433/409/png-clipart-silhouette-male-silhouette-cdr-animals.png"
                alt="profile woman"
              />
            </li>
            <li className="pr-6">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg> */}
              <PowerSettingsNewIcon />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminHeader;
