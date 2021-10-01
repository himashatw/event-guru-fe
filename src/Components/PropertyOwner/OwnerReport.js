import React from "react";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "../../Services/axios";
import GetAppIcon from "@material-ui/icons/GetApp";

function OwnerReport({ type }) {
  const exportPDF = async () => {
    console.log("CALLED");
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const headers = [
      ["Package Name", "Price", "Offer %", "Venue", "Participants"],
    ];

    let data = [];
    let tabletitle;

    if (type === "all") {
      tabletitle = "All Packages";
      await axios
        .get("/propertyOwner/packages")
        .then((response) => {
          data = response.data.result.map((elt) => [
            elt.packageName,
            elt.packagePrice,
            elt.packageOffer,
            elt.packageVenue,
            elt.participants,
          ]);

          let content = {
            startY: 50,
            head: headers,
            body: data,
          };

          doc.text(tabletitle, 40, 40);

          doc.autoTable(content);
          doc.save("report.pdf");
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "wedding") {
      tabletitle = "Wedding Packages";
      await axios
        .get("/propertyOwner/packages/weddings")
        .then((response) => {
          data = response.data.result.map((elt) => [
            elt.packageName,
            elt.packagePrice,
            elt.packageOffer,
            elt.packageVenue,
            elt.participants,
          ]);

          let content = {
            startY: 50,
            head: headers,
            body: data,
          };

          doc.text(tabletitle, 40, 40);

          doc.autoTable(content);
          doc.save("report.pdf");
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "party") {
      tabletitle = "Party Packages";
      await axios
        .get("/propertyOwner/packages/party")
        .then((response) => {
          data = response.data.result.map((elt) => [
            elt.packageName,
            elt.packagePrice,
            elt.packageOffer,
            elt.packageVenue,
            elt.participants,
          ]);

          let content = {
            startY: 50,
            head: headers,
            body: data,
          };

          doc.text(tabletitle, 40, 40);

          doc.autoTable(content);
          doc.save("report.pdf");
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "concert") {
      tabletitle = "Concert Packages";
      await axios
        .get("/propertyOwner/packages/concert")
        .then((response) => {
          data = response.data.result.map((elt) => [
            elt.packageName,
            elt.packagePrice,
            elt.packageOffer,
            elt.packageVenue,
            elt.participants,
          ]);

          let content = {
            startY: 50,
            head: headers,
            body: data,
          };

          doc.text(tabletitle, 40, 40);

          doc.autoTable(content);
          doc.save("report.pdf");
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "other") {
      tabletitle = "Other Packages";
      await axios
        .get("/propertyOwner/packages/other")
        .then((response) => {
          data = response.data.result.map((elt) => [
            elt.packageName,
            elt.packagePrice,
            elt.packageOffer,
            elt.packageVenue,
            elt.participants,
          ]);

          let content = {
            startY: 50,
            head: headers,
            body: data,
          };

          doc.text(tabletitle, 40, 40);

          doc.autoTable(content);
          doc.save("report.pdf");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("UNDEFINED");
    }
  };
  return (
    <div onClick={() => exportPDF()}>
      <GetAppIcon />
    </div>
  );
}

export default OwnerReport;
