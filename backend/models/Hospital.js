import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  hospitalId: {
    type: String,
    unique: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Government', 'Private', 'Semi-Government'],
    required: true
  },
  departments: [{
    name: String,
    headOfDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    totalBeds: Number,
    occupiedBeds: {
      type: Number,
      default: 0
    }
  }],
  facilities: [String],
  totalBeds: {
    type: Number,
    required: true
  },
  availableBeds: {
    type: Number,
    required: true
  },
  emergencyServices: {
    type: Boolean,
    default: true
  },
  accreditation: String,
  website: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique hospital ID before saving
hospitalSchema.pre('save', async function(next) {
  if (!this.hospitalId) {
    const count = await mongoose.model('Hospital').countDocuments();
    this.hospitalId = `HOS${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('Hospital', hospitalSchema);
