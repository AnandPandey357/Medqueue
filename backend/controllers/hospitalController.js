import Hospital from '../models/Hospital.js';

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json({ success: true, count: hospitals.length, data: hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single hospital
// @route   GET /api/hospitals/:id
// @access  Public
export const getHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    
    res.json({ success: true, data: hospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create hospital
// @route   POST /api/hospitals
// @access  Private (Admin)
export const createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ success: true, data: hospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update hospital
// @route   PUT /api/hospitals/:id
// @access  Private (Admin)
export const updateHospital = async (req, res) => {
  try {
    let hospital = await Hospital.findById(req.params.id);
    
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    
    hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json({ success: true, data: hospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete hospital
// @route   DELETE /api/hospitals/:id
// @access  Private (Admin)
export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    
    await hospital.deleteOne();
    
    res.json({ success: true, message: 'Hospital deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
