import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";

export default function ViewAssignedTickets() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${apiUrl}/employee/viewAssignedTickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.allTickets && response.data.allTickets.length > 0) {
          setTasks(response.data.allTickets);
          setMessage(response.data.message);
        } else {
          setMessage("No tasks found");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setMessage("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTasks();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Assigned Tasks
      </h2>

      {message && (
        <p className="text-center text-red-500 font-medium mb-4">{message}</p>
      )}

      {tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Task ID</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Title</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Description</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Created By</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{task._id}</td>
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.description}</td>
                  <td className="px-4 py-2">
                    {task.createdBy?.name || task.createdBy || "N/A"}
                  </td>
                  <td className="px-4 py-2">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No assigned tasks found.</p>
      )}
    </div>
  );
}
