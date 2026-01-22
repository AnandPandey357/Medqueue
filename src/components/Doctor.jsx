import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  FaUserMd,
  FaPlus,
  FaSearch,
  FaFilter,
  FaEye,
  FaStar,
  FaStethoscope,
  FaGraduationCap,
  FaDollarSign,
  FaCalendarAlt,
  FaHospital,
  FaAward,
  FaClock,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Doctor = () => {
  const { user, logout } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const specializations = [
    'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics',
    'Gynecology', 'Psychiatry', 'Ophthalmology', 'ENT', 'General Medicine'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.doctorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = filterSpecialization === '' || doctor.specialization === filterSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navbar */}
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
                <p className="text-xs text-gray-500">Doctor Directory</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-semibold">Dashboard</Link>
              <Link to="/doctor" className="text-blue-600 font-semibold">Doctors</Link>
              <Link to="/patient" className="text-gray-700 hover:text-blue-600 font-semibold">Patients</Link>
              <Link to="/hospital" className="text-gray-700 hover:text-blue-600 font-semibold">Hospitals</Link>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">{user?.name}</span>
                <button onClick={logout} className="text-red-600 hover:text-red-800">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Medical Experts</h2>
          <p className="text-gray-600">Find experienced doctors across various specializations</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={filterSpecialization}
                  onChange={(e) => setFilterSpecialization(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaUserMd className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Doctors Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 pb-16">
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                    {doctor.doctorId}
                  </div>
                  <div className="flex items-start space-x-4">
                    <img
                      src={doctor.user?.avatar || 'https://via.placeholder.com/150'}
                      alt={doctor.user?.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="text-white flex-1">
                      <h3 className="font-bold text-xl mb-1">{doctor.user?.name}</h3>
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(doctor.rating || 4)}
                        <span className="text-sm ml-1">({doctor.rating || 4}.0)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 -mt-10 relative">
                  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex items-center text-blue-600 font-semibold mb-2">
                      <FaStethoscope className="mr-2" />
                      <span>{doctor.specialization}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <FaGraduationCap className="mr-2 text-purple-500" />
                      <span>{doctor.qualification}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <FaClock className="mr-2 text-green-500" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaDollarSign className="mr-2 text-yellow-500" />
                      <span className="font-semibold text-green-600">${doctor.consultationFee} / consultation</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaPhone className="mr-2 text-blue-500" />
                      <span>{doctor.user?.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaEnvelope className="mr-2 text-purple-500" />
                      <span className="truncate">{doctor.user?.email}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Patients</span>
                      <span className="font-bold text-blue-600">{doctor.totalPatients || 0}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setSelectedDoctor(doctor); setShowViewModal(true); }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-xl transition font-semibold flex items-center justify-center space-x-2"
                  >
                    <FaEye />
                    <span>View Full Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Doctor Modal */}
      {showViewModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl"
              >
                ×
              </button>
              <div className="flex items-center space-x-6">
                <img
                  src={selectedDoctor.user?.avatar || 'https://via.placeholder.com/150'}
                  alt={selectedDoctor.user?.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2">Dr. {selectedDoctor.user?.name}</h3>
                  <p className="text-blue-100 mb-2">{selectedDoctor.specialization}</p>
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedDoctor.rating || 4)}
                    <span className="ml-2">({selectedDoctor.rating || 4}.0 Rating)</span>
                  </div>
                  <div className="mt-3 inline-block bg-white bg-opacity-20 px-4 py-1 rounded-full text-sm">
                    {selectedDoctor.doctorId}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Professional Details */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <FaGraduationCap className="mr-2 text-blue-600" />
                  Professional Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Qualification</p>
                    <p className="font-semibold">{selectedDoctor.qualification}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-semibold">{selectedDoctor.experience} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">License Number</p>
                    <p className="font-semibold">{selectedDoctor.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-semibold">{selectedDoctor.department}</p>
                  </div>
                </div>
              </div>

              {/* Consultation Fee */}
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                  <FaDollarSign className="mr-2 text-green-600" />
                  Consultation Fee
                </h4>
                <p className="text-3xl font-bold text-green-600">${selectedDoctor.consultationFee}</p>
                <p className="text-sm text-gray-600 mt-1">per consultation</p>
              </div>

              {/* Availability Schedule */}
              {selectedDoctor.availability && selectedDoctor.availability.length > 0 && (
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                    <FaCalendarAlt className="mr-2 text-purple-600" />
                    Availability Schedule
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedDoctor.availability.map((slot, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg">
                        <p className="font-semibold text-gray-800">{slot.day}</p>
                        <p className="text-sm text-gray-600">{slot.startTime} - {slot.endTime}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${slot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {slot.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Biography */}
              {selectedDoctor.biography && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-2">Biography</h4>
                  <p className="text-gray-600">{selectedDoctor.biography}</p>
                </div>
              )}

              {/* Awards */}
              {selectedDoctor.awards && selectedDoctor.awards.length > 0 && (
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <FaAward className="mr-2 text-yellow-600" />
                    Awards & Achievements
                  </h4>
                  <ul className="space-y-2">
                    {selectedDoctor.awards.map((award, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">🏆</span>
                        <span className="text-gray-700">{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaPhone className="mr-3 text-blue-600" />
                    <span className="text-gray-700">{selectedDoctor.user?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-3 text-purple-600" />
                    <span className="text-gray-700">{selectedDoctor.user?.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowViewModal(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:shadow-xl transition font-bold text-lg"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctor;