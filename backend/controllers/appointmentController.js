import Appointment from '../models/Appointment.js';

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
export const getAppointments = async (req, res) => {
  try {
    let query = {};
    
    // Filter by role
    if (req.user.role === 'patient') {
      const Patient = (await import('../models/Patient.js')).default;
      const patient = await Patient.findOne({ user: req.user.id });
      if (patient) query.patient = patient._id;
    } else if (req.user.role === 'doctor') {
      const Doctor = (await import('../models/Doctor.js')).default;
      const doctor = await Doctor.findOne({ user: req.user.id });
      if (doctor) query.doctor = doctor._id;
    }
    
    const appointments = await Appointment.find(query)
      .populate('patient', 'patientId')
      .populate('doctor', 'doctorId')
      .populate('hospital', 'name')
      .sort('-createdAt');
      
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('hospital');
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    
    res.json({ success: true, data: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    
    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json({ success: true, data: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private (Admin)
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    
    await appointment.deleteOne();
    
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get my appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
export const getMyAppointments = async (req, res) => {
  try {
    let query = {};
    
    if (req.user.role === 'patient') {
      const Patient = (await import('../models/Patient.js')).default;
      const patient = await Patient.findOne({ user: req.user.id });
      if (patient) query.patient = patient._id;
    }
    
    const appointments = await Appointment.find(query)
      .populate('doctor')
      .populate('hospital')
      .sort('-appointmentDate');
      
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
