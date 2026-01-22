import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Hospital from '../models/Hospital.js';
import Appointment from '../models/Appointment.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (Admin/Doctor/Staff)
export const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalHospitals = await Hospital.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    
    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59))
      }
    });
    
    const scheduledAppointments = await Appointment.countDocuments({ status: 'Scheduled' });
    const completedAppointments = await Appointment.countDocuments({ status: 'Completed' });
    
    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .populate('patient', 'patientId')
      .populate('doctor', 'doctorId')
      .populate('hospital', 'name')
      .sort('-createdAt')
      .limit(5);
    
    // Get total beds info
    const hospitals = await Hospital.find();
    const totalBeds = hospitals.reduce((sum, hospital) => sum + hospital.totalBeds, 0);
    const totalAvailableBeds = hospitals.reduce((sum, hospital) => sum + hospital.availableBeds, 0);
    
    res.json({
      success: true,
      data: {
        totalPatients,
        totalDoctors,
        totalHospitals,
        totalAppointments,
        todayAppointments,
        scheduledAppointments,
        completedAppointments,
        totalBeds,
        totalAvailableBeds,
        occupancyRate: totalBeds > 0 ? ((totalBeds - totalAvailableBeds) / totalBeds * 100).toFixed(1) : 0,
        recentAppointments
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
