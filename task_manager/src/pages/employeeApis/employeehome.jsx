import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

export default function Employeehome() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${apiUrl}/employee/viewAssignedTickets`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.allTickets?.length > 0) {
        setTasks(response.data.allTickets);
      } else {
        setTasks([]);
        toast.error("No tasks found");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  return (
    <div className="mt-10 px-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Employee Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Assigned Tickets Count */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Assigned Tickets Count
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <p className="text-6xl font-extrabold text-indigo-600">
              {tasks.length}
            </p>
          )}
        </div>

        {/* Right: Ticket Status List */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tickets & Status
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : tasks.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase text-sm">
                        Title
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
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {task.title}
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

              {/* Mobile Card View */}
              <div className="space-y-4 md:hidden">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
                  >
                    <p className="mt-2 text-base font-semibold text-gray-800">
                      {task.title}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-semibold text-gray-700">
                        Status:
                      </span>{" "}
                      <span
                        className={`${
                          task.status === "Completed"
                            ? "text-green-600"
                            : task.status === "Inprogress"
                            ? "text-yellow-600"
                            : "text-red-600"
                        } font-bold`}
                      >
                        {task.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">
              No assigned tasks found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

