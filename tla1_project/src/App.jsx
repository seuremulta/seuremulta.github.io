import { useState, useEffect } from 'react';
import IncomeForm from './components/IncomeForm';
import IncomeList from './components/IncomeList';

export default function App() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('income_categories');
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem('income_categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const handleExportCSV = () => {
    if (categories.length === 0) {
      alert("No data to export!");
      return;
    }
    const headers = "Category Name,Description,Amount\n";
    const rows = categories
      .map((item) => `"${item.name}","${item.desc}",${item.amount}`)
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "income_categories.csv";
    a.click();
  };

  return (
    <div className="bg-light py-5 min-vh-100">
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <IncomeForm onAddCategory={handleAddCategory} />
            <IncomeList
              categories={categories}
              onDeleteCategory={handleDeleteCategory}
              onExportCSV={handleExportCSV}
            />
          </div>
        </div>
      </main>
    </div>
  );
}