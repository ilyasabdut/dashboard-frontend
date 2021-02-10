export default function TableTickets({ ticket }) {
  const { name } = ticket;
  return (
    <tr>
      <td>{ticket.name}</td>
      <td>{ticket.priority}</td>
      <td>{ticket.status}</td>
    </tr>
  );
}
