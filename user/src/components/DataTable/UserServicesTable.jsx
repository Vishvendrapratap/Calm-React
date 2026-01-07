'use client';
import './UserServicesTable.css';

const services = [
  { id: 1, name: 'Passport Renewal', status: 'Available' },
  { id: 2, name: 'Visa Extension', status: 'Closed' },
  { id: 3, name: 'Driving License Update', status: 'Available' },
];

export default function UserServicesTable() {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Status</th>
          <th>Apply</th>
        </tr>
      </thead>

      <tbody>
        {services.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.status}</td>
            <td>
              <button
                className="action-btn"
                onClick={() => window.location.href = '/inquiry'}
              >
                Apply
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
