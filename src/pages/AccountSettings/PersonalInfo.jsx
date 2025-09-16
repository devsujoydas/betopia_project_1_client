import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../utils/api";

const PersonalInfo = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.personalInfo?.firstName || "",
    lastName: user?.personalInfo?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.contactInfo?.address || "",
    city: user?.contactInfo?.city || "",
    state: user?.contactInfo?.state || "",
    zipCode: user?.contactInfo?.zipCode || "",
  });

  const handleUpdateProfile = async () => {
    try {
      const payload = {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        contactInfo: {
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      };

      await api.put("/users/update-profile", payload);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center rounded-t-lg p-6 bg-[#F5F5F5]">
        <h3 className="font-semibold text-lg">Personal Information</h3>
        <button
          onClick={() => setEditing(!editing)}
          className="text-sm hover:underline transition-all cursor-pointer"
        >
          {editing ? "Cancel" : "Update Profile"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
         
          {[
            { label: "First Name", key: "firstName" },
            { label: "Last Name", key: "lastName" },
            { label: "Phone Number", key: "phone", span: "md:col-span-2" },
            { label: "Street Address", key: "address", span: "md:col-span-2" },
          ].map((f) => (
            <div key={f.key} className={f.span || ""}>
              <label className="font-light text-[#4B1E2F]">{f.label}</label>
              <input
                type="text"
                value={formData[f.key]}
                onChange={(e) =>
                  setFormData({ ...formData, [f?.key]: e.target.value })
                }
                disabled={!editing}
                className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
              />
            </div>
          ))}

          <div className="grid grid-cols-3 gap-3 col-span-full">
            {["city", "state", "zipCode"].map((key) => (
              <div key={key}>
                <label className="font-light text-[#4B1E2F]">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  disabled={!editing}
                  className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
                />
              </div>
            ))}
          </div>
        </div>

        {editing && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleUpdateProfile}
              className="btn-primary"
            >
              Update Now
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default PersonalInfo;
