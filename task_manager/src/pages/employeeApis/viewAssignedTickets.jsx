// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../../App";
// import { toast } from "react-hot-toast";

// export default function ViewAssignedTickets() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAssignedTasks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${apiUrl}/employee/viewAssignedTickets`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.allTickets?.length > 0) {
//           setTasks(response.data.allTickets);
//           toast.success(response.data.message || "Assigned tickets loaded");
//         } else {
//           toast.error("No tasks found");
//         }
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         toast.error("Error fetching tasks");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignedTasks();
//   }, []);

//   if (loading)
//     return (
//       <p className="text-center text-gray-500 mt-6 text-lg font-medium">
//         Loading...
//       </p>
//     );

//   return (
//     <div className="mt-16 max-w-7xl mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Assigned Tasks
//       </h2>

//       {tasks.length > 0 ? (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">Task ID</th>
//                   <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">Title</th>
//                   <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">Description</th>
//                   <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">Created At</th>
//                   <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {tasks.map((task, index) => (
//                   <tr
//                     key={task._id}
//                     className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors`}
//                   >
//                     <td className="px-6 py-4 text-gray-800">{task._id}</td>
//                     <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
//                     <td className="px-6 py-4 text-gray-700">{task.description || "N/A"}</td>
//                     <td className="px-6 py-4 text-gray-700">{new Date(task.createdAt).toLocaleString()}</td>
//                     <td
//                       className={`px-6 py-4 font-semibold ${
//                         task.status === "Completed"
//                           ? "text-green-600"
//                           : task.status === "Inprogress"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {task.status}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden space-y-4">
//             {tasks.map((task) => (
//               <div key={task._id} className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50">
//                 <p className="font-semibold text-gray-800">{task.title}</p>
//                 <p className="text-gray-700 text-sm mt-1">
//                   <span className="font-semibold">Description:</span> {task.description || "N/A"}
//                 </p>
//                 <p className="text-gray-600 text-xs mt-1">
//                   <span className="font-semibold">Created At:</span> {new Date(task.createdAt).toLocaleString()}
//                 </p>
//                 <p
//                   className={`mt-1 font-bold ${
//                     task.status === "Completed"
//                       ? "text-green-600"
//                       : task.status === "Inprogress"
//                       ? "text-yellow-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {task.status}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <p className="text-center text-gray-500 mt-4 text-lg">No assigned tasks found.</p>
//       )}
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

export default function ViewAssignedTickets() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}/employee/viewAssignedTickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.allTickets?.length > 0) {
          setTasks(response.data.allTickets);
          toast.success(response.data.message || "Assigned tickets loaded");
        } else {
          toast.error("No tasks found");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTasks();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-6 text-lg font-medium">
        Loading...
      </p>
    );

  return (
    <div className="mt-16 max-w-7xl mx-auto p-6 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Assigned Tasks
      </h2>

      {tasks.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">
                    Task ID
                  </th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.map((task, index) => (
                  <tr
                    key={task._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-gray-800">{task._id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 text-gray-700">{task.description || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(task.createdAt).toLocaleString()}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        task.status === "Completed"
                          ? "text-green-600"
                          : task.status === "Inprogress"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {task.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 overflow-hidden">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50 overflow-hidden"
              >
                <p className="font-semibold text-gray-800">{task.title}</p>
                <p className="text-gray-700 text-sm mt-1">
                  <span className="font-semibold">Description:</span> {task.description || "N/A"}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  <span className="font-semibold">Created At:</span>{" "}
                  {new Date(task.createdAt).toLocaleString()}
                </p>
                <p
                  className={`mt-1 font-bold ${
                    task.status === "Completed"
                      ? "text-green-600"
                      : task.status === "Inprogress"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {task.status}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4 text-lg">No assigned tasks found.</p>
      )}
    </div>
  );
}
