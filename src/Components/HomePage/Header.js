import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function Header() {
  return (
    // <header className="flex w-full justify-between p-4 text-lg bg-gray-800 text-gray-100 justi items-center">
    //   <div className="flex space-x-3">
    //     <p className="link">Option</p>
    //     <p className="link">Option</p>
    //   </div>
    //   <div className="flex space-x-4 items-center">
    //     <p className="link">Option</p>
    //     <p className="link">Option</p>
    //   </div>
    // </header>
    <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon className={classes.icon} /> */}
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default Header;
