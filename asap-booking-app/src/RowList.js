import React from "react";
import "./RowList.css";

function RowList({
  num,
  ticketNumber,
  serviceType,
  status,
  createdAt,
  comments,
}) {
  return (
    <tr className="rowList">
      <td className="num"> {num}</td>
      <td className="ticketNumber"> {ticketNumber}</td>
      <td className="serviceType"> {serviceType}</td>
      <td className="status"> {status}</td>
      <td className="createdAt"> {createdAt}</td>
      <td className="comments"> {comments}</td>
    </tr>
  );
}

export default RowList;
