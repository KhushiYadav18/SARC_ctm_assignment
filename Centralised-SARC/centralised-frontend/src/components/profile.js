import React from "react";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { ProfileData, handleChange, handleSubmit, loading } = useProfile();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {Object.keys(ProfileData).map((field) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field === "gender" ? (
              <select
                name="gender"
                value={ProfileData.gender}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                value={ProfileData[field]}
                onChange={handleChange}
                style={styles.input}
                required
              />
            )}
          </div>
        ))}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Profile;
