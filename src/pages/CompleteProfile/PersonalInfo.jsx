

const PersonalInfo = ({ register, errors }) => (
  <div className="text-sm">
    <h1 className="text-[#4B1E2F] text-md font-semibold mb-4">Personal Information</h1>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm">First Name</label>
        <input
          {...register("firstName", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2 outline-none"
          placeholder="Enter your first name"
        />
        {errors?.firstName && <p className="text-red-500 text-sm">Required</p>}
      </div>
      <div>
        <label className="text-sm">Last Name</label>
        <input
          {...register("lastName", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2 outline-none"
          placeholder="Enter your last name"
        />
        {errors?.lastName && <p className="text-red-500 text-sm">Required</p>}
      </div>
      <div>
        <label className="text-sm">Date of Birth</label>
        <input
          {...register("dob", { required: true })}
          type="date"
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2 outline-none"
        />
        {errors?.dob && <p className="text-red-500 text-sm">Required</p>}
      </div>
      <div>
        <label className="text-sm">Gender</label>
        <select
          {...register("gender", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2 outline-none"
        >
          <option value="">Select</option>
          <option>male</option>
          <option>female</option>
          <option>other</option>
        </select>
        {errors?.gender && <p className="text-red-500 text-sm">Required</p>}
      </div>
    </div>
  </div>
);

export default PersonalInfo;
