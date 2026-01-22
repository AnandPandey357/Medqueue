import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  FaHospital,
  FaPlus,
  FaSearch,
  FaFilter,
  FaEye,
  FaBed,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaStar,
  FaBuilding,
  FaAmbulance,
  FaCheckCircle,
  FaTimesCircle,
  FaCertificate,
  FaUsers
} from 'react-icons/fa';

const Hospital = () => {
  const { user, logout } = useAuth();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hospitals');
      setHospitals(response.data.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.hospitalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || hospital.type === filterType;
    return matchesSearch && matchesType;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const calculateOccupancyRate = (total, available) => {
    if (total === 0) return 0;
    return (((total - available) / total) * 100).toFixed(1);
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
                <p className="text-xs text-gray-500">Hospital Network</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-semibold">Dashboard</Link>
              <Link to="/doctor" className="text-gray-700 hover:text-blue-600 font-semibold">Doctors</Link>
              <Link to="/patient" className="text-gray-700 hover:text-blue-600 font-semibold">Patients</Link>
              <Link to="/hospital" className="text-blue-600 font-semibold">Hospitals</Link>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Healthcare Facilities</h2>
          <p className="text-gray-600">Browse our network of quality healthcare institutions</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by hospital name or ID..."
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
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Semi-Government">Semi-Government</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Hospitals Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredHospitals.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaHospital className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Hospitals Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => {
              const occupancyRate = calculateOccupancyRate(hospital.totalBeds, hospital.availableBeds);
              return (
                <div key={hospital._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        hospital.type === 'Government' ? 'bg-green-100 text-green-800' :
                        hospital.type === 'Private' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {hospital.type}
                      </span>
                    </div>
                    <FaHospital className="text-5xl text-white mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-1">{hospital.name}</h3>
                    <p className="text-blue-100 text-sm">{hospital.hospitalId}</p>
                  </div>

                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(hospital.rating || 4)}
                      <span className="ml-2 text-sm text-gray-600">({hospital.rating || 4}.0)</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-start text-gray-600 mb-3">
                      <FaMapMarkerAlt className="mr-2 mt-1 text-red-500 flex-shrink-0" />
                      <span className="text-sm">
                        {hospital.address?.city}, {hospital.address?.state}
                      </span>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaPhone className="mr-2 text-blue-500" />
                        <span>{hospital.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaEnvelope className="mr-2 text-purple-500" />
                        <span className="truncate">{hospital.email}</span>
                      </div>
                    </div>

                    {/* Bed Availability */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Bed Availability</span>
                        <FaBed className="text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">{hospital.availableBeds}</span>
                        <span className="text-sm text-gray-600">/ {hospital.totalBeds}</span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              occupancyRate < 50 ? 'bg-green-500' :
                              occupancyRate < 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${occupancyRate}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{occupancyRate}% occupied</p>
                      </div>
                    </div>

                    {/* Emergency Services */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Emergency Services</span>
                      {hospital.emergencyServices ? (
                        <span className="flex items-center text-green-600 text-sm font-semibold">
                          <FaCheckCircle className="mr-1" /> Available
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600 text-sm font-semibold">
                          <FaTimesCircle className="mr-1" /> Not Available
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => { setSelectedHospital(hospital); setShowViewModal(true); }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-xl transition font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaEye />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* View Hospital Modal */}
      {showViewModal && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl"
              >
                ×
              </button>
              <div className="flex items-start space-x-6">
                <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                  <FaHospital className="text-6xl text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2">{selectedHospital.name}</h3>
                  <p className="text-blue-100 mb-3">{selectedHospital.hospitalId}</p>
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(selectedHospital.rating || 4)}
                    <span className="ml-2">({selectedHospital.rating || 4}.0 Rating)</span>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedHospital.type === 'Government' ? 'bg-green-100 text-green-800' :
                    selectedHospital.type === 'Private' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {selectedHospital.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Contact & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-600" />
                    Location
                  </h4>
                  <p className="text-gray-700">
                    {selectedHospital.address?.street}<br />
                    {selectedHospital.address?.city}, {selectedHospital.address?.state}<br />
                    {selectedHospital.address?.zipCode}, {selectedHospital.address?.country}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaPhone className="mr-3 text-blue-600" />
                      <span className="text-gray-700">{selectedHospital.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="mr-3 text-purple-600" />
                      <span className="text-gray-700">{selectedHospital.email}</span>
                    </div>
                    {selectedHospital.website && (
                      <div className="flex items-center">
                        <FaGlobe className="mr-3 text-green-600" />
                        <a href={selectedHospital.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedHospital.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bed Information */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <FaBed className="mr-2 text-blue-600" />
                  Bed Capacity & Availability
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{selectedHospital.totalBeds}</p>
                    <p className="text-sm text-gray-600">Total Beds</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{selectedHospital.availableBeds}</p>
                    <p className="text-sm text-gray-600">Available</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600">
                      {selectedHospital.totalBeds - selectedHospital.availableBeds}
                    </p>
                    <p className="text-sm text-gray-600">Occupied</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        calculateOccupancyRate(selectedHospital.totalBeds, selectedHospital.availableBeds) < 50 ? 'bg-green-500' :
                        calculateOccupancyRate(selectedHospital.totalBeds, selectedHospital.availableBeds) < 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${calculateOccupancyRate(selectedHospital.totalBeds, selectedHospital.availableBeds)}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {calculateOccupancyRate(selectedHospital.totalBeds, selectedHospital.availableBeds)}% Occupancy Rate
                  </p>
                </div>
              </div>

              {/* Departments */}
              {selectedHospital.departments && selectedHospital.departments.length > 0 && (
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                    <FaBuilding className="mr-2 text-purple-600" />
                    Departments
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedHospital.departments.map((dept, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg">
                        <h5 className="font-semibold text-gray-800 mb-2">{dept.name}</h5>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Beds: {dept.totalBeds}</span>
                          <span className="text-green-600 font-semibold">
                            {dept.totalBeds - (dept.occupiedBeds || 0)} available
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Facilities */}
              {selectedHospital.facilities && selectedHospital.facilities.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4">Facilities & Services</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedHospital.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center bg-white p-3 rounded-lg">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Services & Accreditation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`rounded-xl p-6 ${selectedHospital.emergencyServices ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <FaAmbulance className={`mr-2 ${selectedHospital.emergencyServices ? 'text-green-600' : 'text-red-600'}`} />
                    Emergency Services
                  </h4>
                  <p className={`font-semibold ${selectedHospital.emergencyServices ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedHospital.emergencyServices ? '24/7 Available' : 'Not Available'}
                  </p>
                </div>

                {selectedHospital.accreditation && (
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                      <FaCertificate className="mr-2 text-yellow-600" />
                      Accreditation
                    </h4>
                    <p className="text-gray-700">{selectedHospital.accreditation}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowViewModal(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:shadow-xl transition font-bold text-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hospital;