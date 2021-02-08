import React, { useState, useEffect } from "react";
import TicketDataService from "../services/ticket.service";
import { Link } from "react-router-dom";

const ListTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTickets] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveTickets();
  }, []);
  
  const retrieveTickets = () => {
    TicketDataService.getAll()
      .then((response) => {
        setTickets(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTickets();
    setCurrentTickets(null);
    setCurrentIndex(-1);
  };

  const setActiveTicket = (ticket, index) => {
    setCurrentTickets(ticket);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>tickets List</h4>

        <ul className="list-group">
          {tickets.data &&
            tickets.data.map((ticket, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTicket(ticket, index)}
                key={index}
              >
                {ticket.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTicket ? (
          <div>
            <h4>Tickets</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTicket.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTicket.priority}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTicket.status}
            </div>

            <Link
              to={"/tickets/" + currentTicket.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Ticket...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTickets;
