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
import CreateTicket from './pages/manager apis/createTicket'
import TicketbyId from './pages/manager apis/ticketbyId'
import AllTickets from './pages/manager apis/allTickets'
import Allemployeelist from './pages/manager apis/allemployeelist'
import { ImOffice } from 'react-icons/im'
import ViewAssignedTickets from './pages/employee apis/viewAssignedTickets'
import ViewCommentsTicketById from './pages/employee apis/viewCommentsTicketById'
import UpdateTicketStatusById from './pages/employee apis/updateTicketStatusById'
import AddCommentToTicketById from './pages/employee apis/addCommentToTicketById'
import Sidebar from './pages/manager apis/Sidebar'
import Mainbar from './pages/manager apis/Mainbar'

  
export const apiUrl = "https://nodejs-project-server.onrender.com";

const App = () => {
  return (
    <div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 2000,
          },
          error: {
            duration: 2000,
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
         <Route path="/mainbar" element={< Mainbar/>} />


      </Routes>
    </div>
  )
}

export default App;