import React from "react";

function AdComponent({ cardContent }) {
  return (
    <div className="container container max-w-xl m-auto flex flex-wrap flex-col items-center justify-start">
      <div className="w-full lg:w-5/6 p-2  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-md">
        <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">
          <img
            className="block h-auto w-full lg:w-48 flex-none bg-cover h-24"
            src={cardContent.imageUrl}
          />
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="text-black font-bold text-xl mb-2 leading-tight">
              {cardContent.title}
            </div>
            <p className="text-grey-darker text-base">
              {cardContent.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdComponent;
