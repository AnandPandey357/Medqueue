import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  FaUserMd, 
  FaUserInjured, 
  FaHospital, 
  FaCalendarCheck, 
  FaBed, 
  FaChartLine,
  FaSignOutAlt,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaBell
} from 'react-icons/fa';

const EnhancedDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      if (user?.role === 'admin' || user?.role === 'doctor' || user?.role === 'staff') {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className={`${bgColor} rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`${color} bg-opacity-10 p-4 rounded-full`}>
          <Icon className={`text-4xl ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FaHospital className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MedQueue
                </h1>
                <p className="text-xs text-gray-500">Hospital Management System</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                Dashboard
              </Link>
              <Link to="/doctor" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                Doctors
              </Link>
              <Link to="/patient" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                Patients
              </Link>
              <Link to="/hospital" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                Hospitals
              </Link>
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-blue-600">
                <FaBell className="text-2xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
                >
                  <img 
                    src={user?.avatar || 'https://via.placeholder.com/150'} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-gray-700">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-700">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                      <FaUser className="mr-3 text-gray-600" />
                      <span className="text-sm text-gray-700">My Profile</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 hover:bg-red-50 transition text-red-600"
                    >
                      <FaSignOutAlt className="mr-3" />
                      <span className="text-sm font-semibold">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-gray-600">Here's what's happening in your hospital today.</p>
        </div>

        {/* Statistics Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                icon={FaUserInjured}
                title="Total Patients"
                value={stats.totalPatients}
                color="text-blue-600"
                bgColor="bg-blue-50"
              />
              <StatCard 
                icon={FaUserMd}
                title="Total Doctors"
                value={stats.totalDoctors}
                color="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard 
                icon={FaHospital}
                title="Total Hospitals"
                value={stats.totalHospitals}
                color="text-purple-600"
                bgColor="bg-purple-50"
              />
              <StatCard 
                icon={FaCalendarCheck}
                title="Appointments"
                value={stats.totalAppointments}
                color="text-pink-600"
                bgColor="bg-pink-50"
              />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Today's Appointments</h3>
                  <FaClock className="text-orange-500 text-2xl" />
                </div>
                <p className="text-4xl font-bold text-orange-600">{stats.todayAppointments}</p>
                <p className="text-sm text-gray-500 mt-2">Scheduled for today</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Bed Occupancy</h3>
                  <FaBed className="text-indigo-500 text-2xl" />
                </div>
                <p className="text-4xl font-bold text-indigo-600">{stats.occupancyRate}%</p>
                <p className="text-sm text-gray-500 mt-2">
                  {stats.totalBeds - stats.totalAvailableBeds}/{stats.totalBeds} beds occupied
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
                  <FaCheckCircle className="text-teal-500 text-2xl" />
                </div>
                <p className="text-4xl font-bold text-teal-600">{stats.completedAppointments}</p>
                <p className="text-sm text-gray-500 mt-2">Appointments completed</p>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Appointments</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Appointment ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hospital
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.recentAppointments?.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {appointment.appointmentId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.patient?.patientId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.doctor?.doctorId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.hospital?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/doctor" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <FaUserMd className="text-6xl text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Doctors</h3>
              <p className="text-blue-100">View and manage doctor profiles</p>
            </Link>

            <Link to="/patient" className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <FaUserInjured className="text-6xl text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Patients</h3>
              <p className="text-green-100">Manage patient records and history</p>
            </Link>

            <Link to="/hospital" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <FaHospital className="text-6xl text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Hospitals</h3>
              <p className="text-purple-100">View hospital information</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDashboard;
