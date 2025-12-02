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
      const res = await fetch("https://maint-back.azurewebsites.net/ajouter/list");
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
      await fetch(`https://maint-back.azurewebsites.net/ajouter/delete/${id}`, { method: "DELETE" });
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
      await fetch(`https://maint-back.azurewebsites.net/ajouter/edit/${currentMaintenance.maintenance_id}`, {
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
        <div className="overflow-x-auto rounded-lg shadow-sm border bg-white p-3">
          <div className="maintenance-table-wrapper">
            <table className="maintenance-table">
              <thead>
                <tr>
                
                  <th>VOH Obj</th>
                  <th>VOH Réalisé</th>
                  <th>Energy Obj</th>
                  <th>Energy Réalisé</th>
                  <th>PO Obj</th>
                  <th>PO Réalisé</th>
                  <th>Préventif Obj</th>
                  <th>Préventif Réalisé</th>
                  <th>Cost Obj</th>
                  <th>Cost Réalisé</th>
                  <th>MTBF Target</th>
                  <th>MTBF Completed</th>
                  <th>MTTR Target</th>
                  <th>MTTR Completed</th>
                  <th>Availability Obj</th>
                  <th>Availability Réalisé</th>
                  <th>Total Hours Lost Obj</th>
                  <th>Total Hours Lost Réalisé</th>
                  <th>Factory Eff Obj</th>
                  <th>Factory Eff Réalisé</th>
                  <th>Spare PO Obj</th>
                  <th>Spare PO Réalisé</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {maintenances.map((m) => (
                  <tr key={m.maintenance_id}>
                
                    <td>{m["VOH-objective"]}</td>
                    <td>{m["Voh-realise"]}</td>
                    <td>{m["Energy-consumption-objective"]}</td>
                    <td>{m["Energy-consumption-realise"]}</td>
                    <td>{m["Maintenance-PO-objective"]}</td>
                    <td>{m["Maintenance-PO-realise"]}</td>
                    <td>{m["Prenventif-Real-objective"]}</td>
                    <td>{m["Prenventif-Real-realise"]}</td>
                    <td>{m["Maintenance-Cost-objective"]}</td>
                    <td>{m["Maintenance-Cost-realise"]}</td>
                    <td>{m["MTBF-Target"]}</td>
                    <td>{m["MTBF-Completed"]}</td>
                    <td>{m["MTTR-Target"]}</td>
                    <td>{m["MTTR-Completed"]}</td>
                    <td>{m["Availability-objective"]}</td>
                    <td>{m["Availability-realise"]}</td>
                    <td>{m["Total-hours-lost-Target"]}</td>
                    <td>{m["Total-hours-lost-completed"]}</td>
                    <td>{m["Factory-efficiency-objective"]}</td>
                    <td>{m["Factory-efficiency-realise"]}</td>
                    <td>{m["spare-parts-PO-objective"]}</td>
                    <td>{m["spare-parts-PO-realise"]}</td>
                    <td>{m["Status"]}</td>
                    <td>{m["created-date"]}</td>
                    <td>
                      <button className="edit-btn" onClick={() => openEditModal(m)}>✏️ Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(m.maintenance_id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      )}

      {/* ----------------- Modal ----------------- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <h3>Edit Maintenance #{currentMaintenance.maintenance_id}</h3>

            {/* --------------------------------- STEP 1 --------------------------------- */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>

                <label>VOH Objective</label>
                <input name="VOH-objective" value={currentMaintenance["VOH-objective"] || ""} onChange={handleModalChange} />

                <label>VOH Réalisé</label>
                <input name="Voh-realise" value={currentMaintenance["Voh-realise"] || ""} onChange={handleModalChange} />

                <label>Energy Objective</label>
                <input name="Energy-consumption-objective" value={currentMaintenance["Energy-consumption-objective"] || ""} onChange={handleModalChange} />

                <label>Energy Réalisé</label>
                <input name="Energy-consumption-realise" value={currentMaintenance["Energy-consumption-realise"] || ""} onChange={handleModalChange} />

                <label>Maintenance PO Objective</label>
                <input name="Maintenance-PO-objective" value={currentMaintenance["Maintenance-PO-objective"] || ""} onChange={handleModalChange} />

                <label>Maintenance PO Réalisé</label>
                <input name="Maintenance-PO-realise" value={currentMaintenance["Maintenance-PO-realise"] || ""} onChange={handleModalChange} />

                <label>Préventif Objective</label>
                <input name="Prenventif-Real-objective" value={currentMaintenance["Prenventif-Real-objective"] || ""} onChange={handleModalChange} />

                <label>Préventif Réalisé</label>
                <input name="Prenventif-Real-realise" value={currentMaintenance["Prenventif-Real-realise"] || ""} onChange={handleModalChange} />

                <label>Maintenance Cost Objective</label>
                <input name="Maintenance-Cost-objective" value={currentMaintenance["Maintenance-Cost-objective"] || ""} onChange={handleModalChange} />

                <label>Maintenance Cost Réalisé</label>
                <input name="Maintenance-Cost-realise" value={currentMaintenance["Maintenance-Cost-realise"] || ""} onChange={handleModalChange} />

                <div className="modal-actions">
                  <button type="button" className="back-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button className="submit-btn">Next ➜</button>
                </div>

              </form>
            )}

            {/* --------------------------------- STEP 2 --------------------------------- */}
            {step === 2 && (
              <form onSubmit={handleModalSubmit}>

                <label>MTBF Target</label>
                <input name="MTBF-Target" value={currentMaintenance["MTBF-Target"] || ""} onChange={handleModalChange} />

                <label>MTBF Completed</label>
                <input name="MTBF-Completed" value={currentMaintenance["MTBF-Completed"] || ""} onChange={handleModalChange} />

                <label>MTTR Target</label>
                <input name="MTTR-Target" value={currentMaintenance["MTTR-Target"] || ""} onChange={handleModalChange} />

                <label>MTTR Completed</label>
                <input name="MTTR-Completed" value={currentMaintenance["MTTR-Completed"] || ""} onChange={handleModalChange} />

                <label>Availability Objective</label>
                <input name="Availability-objective" value={currentMaintenance["Availability-objective"] || ""} onChange={handleModalChange} />

                <label>Availability Réalisé</label>
                <input name="Availability-realise" value={currentMaintenance["Availability-realise"] || ""} onChange={handleModalChange} />

                <label>Total Hours Lost Target</label>
                <input name="Total-hours-lost-Target" value={currentMaintenance["Total-hours-lost-Target"] || ""} onChange={handleModalChange} />

                <label>Total Hours Lost Completed</label>
                <input name="Total-hours-lost-completed" value={currentMaintenance["Total-hours-lost-completed"] || ""} onChange={handleModalChange} />

                <label>Factory Efficiency Objective</label>
                <input name="Factory-efficiency-objective" value={currentMaintenance["Factory-efficiency-objective"] || ""} onChange={handleModalChange} />

                <label>Factory Efficiency Réalisé</label>
                <input name="Factory-efficiency-realise" value={currentMaintenance["Factory-efficiency-realise"] || ""} onChange={handleModalChange} />

                <label>Spare Parts PO Objective</label>
                <input name="spare-parts-PO-objective" value={currentMaintenance["spare-parts-PO-objective"] || ""} onChange={handleModalChange} />

                <label>Spare Parts PO Réalisé</label>
                <input name="spare-parts-PO-realise" value={currentMaintenance["spare-parts-PO-realise"] || ""} onChange={handleModalChange} />

                <label>Status</label>
                <input name="Status" value={currentMaintenance["Status"] || ""} onChange={handleModalChange} />

                <label>Created Date</label>
                <input
                  type="datetime-local"
                  name="created-date"
                  value={currentMaintenance["created-date"]?.slice(0, 16) || ""}
                  onChange={handleModalChange}
                />

                <div className="modal-actions">
                  <button type="button" className="back-btn" onClick={() => setStep(1)}>⬅ Back</button>
                  <button type="submit" className="submit-btn">Save</button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}


    </div>
  );
}
