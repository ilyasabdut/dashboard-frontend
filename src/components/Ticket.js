import React, { useState, useEffect } from "react";
import TicketDataService from "../services/ticket.service";

const Ticket = (props) => {
  const initialTicketState = {
    id: null,
    name: "",
    priority: "",
    status: "",
  };
  const [currentTicket, setCurrentTicket] = useState(initialTicketState);
  const [message, setMessage] = useState("");

  const getTicket = (id) => {
    TicketDataService.get(id)
      .then((response) => {
        setCurrentTicket(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTicket(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTicket({ ...currentTicket, [name]: value });
  };

  const updateTicket = () => {
    TicketDataService.update(currentTicket.id, currentTicket)
      .then((response) => {
        console.log(response.data);
        setMessage("The ticket was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTicket = () => {
    TicketDataService.remove(currentTicket.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/tickets");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTicket ? (
        <div className="edit-form">
          <h4>Ticket</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTicket.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Description</label>
              <input
                type="text"
                className="form-control"
                id="priority"
                name="priority"
                value={currentTicket.priority}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Description</label>
              <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                value={currentTicket.status}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTicket}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Ticket...</p>
        </div>
      )}
    </div>
  );
};

export default Ticket;
