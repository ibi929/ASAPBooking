import React, { useEffect, useState } from "react";
import "./TicketList.css";
import RowList from "./RowList";
import { doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { ticketsColRef, servicesColRef, db } from "./Firebase";

function TicketList() {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [serviceType, setServiceType] = useState("");
  const [statusType, setStatusType] = useState("all");

  let counter = 0;
  // state for storing the service ID
  const [serviceID, setServiceID] = useState("1");
  useEffect(() => {
    // // querying the tickets collection.
    // const queryTickets = query(
    //   ticketsColRef,
    //   where("status", "==", statusType),
    //   where("serviceId", "==", serviceID)
    // );

    // querying the tickets collection.
    let queryTickets;
    if (statusType === "all") {
      queryTickets = query(
        ticketsColRef,
        where("status", "in", ["done", "skipped", "waiting"]),
        where("serviceId", "==", serviceID)
      );
    } else {
      queryTickets = query(
        ticketsColRef,
        where("status", "==", statusType),
        where("serviceId", "==", serviceID)
      );
    }
    // subscribing to a realtime listener in the database in order to retrieve data.
    const unsubscribe = onSnapshot(queryTickets, (snapshot) => {
      let tickets = [];

      // looping through each doc in the database (i.e "tickets" collection) to retrieve data.
      snapshot.docs.forEach((doc) => {
        tickets.push({ ...doc.data(), id: doc.id });
      });

      // updating the state of tickets.
      setTicketsArray(tickets.sort((a, b) => a.timestamp - b.timestamp));

      // formatting the time of the timestamp (which is not formatted properly)
      tickets.forEach((ticket) => {
        // Convert the timestamp into a date-time object
        const date = ticket.timestamp.toDate();

        // Format the date-time object into a string in the desired format
        const formattedTimestamp = date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
          timeZone: "UTC",
        });
        // updatting the regular timestamp with the formatted one;
        ticket.timestamp = formattedTimestamp;
      });
      // updattting the ticketsArray with the latest tickets list.
      setTicketsArray(tickets);

      // console.log("************************");
      // console.log(statusType);
      // getting the name of the service based on the service id (selected from the `desk:` drop down)
      const servicesColRef = doc(db, "services", serviceID);
      getDoc(servicesColRef).then((service) =>
        setServiceType(service.data().service_name)
      );
    });

    return unsubscribe;
  }, [serviceID, statusType]);

  const [servicesArray, setServicesArray] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(servicesColRef, (service) => {
      let services = [];
      service.docs.forEach((doc) => {
        services.push({ ...doc.data(), id: doc.id });
      });
      setServicesArray(services);
    });
    console.log(servicesArray);
    return unsubscribe;
  }, []);

  return (
    <div className="ticketList">
      {/* ticketList Header */}

      <div className="ticketList--header">
        <div className="ticketList--menuName">
          <h2 className="menuName"> Tickets</h2>
        </div>

        {/* dropedown menue for filtering by ticket service Desk */}
        <div className="ticketList--menuService">
          <h2 className="ticketList--menuServiceName"> Service:</h2>
          <select
            className="ticketList--menuServiceNumber"
            onChange={(e) => setServiceID(e.target.value)}
            value={serviceID}
          >
            {servicesArray.map((service) => (
              <option key={service.id} value={service.id}>
                {service.service_name}
              </option>
            ))}
            {/* <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option> */}
          </select>
        </div>

        {/* dropedown menue for filtering by ticket status */}
        <div className="ticketList--menuTicketStatus">
          <h2 className="ticketList--menuTicketStatusType"> Ticket Status:</h2>
          <select
            className="ticketList--menuTicketStatusNumber"
            onChange={(e) => setStatusType(e.target.value)}
            value={statusType}
          >
            <option value="all">All</option>
            <option value="waiting">Waiting</option>
            <option value="done">Done</option>
            <option value="skipped">Skipped</option>
          </select>
        </div>
      </div>

      {/* displaying the table */}
      <table className="ticketList--table">
        <thead className="table--header">
          <tr className="theader--row">
            <th>#</th>
            <th>Ticket Number</th>
            <th>Service</th>
            <th>Status</th>
            <th>Created At</th>
            <th> Comment</th>
          </tr>
        </thead>
        <tbody className="table--body">
          {ticketsArray.map(
            (item) => (
              counter++,
              (
                <RowList
                  key={item.id}
                  num={counter}
                  ticketNumber={item.ticketNumber}
                  serviceType={serviceType}
                  status={item.status}
                  createdAt={item.timestamp}
                  comments={item.comments}
                />
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;
