import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Consultation', 'Follow-up', 'Emergency', 'Routine Checkup'],
    default: 'Consultation'
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'No-Show', 'In-Progress'],
    default: 'Scheduled'
  },
  symptoms: String,
  diagnosis: String,
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String,
    instructions: String
  }],
  notes: String,
  fee: Number,
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Partially Paid'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique appointment ID before saving
appointmentSchema.pre('save', async function(next) {
  if (!this.appointmentId) {
    const count = await mongoose.model('Appointment').countDocuments();
    this.appointmentId = `APT${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('Appointment', appointmentSchema);
