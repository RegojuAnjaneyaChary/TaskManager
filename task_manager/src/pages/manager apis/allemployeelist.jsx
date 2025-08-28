// import React, { useEffect, useState } from "react";
//  import { apiUrl } from "../../App";
// const AllemployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/ticket/getAllemployeeList`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // if token needed
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch employees");
//         }

//         const result = await response.json();
//         setEmployees(result.data); // result.data contains your array of employees
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   if (loading) return <p className="text-center">Loading employees...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Employee List</h2>
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border-b">ID</th>
//             <th className="py-2 px-4 border-b">Name</th>
//             <th className="py-2 px-4 border-b">Username</th>
//             <th className="py-2 px-4 border-b">Role</th>
//           </tr>
//         </thead>
//         <tbody>

//           {employees.map((emp) => (
//             <tr key={emp.id} className="text-center border-b">
//               <td className="py-2 px-4">{emp._id}</td>
//               <td className="py-2 px-4">{emp.name}</td>
//               <td className="py-2 px-4">{emp.username}</td>
//               <td className="py-2 px-4">{emp.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllemployeeList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

const AllemployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/ticket/getAllemployeeList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEmployees(response.data.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.response?.data?.message || "Failed to fetch employees");
      toast.error(err.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔹 Delete Employee
  const handleDelete = async (employeeID) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response = await axios.delete(`${apiUrl}/ticket/delete/${employeeID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update state after deletion
      setEmployees((prev) => prev.filter((emp) => emp._id !== employeeID));

      toast.success(response.data.message || "Employee deleted successfully");
    } catch (err) {
      console.error("Error deleting employee:", err);
      toast.error(err.response?.data?.message || "Failed to delete employee");
    }
  };

  if (loading) return <p className="text-center">Loading employees...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Serial No.</th>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            {/* <th className="py-2 px-4 border-b">Username</th> */}
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id} className="text-center border-b">
              <td className="py-2 px-4">{index + 1}</td> {/* Serial Number */}
              <td className="py-2 px-4">{emp._id}</td>
              <td className="py-2 px-4">{emp.name}</td>
              {/* <td className="py-2 px-4">{emp.username}</td> */}
              <td className="py-2 px-4">{emp.role}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllemployeeList;
