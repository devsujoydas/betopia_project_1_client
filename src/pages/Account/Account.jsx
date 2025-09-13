import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthProvider/authProvider";
import { Lock, Eye, EyeOff, User, LockIcon, LogOut } from "lucide-react";
import api from "../../utils/api";

const Account = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [editing, setEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.personalInfo.firstName || "",
    lastName: user?.personalInfo.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.contactInfo.address || "",
    city: user?.contactInfo.city || "",
    state: user?.contactInfo.state || "",
    zipCode: user?.contactInfo.zipCode || "",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }

  // Update Profile
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
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  // Change Password
  const onSubmitPassword = async (data) => {
    try {
      await api.post("/auth/change-password", {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      alert("Password updated successfully!");
      reset();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* Left Sidebar */}
      <div className="md:w-4/12 h-fit bg-white rounded-lg shadow flex flex-col items-center space-y-4">
        <div className="flex w-full items-center gap-4 px-6">
          <div>
            <img
              src={"/default.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-2xl mb-1">
              {user?.personalInfo.firstName} {user?.personalInfo.lastName}
            </h2>
            <p className="text-sm text-zinc-500">{user?.email}</p>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-2 p-6 border-t border-zinc-200">
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-3 rounded-md text-left flex items-center gap-2 border-2 cursor-pointer transition-all ${
              activeTab === "personal"
                ? "bg-[#EDE9EA] border-[#bebebe]"
                : "hover:bg-zinc-100 border-transparent"
            }`}
          >
            <User /> Personal Information
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-3 rounded-md text-left flex items-center gap-2 border-2 cursor-pointer transition-all ${
              activeTab === "security"
                ? "bg-[#EDE9EA] border-[#bebebe]"
                : "hover:bg-zinc-100 border-transparent"
            }`}
          >
            <LockIcon /> Security
          </button>
          <button
            onClick={() => setActiveTab("loan")}
            className={`px-4 py-3 rounded-md text-left flex items-center gap-2 border-2 cursor-pointer transition-all ${
              activeTab === "loan"
                ? "bg-[#EDE9EA] border-[#bebebe]"
                : "hover:bg-zinc-100 border-transparent"
            }`}
          >
            Loan Status
          </button>

          <hr className="text-zinc-200" />

          <button
            onClick={handleSignOut}
            className="px-4 py-3 rounded text-left text-red-500 hover:bg-red-100 flex items-center gap-2 cursor-pointer transition-all"
          >
            <LogOut /> Sign Out
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:w-8/12 bg-white  shadow-md flex flex-col gap-4 border border-zinc-200 rounded-lg">
        {/* Personal Info Tab */}
        {activeTab === "personal" && (
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

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-light text-[#4B1E2F]">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    disabled={!editing}
                    className="w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2"
                  />
                </div>

                <div>
                  <label className="font-light text-[#4B1E2F]">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    disabled={!editing}
                    className="w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-light text-[#4B1E2F]">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={!editing}
                    className="w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-light text-[#4B1E2F]">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    disabled={!editing}
                    className="w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 col-span-full">
                  <div>
                    <label className="font-light text-[#4B1E2F]">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      disabled={!editing}
                      className="w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2"
                    />
                  </div>

                  <div>
                    <label className="font-light text-[#4B1E2F]">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      disabled={!editing}
                      className="w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2"
                    />
                  </div>

                  <div>
                    <label className="font-light text-[#4B1E2F]">ZIP Code</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      disabled={!editing}
                      className="w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2"
                    />
                  </div>
                </div>
              </div>

              {editing && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleUpdateProfile}
                    className="bg-[#4B1E2F] text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#4B1E2F] border border-transparent hover:border-black transition-all duration-300 cursor-pointer"
                  >
                    Update Now
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <form
            onSubmit={handleSubmit(onSubmitPassword)}
            className="flex flex-col gap-4"
          >
            <div className="bg-[#F5F5F5] px-5 py-6">
              <h3 className="font-semibold text-lg">Security Settings</h3>
            </div>
            <div className="px-5 pt-5 grid gap-5 text-[14px]">
              <div>
                <label className="text-[#4B1E2F] mb-1 block font-medium">
                  Current Password
                </label>
                <div className="flex items-center gap-2 w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2">
                  <Lock className="text-zinc-400 w-5" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    {...register("currentPassword", {
                      required: "Current password is required",
                    })}
                    className="w-full outline-none"
                  />
                  <span
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="cursor-pointer"
                  >
                    {showCurrentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </span>
                </div>
                {errors.currentPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[#4B1E2F] mb-1 block font-medium">
                  New Password
                </label>
                <div className="flex items-center gap-2 w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2">
                  <Lock className="text-zinc-400 w-5" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                    className="w-full outline-none"
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="cursor-pointer"
                  >
                    {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </span>
                </div>
                {errors.newPassword && (
                  <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="text-[#4B1E2F] mb-1 block font-medium">
                  Confirm Password
                </label>
                <div className="flex items-center gap-2 w-full border-2 border-zinc-300 rounded-md outline-none font-medium p-3.5 mt-2">
                  <Lock className="text-zinc-400 w-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) => value === newPassword || "Passwords do not match",
                    })}
                    className="w-full outline-none"
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center pb-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4B1E2F] text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#4B1E2F] border border-transparent hover:border-black transition-all duration-300 cursor-pointer"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}

        {/* Loan Tab */}
        {activeTab === "loan" && (
          <div className="p-6">
            <h3 className="font-semibold text-lg">Loan Status</h3>
            <p>Loan status details will go here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
