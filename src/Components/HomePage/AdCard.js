import React from "react";

function AdCard({ cardData: { _id, imageUrl, title, description } }) {
  //   console.log(cardData);

  const navigateViewAdvert = (e, id) => {
    window.location = `/view/advertisment/${id}`;
}

  return (
    <div className="shadow-2xl transition duration-500 ease-in-out   transform hover:-translate-y-1 hover:scale-110">
      <main className="grid w-full min-h-1  place-content-center">
        <div className="rounded-lg">
          <div className="bg-gray-100 rounded-lg w-96">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-48 transition duration-300 rounded-t-lg sm:h-56 opacity-80 hover:opacity-100"
            />

            <div className="px-10 py-6 mb-10 text-center">
              <div className="mb-4 text-3xl font-bold text-purple-600 uppercase">
                {title}
              </div>
              <span className="text-sm">{description}</span>
            </div>
            <button className="w-full h-16 text-lg font-extrabold text-gray-100 transition duration-300 bg-purple-600 rounded-b-lg hover:bg-purple-700" 
              onClick={e => { navigateViewAdvert(e,_id) }}
            >
              VIEW AD
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdCard;
