import React from "react";

function Header() {
  return (
    <header className="flex w-full justify-between p-4 text-lg bg-gray-800 text-gray-100 justi items-center">
      <div className="flex space-x-3">
        <p className="link">Option</p>
        <p className="link">Option</p>
      </div>
      <div className="flex space-x-4 items-center">
        <p className="link">Option</p>
        <p className="link">Option</p>
      </div>
    </header>
  );
}

export default Header;
