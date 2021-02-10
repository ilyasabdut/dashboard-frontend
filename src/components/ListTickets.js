import React, { useState, useEffect } from "react";
import TicketDataService from "../services/ticket.service";
import TableTickets from "./TableTickets";
import $ from "jquery";
import DataTable from "datatables.net";

$.DataTable = DataTable;

const ListTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    $(document).ready(function ($) {
      $("#tableTickets").DataTable();
    });
  });

  useEffect(() => {
    retrieveTickets();
    retrieveTicketsNumber();
  }, []);

  const retrieveTicketsNumber = () => {
    TicketDataService.getNumber()
      .then((response) => {
        setNumbers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveTickets = () => {
    TicketDataService.getAll()
      .then((response) => {
        setTickets(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      <h4>tickets List</h4>
      <div>
        <div className="card" style={{ width: " 18rem" }}>
          <div className="card-header">Priority List</div>
          <div className="card-body">
            {numbers.data &&
              numbers.data.map((number, index) => (
                <p className="card-text">
                  {number.priority} - {number.total_tickets}{" "}
                </p>
              ))}
          </div>
        </div>

        <table
          id="tableTickets"
          className="table table-striped table-border"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <>
              {tickets.data &&
                tickets.data.map((ticket, index) => (
                  <TableTickets ticket={ticket} key={index} />
                ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTickets;
