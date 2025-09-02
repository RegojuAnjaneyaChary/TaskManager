// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../../App";
// import { toast } from "react-hot-toast";

// const CreateTicket = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [assignTo, setAssignTo] = useState("");
//   const [employeeEmail, setEmployeeEmail] = useState("");

//   // Fetch employees
//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${apiUrl}/ticket/getAllemployeeList`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEmployees(response.data.data || []);
//     } catch (err) {
//       console.error("Error fetching employees:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Failed to fetch employees");
//       toast.error(err.response?.data?.message || "Failed to fetch employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !assignTo) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Not authenticated. Please login again.");
//       return;
//     }

//     try {
//       const payload = { title, description, assignTo };
//       if (employeeEmail.trim() !== "") payload.employeeEmail = employeeEmail;

//       const response = await axios.post(`${apiUrl}/ticket/create`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       toast.success(response.data.message || "Ticket created successfully");

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setAssignTo("");
//       setEmployeeEmail("");
//     } catch (err) {
//       console.error("❌ Error creating ticket:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Failed to create ticket");
//     }
//   };

//   if (loading)
//     return <p className="text-center py-3 text-gray-500 text-sm animate-pulse">Loading employees...</p>;
//   if (error)
//     return <p className="text-red-600 text-center py-3 text-sm">{error}</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-xl">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
//         🎫 Create Ticket
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5 text-sm">
//         {/* Title */}
//         <div>
//           <label className="block font-medium mb-1">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block font-medium mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             rows="4"
//             required
//           />
//         </div>

//         {/* Assign To */}
//         <div>
//           <label className="block font-medium mb-1">Assign To</label>
//           <select
//             value={assignTo}
//             onChange={(e) => setAssignTo(e.target.value)}
//             className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             required
//           >
//             <option value="">Select Employee</option>
//             {employees.map((emp) => (
//               <option key={emp._id} value={emp._id}>
//                 {emp.name} ({emp.email})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Optional Email */}
//         <div>
//           <label className="block font-medium mb-1">Additional Email (optional)</label>
//           <input
//             type="email"
//             value={employeeEmail}
//             onChange={(e) => setEmployeeEmail(e.target.value)}
//             className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             placeholder="someone@example.com"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
//         >
//           Create Ticket
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTicket;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

const CreateTicket = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/ticket/getAllemployeeList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data.data || []);
    } catch (err) {
      console.error("Error fetching employees:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch employees");
      toast.error(err.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !assignTo) {
      toast.error("Please fill all required fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Not authenticated. Please login again.");
      return;
    }

    try {
      const payload = { title, description, assignTo };
      if (employeeEmail.trim() !== "") payload.employeeEmail = employeeEmail;

      const response = await axios.post(`${apiUrl}/ticket/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message || "Ticket created successfully");

      // Reset form
      setTitle("");
      setDescription("");
      setAssignTo("");
      setEmployeeEmail("");
    } catch (err) {
      console.error("❌ Error creating ticket:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to create ticket");
    }
  };

  if (loading)
    return (
      <p className="text-center py-3 text-gray-500 text-sm animate-pulse">
        Loading employees...
      </p>
    );
  if (error)
    return (
      <p className="text-red-600 text-center py-3 text-sm">{error}</p>
    );

  return (
    <div className="flex justify-center items-start p-6 min-h-[80vh] bg-gray-50" >
      <div className="w-full max-w-xl bg-white p-6 md:p-8 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 text-center">
          🎫 Create Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              rows="4"
              required
            />
          </div>

          {/* Assign To */}
          <div>
            <label className="block font-medium mb-1">Assign To</label>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </select>
          </div>

          {/* Optional Email */}
          <div>
            <label className="block font-medium mb-1">Additional Email (optional)</label>
            <input
              type="email"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="someone@example.com"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
