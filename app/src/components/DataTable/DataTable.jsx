'use client';

import './DataTable.css';

const inquiries = [
  {
    id: 'INQ-001',
    date: '2026-01-06',
    documentType: 'Passport',
    state: 'Pending',
    nextAction: 'Review',
  },
  {
    id: 'INQ-002',
    date: '2026-01-05',
    documentType: 'Visa',
    state: 'In Progress',
    nextAction: 'Process',
  },
  {
    id: 'INQ-003',
    date: '2026-01-04',
    documentType: 'Driving License',
    state: 'Closed',
    nextAction: 'View',
  },
];

const DataTable = () => {
  const handleAction = (inquiry) => {
    alert(`Next action: ${inquiry.nextAction} for ${inquiry.id}`);
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Inquiry ID</th>
          <th>Date</th>
          <th>Document Type</th>
          <th>State</th>
          <th>Next Activity</th>
        </tr>
      </thead>

      <tbody>
        {inquiries.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.documentType}</td>
            <td>
              <span className={`status ${item.state.toLowerCase().replace(' ', '-')}`}>
                {item.state}
              </span>
            </td>
            <td>
              <button
                className="action-btn"
                onClick={() => handleAction(item)}
              >
                {item.nextAction}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
