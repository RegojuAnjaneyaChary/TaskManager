import React from 'react'


import { Routes, Route } from "react-router-dom"
import Home from './components/Landingpage'
import Signup from './components/Signup'
import Login from './components/Login'
import ManagerDashboard from './components/ManagerDashboard'
import EmployeeDashboard from './components/EmployeeDashboard'
import Profile from './pages/Profile'
import NotFound from './components/NotFound'
import { Toaster } from 'react-hot-toast';
import EditProfile from './pages/Editprofile'
import Navbar from './pages/Navbar'
import CreateTicket from './pages/managerApis/createTicket'
import TicketbyId from './pages/managerApis/ticketbyId'
import AllTickets from './pages/managerApis/allTickets'
import Allemployeelist from './pages/managerApis/allemployeelist'
import { ImOffice, ImPodcast } from 'react-icons/im'
import ViewAssignedTickets from './pages/employeeApis/viewAssignedTickets'
import ViewCommentsTicketById from './pages/employeeApis/viewCommentsTicketById'
import UpdateTicketStatusById from './pages/employeeApis/updateTicketStatusById'
import AddCommentToTicketById from './pages/employeeApis/addCommentToTicketById'
import Sidebar from './pages/managerApis/Sidebar'
import Mainbar from './pages/managerApis/Mainbar'
import Managerdashbrdlayout from './pages/managerdashbrdlayout';
import EmployeeDashboardlayout from './pages/empdashboardlayout'
import Employeesidebar from './pages/employeeApis/Sidebar'
import Employeemainbar from './pages/employeeApis/Mainbar'



export const apiUrl = "https://nodejs-project-server.onrender.com";

// export const apiUrl = "http://localhost:8000";

const App = () => {
  return (
    <div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/managerdashboard" element={<ManagerDashboard />} />
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/profilepage" element={<Profile />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/createticket" element={<CreateTicket />} />
        {/* <Route path="/ticketbyid" element={<TicketbyId />} /> */}
        <Route path="/ticket/:ticketID" element={<TicketbyId />} />
        <Route path="/alltickets" element={<AllTickets />} />
        <Route path="/allemployeelist" element={<Allemployeelist />} />
        <Route path="/viewassignedtickets" element={<ViewAssignedTickets />} />
        <Route path="/updateticketstatusbyid" element={<UpdateTicketStatusById />} />
        <Route path="/viewcommentsticketbyid" element={< ViewCommentsTicketById />} />
        <Route path="/addcommenttoticketbyid" element={<AddCommentToTicketById />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/mainbar" element={< Mainbar />} />
        <Route path="/managerdashboardLayout" element={< Managerdashbrdlayout />} />
        <Route path="/DashboardLayout" element={< EmployeeDashboardlayout />} />
        <Route path="/sidebar" element={< Employeesidebar />} />
        <Route path="/mainbar" element={< Employeemainbar />} />




      </Routes>
    </div>
  )
}

export default App;