import React, { useState } from "react";
import TicketDataService from "../services/ticket.service";

const AddTicket = () => {
  const initialTicketState = {
    id: null,
    name: "",
    priority: "",
    status: ""
  };
  const [ticket, setTicket] = useState(initialTicketState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTicket({ ...ticket, [name]: value });
  };

  const saveTicket = () => {
    var data = {
      name: ticket.name,
      priority: ticket.priority,
      status: ticket.status
    };

    TicketDataService.create(data)
      .then(response => {
        setTicket({
          id: response.data.id,
          name: response.data.name,
          priority: response.data.priority,
          status: response.data.status
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTicket = () => {
    setTicket(initialTicketState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTicket}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={ticket.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              className="form-control"
              id="priority"
              required
              value={ticket.priority}
              onChange={handleInputChange}
              name="priority"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              required
              value={ticket.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>


          <button onClick={saveTicket} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTicket;
