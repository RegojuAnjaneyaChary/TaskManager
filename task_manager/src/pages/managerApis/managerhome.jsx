import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

export default function Managerhome() {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [taskCount, setTaskCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch Employee Count
    const fetchEmployeeCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/ticket/getAllemployeeList`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployeeCount(response.data.data?.length || 0);
        } catch (err) {
            console.error("Error fetching employees:", err);
            toast.error("Failed to fetch employees ❌");
            setEmployeeCount(0);
        }
    };

    // Fetch Task Count
    const fetchTaskCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/ticket/allTickets`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTaskCount(response.data.data?.length || 0);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            toast.error("Failed to fetch tasks ❌");
            setTaskCount(0);
        }
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchEmployeeCount(), fetchTaskCount()]).finally(() =>
            setLoading(false)
        );
    }, []);

    return (
        <div className="mt-10 px-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Employee Count */}
                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Employees</h2>
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : (
                        <p className="text-6xl font-extrabold text-indigo-600">
                            {employeeCount}
                        </p>
                    )}
                </div>

                {/* Task Count */}
                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : (
                        <p className="text-6xl font-extrabold text-green-600">
                            {taskCount}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../../App";
// import { toast } from "react-hot-toast";

// export default function Managerhome() {
//   const [employeeCount, setEmployeeCount] = useState(0);
//   const [taskCount, setTaskCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Fetch Employee Count
//   const fetchEmployeeCount = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${apiUrl}/ticket/getAllemployeeList`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEmployeeCount(response.data.data?.length || 0);
//     } catch (err) {
//       console.error("Error fetching employees:", err);
//       toast.error("Failed to fetch employees ❌");
//       setEmployeeCount(0);
//     }
//   };

//   // Fetch Task Count
//   const fetchTaskCount = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${apiUrl}/ticket/allTickets`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTaskCount(response.data.data?.length || 0);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//       toast.error("Failed to fetch tasks ❌");
//       setTaskCount(0);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     Promise.all([fetchEmployeeCount(), fetchTaskCount()]).finally(() =>
//       setLoading(false)
//     );
//   }, []);

//   return (
//     <div className="mt-8 px-4 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//         Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Employee Count */}
//         <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center justify-center">
//           <h2 className="text-xl font-semibold text-gray-700 mb-3">Employees</h2>
//           {loading ? (
//             <p className="text-gray-500 text-sm">Loading...</p>
//           ) : (
//             <p className="text-4xl font-bold text-indigo-600">{employeeCount}</p>
//           )}
//         </div>

//         {/* Task Count */}
//         <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center justify-center">
//           <h2 className="text-xl font-semibold text-gray-700 mb-3">Tasks</h2>
//           {loading ? (
//             <p className="text-gray-500 text-sm">Loading...</p>
//           ) : (
//             <p className="text-4xl font-bold text-green-600">{taskCount}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
