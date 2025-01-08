import React from "react";
import { AlertCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorNotification = ({ message = "Data not Found" }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.notification}>
        <AlertCircle className="icon" />
        <p style={styles.message}>{message}</p>
        <button onClick={() => navigate(-1)} style={styles.closeButton}>
          <X className="icon" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "16px",
    left: "16px",
    maxWidth: "320px",
    animation: "slide-up 0.3s ease-out",
  },
  notification: {
    backgroundColor: "#fef2f2",
    borderLeft: "4px solid #f87171",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px 0 0 8px",
  },
  message: {
    fontSize: "14px",
    color: "#b91c1c",
    flex: 1,
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#f87171",
    cursor: "pointer",
    padding: "0",
  },
  icon: {
    height: "20px",
    width: "20px",
    marginRight: "12px",
  },
};

export default ErrorNotification;
