import React, { useEffect, useState } from "react";
import "./TicketService.css";
import { servicesColRef } from "./Firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import DataSaverOnOutlinedIcon from "@mui/icons-material/DataSaverOnOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function TicketService() {
  const [servicesArray, setServicesArray] = useState([]);
  const [serviceNameInput, setServiceNameInput] = useState("");
  const [serviceTaskCompletionInput, setServiceTaskCompletionInput] =
    useState("");
  const [serviceLetterInput, setServiceLetterInput] = useState("");
  let counter = 0;

  useEffect(() => {
    const unsubscribe = onSnapshot(servicesColRef, (service) => {
      let services = [];
      service.docs.forEach((doc) => {
        services.push({ ...doc.data(), id: doc.id });
      });
      setServicesArray(services);
    });
    // console.log(servicesArray);
    // console.log(serviceNameInput);

    return unsubscribe;
  }, []);

  const handleInput = () => {
    if (
      serviceTaskCompletionInput !== "" &&
      serviceNameInput !== " " &&
      serviceLetterInput !== ""
    ) {
      const newServiceId = (servicesArray?.length + 1).toString();
      console.log(newServiceId);
      const servicesDocRef = doc(servicesColRef, newServiceId);
      setDoc(servicesDocRef, {
        service_name: serviceNameInput,
        letter: serviceLetterInput,
        task_completion_time: serviceTaskCompletionInput,
      })
        .then(() => {
          console.log("New service document added with ID:", newServiceId);
        })
        .catch((error) => {
          console.error("Error adding new service document:", error);
        });
    } else {
      alert("make sure to fill up all the fields");
    }
  };
  return (
    <div className="ticketService">
      {/* Ticket Service header */}

      <div className="ticketService--header">
        <div className="ticketService--menuName">
          <h2 className="menuName"> Services</h2>
        </div>
      </div>

      {/* display ticket service in a table form */}
      <table className="ticketService--table">
        <thead className="table--header">
          <tr className="theader--input">
            <th></th>
            <th>
              <div className="input--wrapper">
                <input
                  className="input"
                  type="text"
                  placeholder="SERVICE NAME"
                  onChange={(e) => {
                    setServiceNameInput(e.target.value);
                  }}
                />
              </div>
            </th>
            <th>
              <div className="input--wrapper">
                <input
                  className="input"
                  type="text"
                  placeholder="TASK COMPLETION TIME"
                  onChange={(e) => {
                    setServiceTaskCompletionInput(e.target.value);
                  }}
                />
              </div>
            </th>
            <th>
              <div className="input--wrapper">
                <input
                  className="input"
                  type="text"
                  placeholder="SERVICE LETTER"
                  onChange={(e) => {
                    setServiceLetterInput(e.target.value);
                  }}
                />
              </div>
            </th>
          </tr>
          <tr className="theader--row">
            <th>#</th>
            <th>Service Name</th>
            <th>Service ID</th>
            <th>Service Letter</th>
          </tr>
        </thead>
        <tbody className="table--body">
          {servicesArray.map(
            (service) => (
              counter++,
              (
                <tr key={service.id} className="rowList">
                  <td className="num"> {counter}</td>
                  <td className="serviceName"> {service.service_name}</td>
                  <td className="serviceName"> {service.id}</td>
                  <td className="serviceLetter">{service.letter} </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      <div className="btn--addService" onClick={handleInput}>
        <AddOutlinedIcon />
      </div>
    </div>
  );
}

export default TicketService;
