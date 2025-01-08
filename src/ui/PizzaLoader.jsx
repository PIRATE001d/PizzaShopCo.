import React from "react";

const PizzaLoader = () => {
  return (

    
    <div style={styles.container} className="absolute bg-slate-500/30 backdrop-blur-sm inset-0 ">
      {/* Pizza Container */}
      <div style={styles.pizzaContainer}>
        {/* Pizza Base */}
        <div style={styles.pizzaBase}>
          {/* Pepperoni Slices */}
          <div style={{ ...styles.pepperoni, top: "16px", left: "16px" }} />
          <div style={{ ...styles.pepperoni, top: "32px", right: "32px" }} />
          <div style={{ ...styles.pepperoni, bottom: "24px", left: "48px" }} />
          <div style={{ ...styles.pepperoni, top: "56px", left: "56px" }} />
          <div style={{ ...styles.pepperoni, bottom: "16px", right: "16px" }} />

          {/* Pizza Slices */}
          <div style={{ ...styles.slice, transform: "rotate(45deg)" }} />
          <div style={{ ...styles.slice, transform: "rotate(90deg)" }} />
          <div style={{ ...styles.slice, transform: "rotate(135deg)" }} />
        </div>
      </div>

      {/* Loading Text */}
      <div style={styles.textContainer}>
        <h3 style={styles.heading}>Loading...</h3>
        <p style={styles.subtext}>Preparing something delicious!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px",
    gap: "16px",
  },
  pizzaContainer: {
    position: "relative",
    width: "128px",
    height: "128px",
    animation: "spin 2s linear infinite",
  },
  pizzaBase: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    backgroundColor: "#F7E3A1",
    border: "4px solid #F97316",
  },
  pepperoni: {
    position: "absolute",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#F87171",
  },
  slice: {
    position: "absolute",
    inset: 0,
    borderTop: "4px solid #F97316",
  },
  textContainer: {
    textAlign: "center",
    gap: "8px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#F97316",
  },
  subtext: {
    fontSize: "12px",
    color: "#4B5563",
  },
};

export default PizzaLoader;
