import { useState } from "react";
import Swal from "sweetalert2";

function useProfile() {
  const [ProfileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...ProfileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ProfileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Profile update failed");
      }

      localStorage.setItem("ProfileData", JSON.stringify(data));

      Swal.fire({
        icon: "success",
        title: '<span style="color: black;">Profile Updated Successfully</span>',
        showConfirmButton: true,
        iconColor: "green",
        background: `#fff`,
      });

    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: '<span style="color: black;">Update Failed</span>',
        html: `<span style="color: red;">${error.message}</span>`,
        iconColor: "red",
        background: `#fff`,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    ProfileData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}

export default useProfile;
