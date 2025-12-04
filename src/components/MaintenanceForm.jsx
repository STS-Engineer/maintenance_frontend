import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./maintenanceForm.css";

export default function MaintenanceForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

 const submitForm = async () => {
  try {
    // Auto-convert numeric strings to numbers
    const payload = Object.fromEntries(
      Object.entries(form).map(([key, value]) => {
        return [key, isNaN(value) ? value : Number(value)];
      })
    );

    const res = await fetch("https://maint-back.azurewebsites.net/ajouter/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Submit failed");

    toast.success("✅ Maintenance added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      style: { marginTop: "100px" },
    });

    setForm({});
    setStep(1);
  } catch (err) {
    toast.error("❌ Error submitting form", { position: "top-right" });
    console.error(err);
  }
};


  return (
    <div className="form-container">
      <ToastContainer />
          <motion.div
        key={step}
        className="form-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* ---------------- STEP 1 ---------------- */}
        {step === 1 && (
          <div>
            <h2>⚙️ General Maintenance Info</h2>
            <div className="grid">

              <input name="VOH-objective" placeholder="VOH Objective" onChange={handleChange} />
              <input name="Voh-realise" placeholder="VOH Réalisé" onChange={handleChange} />

              <input name="Energy-consumption-objective" placeholder="Energy Objective" onChange={handleChange} />
              <input name="Energy-consumption-realise" placeholder="Energy Réalisé" onChange={handleChange} />

              <input name="Maintenance-PO-objective" placeholder="Maintenance PO Objective" onChange={handleChange} />
              <input name="Maintenance-PO-realise" placeholder="Maintenance PO Réalisé" onChange={handleChange} />

              <input name="Prenventif-Real-objective" placeholder="Préventif Réal Objective" onChange={handleChange} />
              <input name="Prenventif-Real-realise" placeholder="Préventif Réalisé" onChange={handleChange} />

              <input name="Maintenance-Cost-objective" placeholder="Maintenance Cost Objective" onChange={handleChange} />
              <input name="Maintenance-Cost-realise" placeholder="Maintenance Cost Réalisé" onChange={handleChange} />

            </div>
            <button className="next-btn" onClick={next}>Next ➜</button>
          </div>
        )}

        {/* ---------------- STEP 2 ---------------- */}
        {step === 2 && (
          <div>
            <h2>📊 Performance & KPI</h2>
            <div className="grid">

              <input name="MTBF-Target" placeholder="MTBF Target" onChange={handleChange} />
              <input name="MTBF-Completed" placeholder="MTBF Completed" onChange={handleChange} />

              <input name="MTTR-Target" placeholder="MTTR Target" onChange={handleChange} />
              <input name="MTTR-Completed" placeholder="MTTR Completed" onChange={handleChange} />

              <input name="Availability-objective" placeholder="Availability Objective" onChange={handleChange} />
              <input name="Availability-realise" placeholder="Availability Réalisé" onChange={handleChange} />

              <input name="Total-hours-lost-Target" placeholder="Hours Lost Target" onChange={handleChange} />
              <input name="Total-hours-lost-completed" placeholder="Hours Lost Completed" onChange={handleChange} />

              <input name="Factory-efficiency-objective" placeholder="Factory Efficiency Objective" onChange={handleChange} />
              <input name="Factory-efficiency-realise" placeholder="Factory Efficiency Réalisé" onChange={handleChange} />

              <input name="spare-parts-stock-objective" placeholder="Spare Parts PO Objective" onChange={handleChange} />
              <input name="spare-parts-stock-realise" placeholder="Spare Parts PO Réalisé" onChange={handleChange} />

              <input name="Status" placeholder="Status (ex: Completed / Pending)" onChange={handleChange} />

              <input
                type="datetime-local"
                name="created-date"
                placeholder="Created Date"
                onChange={handleChange}
              />

            </div>

            <div className="actions">
              <button className="back-btn" onClick={prev}>⬅ Back</button>
              <button className="submit-btn" onClick={submitForm}>Submit ✔</button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
