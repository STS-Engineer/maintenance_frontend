import { motion } from "framer-motion";
import "./Homepage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Background gradient circles */}
      <div className="background-circles">
        <motion.div
          className="circle circle1"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="circle circle2"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="circle circle3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Welcome text */}
      <motion.div
        className="welcome-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1>👋 Welcome to Maintenance Dashboard</h1>
        <p>You can move to the next form to submit maintenance!</p>
        <motion.a
          href="/maintenance-form"
          className="get-started-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🛠 Next
        </motion.a>
      </motion.div>
    </div>
  );
}
