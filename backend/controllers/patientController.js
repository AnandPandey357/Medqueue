import Patient from '../models/Patient.js';

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Admin/Doctor/Staff)
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('user', 'name email phone avatar');
    res.json({ success: true, count: patients.length, data: patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('user', 'name email phone avatar');
    
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    
    res.json({ success: true, data: patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create patient profile
// @route   POST /api/patients
// @access  Private
export const createPatient = async (req, res) => {
  try {
    const patientData = { ...req.body, user: req.user.id };
    const patient = await Patient.create(patientData);
    
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
export const updatePatient = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    
    patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json({ success: true, data: patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private (Admin)
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    
    await patient.deleteOne();
    
    res.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get my patient profile
// @route   GET /api/patients/my-profile
// @access  Private (Patient)
export const getMyProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id }).populate('user', 'name email phone avatar');
    
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient profile not found' });
    }
    
    res.json({ success: true, data: patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
