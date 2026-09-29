import { useState } from 'react';

export default function IncomeList({ categories, onDeleteCategory, onExportCSV }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = categories.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h2 className="h6 mb-0 text-secondary fw-bold text-uppercase">
          Registered Categories
        </h2>
        {/* Purple Badge */}
        <span className="badge badge-purple fs-6 fw-semibold">
          Total: ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="p-3 border-bottom bg-light d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories or descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-primary text-nowrap" onClick={onExportCSV}>
          Export CSV
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="w-35">Category Name</th>
              <th scope="col">Description</th>
              <th scope="col" className="text-end">Amount</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody id="listIncomeCat">
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted py-3">
                  No income categories found.
                </td>
              </tr>
            ) : (
              filteredCategories.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold text-dark">{item.name}</td>
                  <td className="text-secondary">{item.desc}</td>
                  <td className="text-end fw-semibold" style={{ color: '#6f42c1' }}>
                    ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDeleteCategory(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}