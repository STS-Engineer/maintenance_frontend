import React, { useEffect, useState } from "react";
import "./MaintenanceList.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MaintenanceList() {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMaintenance, setCurrentMaintenance] = useState({});

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const res = await fetch("http://localhost:4000/ajouter/list");
      const data = await res.json();
      setMaintenances(data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch maintenance list!", { position: "bottom-right" });
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await fetch(`http://localhost:4000/ajouter/delete/${id}`, { method: "DELETE" });
      toast.success("Maintenance deleted successfully!", { position: "bottom-right" });
      fetchMaintenances();
    } catch (err) {
      toast.error("Failed to delete maintenance!", { position: "bottom-right" });
    }
  };

  const openEditModal = (maintenance) => {
    setCurrentMaintenance(maintenance);
    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    setCurrentMaintenance({ ...currentMaintenance, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/ajouter/edit/${currentMaintenance.maintenance_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentMaintenance),
      });
      toast.success("Maintenance updated successfully!", { position: "bottom-right" });
      setIsModalOpen(false);
      fetchMaintenances();
    } catch (err) {
      toast.error("Failed to update maintenance!", { position: "bottom-right" });
    }
  };

  return (
    <div className="maintenance-list-container">
      <ToastContainer />
      <h2>🛠 Maintenance Records</h2>
      {loading ? (
        <p>Loading...</p>
      ) : maintenances.length === 0 ? (
        <p>No maintenance records found.</p>
      ) : (
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>VOH Objective</th>
              <th>VOH Realisé</th>
              <th>Energy Objective</th>
              <th>Energy Realise</th>
              <th>Maintenance Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((m) => (
              <tr key={m.maintenance_id}>
                <td>{m.maintenance_id}</td>
                <td>{m["VOH-objective"]}</td>
                <td>{m["Voh-realisé"]}</td>
                <td>{m["Energy-consumption-objective"]}</td>
                <td>{m["Energy-consumption-realise"]}</td>
                <td>{m["Maintenance-Cost-realise"]}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(m)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(m.maintenance_id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ----------------- Modal ----------------- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Maintenance #{currentMaintenance.maintenance_id}</h3>
            <form onSubmit={handleModalSubmit}>
              <label>VOH Objective</label>
              <input
                name="VOH-objective"
                value={currentMaintenance["VOH-objective"] || ""}
                onChange={handleModalChange}
              />
              <label>VOH Realisé</label>
              <input
                name="Voh-realisé"
                value={currentMaintenance["Voh-realisé"] || ""}
                onChange={handleModalChange}
              />
              <label>Energy Objective</label>
              <input
                name="Energy-consumption-objective"
                value={currentMaintenance["Energy-consumption-objective"] || ""}
                onChange={handleModalChange}
              />
              <label>Energy Realise</label>
              <input
                name="Energy-consumption-realise"
                value={currentMaintenance["Energy-consumption-realise"] || ""}
                onChange={handleModalChange}
              />

              <div className="modal-actions">
                <button type="button" className="back-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
