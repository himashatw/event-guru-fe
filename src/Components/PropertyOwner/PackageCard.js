import React from "react";

const PackageCard = ({ cardContent }) => {
  //   const btnHandler = () => {
  //     alert(id);
  //   };
  return (
    <div className="col">
      <div className="card h-100" style={{ borderRadius: "20px" }}>
        <img
          src={cardContent.packageImageUrl}
          className="card-img-top"
          alt="..."
          style={{
            objectFit: "cover",
            maxHeight: "200px",
            borderRadius: "20px",
            border: "1px solid black",
          }}
        />
        <div className="card-body text-center">
          <h5 className="text-xl font-bold">{cardContent.packageName}</h5>
          <p className="card-text" style={{ color: "black" }}>
            {cardContent.packageType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
