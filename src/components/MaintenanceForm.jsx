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
        {step === 1 && (
          <div>
            <h2>⚙️ General Maintenance Info</h2>
            <div className="grid">
              <input name="VOH-objective" placeholder="VOH Objective" onChange={handleChange} />
              <input name="Voh-realisé" placeholder="VOH Realisé" onChange={handleChange} />
              <input name="Energy-consumption-objective" placeholder="Energy Objective" onChange={handleChange} />
              <input name="Energy-consumption-realise" placeholder="Energy Realise" onChange={handleChange} />
              <input name="Maintenance-PO-objective" placeholder="PO Objective" onChange={handleChange} />
              <input name="Maintenance-PO-realise" placeholder="PO Realise" onChange={handleChange} />
              <input name="Maintenance-Cost-objective" placeholder="Cost Objective" onChange={handleChange} />
              <input name="Maintenance-Cost-realise" placeholder="Cost Realise" onChange={handleChange} />
            </div>
            <button className="next-btn" onClick={next}>Next ➜</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>📊 Performance & KPI</h2>
            <div className="grid">
              <input name="MTBF-Target" placeholder="MTBF Target" onChange={handleChange} />
              <input name="MTTR-Target" placeholder="MTTR Target" onChange={handleChange} />
              <input name="Availability-objective" placeholder="Availability Objective" onChange={handleChange} />
              <input name="Availability-realise" placeholder="Availability Realise" onChange={handleChange} />
              <input name="Factory-efficiency-objective" placeholder="Efficiency Objective" onChange={handleChange} />
              <input name="Factory-efficiency-realise" placeholder="Efficiency Realise" onChange={handleChange} />
              <input name="spare-parts-PO-objective" placeholder="Spare Parts Objective" onChange={handleChange} />
              <input name="spare-parts-PO-realise" placeholder="Spare Parts Realise" onChange={handleChange} />
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
