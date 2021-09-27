import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import GetAppIcon from "@material-ui/icons/GetApp";

function AdminReport({ dataArray, title, headersArray }) {
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const tabletitle = `${title} Report`;
    const headers = [headersArray];

    let data = [];
    if (title === "Users") {
      data = dataArray.map((elt) => [elt.firstName, elt.phoneNo]);
    } else if (title === "Owners") {
      data = dataArray.map((elt) => [elt.name, elt.location]);
    } else if (title === "Organizers") {
      data = dataArray.map((elt) => [elt.name, elt.phone]);
    }

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };
    // const title2 = "My Awesome Report 2";

    doc.text(tabletitle, marginLeft, 40);

    doc.autoTable(content);
    doc.save(`${title}_report.pdf`);
  };
  return (
    <div onClick={() => exportPDF()}>
      <div className="border-2 border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-50 ">
        <GetAppIcon /> Report
      </div>
    </div>
  );
}

export default AdminReport;
