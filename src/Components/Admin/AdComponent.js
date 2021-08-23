import React from "react";

function AdComponent() {
  return (
    <div className="container container max-w-xl m-auto flex flex-wrap flex-col items-center justify-start">
      <div className="w-full lg:w-3/4 p-3">
        <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">
          <img
            className="block h-auto w-full lg:w-48 flex-none bg-cover h-24"
            src="https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg"
          />
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="text-black font-bold text-xl mb-2 leading-tight">
              Can life make you a bitter developer?
            </div>
            <p className="text-grey-darker text-base">Read more</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdComponent;
