import React, { useState } from "react";

const EditMemberPage = () => {
    const member = {
        name: "Avinash Khanduri",
        email: "avinash@example.com",
        role: "Frontend Developer",
        task: "Create UI for edit page",
        deadline: "2025-07-01",
        position: "Member",
        description: "Design and implement the editable member UI",
    };

    const [formData, setFormData] = useState({
        role: member.role,
        task: member.task,
        deadline: member.deadline,
        position: member.position || "Member",
        description: member.description || "",
        status: member.status || "Not Started",
        priority: member.priority || "Medium",
        availability: member.availability || "Full-time",
        contribution: member.contribution || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Member:", formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 ">
            <div className=" shadow-4xl rounded-2xl p-8 w-full  shadow-2xl bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur-lg">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">🛠️ Edit Team Member</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-white mb-1">👤 Name</label>
                        <input
                            type="text"
                            value={member.name}
                            readOnly
                            className="w-full bg-white/10 text-white border border-white/30 rounded px-4 py-2 cursor-not-allowed"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-white mb-1">📧 Email</label>
                        <input
                            type="email"
                            value={member.email}
                            readOnly
                            className="w-full bg-white/10 text-white border border-white/30 rounded px-4 py-2 cursor-not-allowed"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-white mb-1">💼 Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full bg-slate-800/60 text-white border border-blue-400 rounded px-4 py-2 placeholder-white/60 focus:outline-none focus:ring focus:ring-blue-500 shadow-md shadow-blue-500/10"
                        />
                    </div>

                    {/* Task */}
                    <div>
                        <label className="block text-white mb-1">📝 Task</label>
                        <input
                            type="text"
                            name="task"
                            value={formData.task}
                            onChange={handleChange}
                            className="w-full bg-slate-800/60 text-white border border-blue-400 rounded px-4 py-2 placeholder-white/60 focus:outline-none focus:ring focus:ring-blue-500 shadow-md shadow-blue-500/10"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-white mb-1">🧾 Task Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-slate-800/60 text-white border border-blue-400 rounded px-4 py-2 placeholder-white/60 focus:outline-none focus:ring focus:ring-blue-500 shadow-md shadow-blue-500/10"
                        ></textarea>
                    </div>

                    {/* Task Priority */}
                    <div>
                        <label className="block text-white mb-1">⚡ Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full bg-slate-800/60 text-white border border-yellow-400 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-500"
                        >
                            <option value="Low">🟢 Low</option>
                            <option value="Medium">🟡 Medium</option>
                            <option value="High">🔴 High</option>
                            <option value="Critical">🚨 Critical</option>
                        </select>
                    </div>


                    {/* Deadline */}
                    <div>
                        <label className="block text-white mb-1">📅 Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full bg-slate-800/60 text-white border border-blue-400 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 shadow-md shadow-blue-500/10"
                        />
                    </div>

                    {/* Position */}
                    <div>
                        <label className="block text-white mb-1">📌 Position</label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full bg-slate-800/60 text-white border border-blue-400 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 shadow-md shadow-blue-500/10"
                        >
                            <option value="Leader">👑 Leader</option>
                            <option value="Co-Leader">🤝 Co-Leader</option>
                            <option value="Member">🧑‍💻 Member</option>
                        </select>
                    </div>

                    {/* Member Availability */}
                    <div>
                        <label className="block text-white mb-1">📆 Availability</label>
                        <select
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            className="w-full bg-slate-800/60 text-white border border-purple-400 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-purple-500"
                        >
                            <option value="Full-time">🕘 Full-time</option>
                            <option value="Part-time">🕓 Part-time</option>
                            <option value="Unavailable">🚫 Unavailable</option>
                        </select>
                    </div>
                    {/* Skill Tags */}
                    <div>
                        <label className="block text-white mb-1">🏷️ Skill Tags</label>
                        <input
                            type="text"
                            name="skillTags"
                            value={formData.skillTags}
                            onChange={handleChange}
                            placeholder="e.g. React, UI, Testing"
                            className="w-full bg-slate-800/60 text-white border border-blue-400 rounded px-4 py-2 placeholder-white/50 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>



                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row-reverse sm:justify-between pt-6 gap-3">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 border-2 border-green-500 text-green-200 rounded hover:bg-green-600 hover:text-white transition duration-200"
                        >
                            ✅ Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-6 py-2 border-2 border-red-400 text-red-200 rounded hover:bg-red-600 hover:text-white transition duration-200"
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMemberPage;
