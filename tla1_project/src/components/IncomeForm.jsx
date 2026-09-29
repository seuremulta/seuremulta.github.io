import { useState, useRef } from 'react';

export default function IncomeForm({ onAddCategory }) {
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catAmount, setCatAmount] = useState('');
  const nameInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = catName.trim();
    const trimmedDesc = catDesc.trim();
    const parsedAmount = parseFloat(catAmount);

    if (!trimmedName || !trimmedDesc || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please complete all fields with valid information.");
      return;
    }

    let formattedName = trimmedName.toUpperCase();
    if (formattedName.length > 25) {
      formattedName = formattedName.slice(0, 25) + "...";
    }

    let formattedDesc = trimmedDesc;
    if (formattedDesc.length > 25) {
      formattedDesc = formattedDesc.slice(0, 25) + "...";
    }

    onAddCategory({
      id: crypto.randomUUID(),
      name: formattedName,
      desc: formattedDesc,
      amount: parsedAmount,
    });

    setCatName('');
    setCatDesc('');
    setCatAmount('');
    nameInputRef.current?.focus();
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      {/* Updated to bg-purple */}
      <div className="card-header bg-purple text-white py-3">
        <h1 className="h5 mb-0 fw-bold">Income Category Registration</h1>
      </div>
      <div className="card-body p-4">
        <form id="categoryForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="txtCatName" className="form-label fw-semibold">
              Category Name
            </label>
            <input
              ref={nameInputRef}
              type="text"
              id="txtCatName"
              className="form-control"
              placeholder="e.g., Consulting"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="txtCatDesc" className="form-label fw-semibold">
              Description
            </label>
            <input
              type="text"
              id="txtCatDesc"
              className="form-control"
              placeholder="e.g., Enterprise technical support contract"
              value={catDesc}
              onChange={(e) => setCatDesc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="txtCatAmount" className="form-label fw-semibold">
              Amount ($)
            </label>
            <input
              type="number"
              id="txtCatAmount"
              className="form-control"
              placeholder="e.g., 1500"
              step="0.01"
              value={catAmount}
              onChange={(e) => setCatAmount(e.target.value)}
            />
          </div>

          <button
            type="submit"
            id="btnAdd"
            className="btn btn-primary px-4 fw-semibold"
          >
            Save Category
          </button>
        </form>
      </div>
    </div>
  );
}