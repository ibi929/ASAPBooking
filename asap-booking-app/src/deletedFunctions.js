const handleNextTicket = () => {
  if (waitingTickets.length === 0) {
    alert("All tickets are served 🎉");
    return;
  }

  const currentTicket = waitingTickets[0];
  let ticketStatus;
  const ticketDocRef = doc(db, "tickets", currentTicket.id);
  getDoc(ticketDocRef).then((doc) => {
    ticketStatus = doc.data().status;
    console.log(ticketStatus);
  });
  let id;

  if (currentTicket.status !== "in progress") {
    id = currentTicket.id;
    const ticketDocRef = doc(db, "tickets", id);
    updateDoc(ticketDocRef, {
      status: "in progress",
    }).then(() => {
      console.log(`Ticket ${currentTicketNumber + 1} is now in progress.`);
    });
  } else if (ticketStatus === "done") {
    const nextTicketNumber = currentTicketNumber + 1;
    if (nextTicketNumber < waitingTickets.length) {
      const nextTicket = waitingTickets[nextTicketNumber];
      id = nextTicket.id;
      const ticketDocRef = doc(db, "tickets", id);
      updateDoc(ticketDocRef, {
        status: "in progress",
      }).then(() => {
        console.log(`Ticket ${nextTicketNumber + 1} is now in progress.`);
      });
    } else {
      alert("All tickets are served 🎉");
    }
  } else {
    console.log(
      "ticket already in progress! click done or cancel to proceed to next"
    );
  }
  if (currentTicket.status === "in progress") {
    id = currentTicket.id;
    const ticketDocRef = doc(db, "tickets", id);
    updateDoc(ticketDocRef, {
      status: "done",
    }).then(() => {
      console.log(`Ticket ${currentTicketNumber + 1} is now done.`);
    });
  }
};

const handleDoneTicket = () => {
  if (waitingTickets.length === 0) {
    alert("There are no tickets to mark as done.");
    return;
  }

  const currentTicket = waitingTickets[0];
  const nextTicket = waitingTickets[1];
  if (currentTicket.status !== "in progress") {
    alert("The current ticket is not in progress.");
    return;
  }

  const ticketDocRef = doc(db, "tickets", currentTicket.id);

  updateDoc(ticketDocRef, {
    status: "done",
  }).then(() => {
    console.log(`Ticket ${currentTicketNumber + 1} is now done.`);
  });
};
