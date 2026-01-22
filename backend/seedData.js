import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Doctor from './models/Doctor.js';
import Hospital from './models/Hospital.js';
import connectDB from './config/db.js';

dotenv.config();

// Sample Delhi Hospitals
const hospitals = [
  {
    name: 'All India Institute of Medical Sciences (AIIMS)',
    address: {
      street: 'Ansari Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110029',
      country: 'India'
    },
    phone: '+91-11-26588500',
    email: 'aiims@gov.in',
    type: 'Government',
    departments: [
      { name: 'Cardiology', totalBeds: 50, occupiedBeds: 35 },
      { name: 'Neurology', totalBeds: 40, occupiedBeds: 28 },
      { name: 'Orthopedics', totalBeds: 45, occupiedBeds: 30 },
      { name: 'Pediatrics', totalBeds: 60, occupiedBeds: 45 }
    ],
    facilities: ['ICU', 'Emergency', 'Radiology', 'Laboratory', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Operation Theatre'],
    totalBeds: 2500,
    availableBeds: 450,
    emergencyServices: true,
    accreditation: 'NABH Accredited',
    website: 'https://www.aiims.edu',
    rating: 5
  },
  {
    name: 'Safdarjung Hospital',
    address: {
      street: 'Ring Road, Ansari Nagar West',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110029',
      country: 'India'
    },
    phone: '+91-11-26165060',
    email: 'safdarjung@gov.in',
    type: 'Government',
    departments: [
      { name: 'General Medicine', totalBeds: 80, occupiedBeds: 60 },
      { name: 'Surgery', totalBeds: 70, occupiedBeds: 55 },
      { name: 'Gynecology', totalBeds: 50, occupiedBeds: 38 }
    ],
    facilities: ['ICU', 'Emergency', 'Laboratory', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Dialysis'],
    totalBeds: 1800,
    availableBeds: 380,
    emergencyServices: true,
    accreditation: 'NABH Accredited',
    website: 'https://www.vmmc-sjh.nic.in',
    rating: 4
  },
  {
    name: 'Apollo Hospitals',
    address: {
      street: 'Sarita Vihar',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110076',
      country: 'India'
    },
    phone: '+91-11-26825000',
    email: 'delhi@apollohospitals.com',
    type: 'Private',
    departments: [
      { name: 'Cardiology', totalBeds: 60, occupiedBeds: 48 },
      { name: 'Oncology', totalBeds: 50, occupiedBeds: 40 },
      { name: 'Neurology', totalBeds: 40, occupiedBeds: 32 },
      { name: 'Orthopedics', totalBeds: 45, occupiedBeds: 35 }
    ],
    facilities: ['ICU', 'NICU', 'Emergency', 'Radiology', 'Laboratory', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Cath Lab'],
    totalBeds: 700,
    availableBeds: 150,
    emergencyServices: true,
    accreditation: 'JCI & NABH Accredited',
    website: 'https://www.apollohospitals.com',
    rating: 5
  },
  {
    name: 'Max Super Speciality Hospital',
    address: {
      street: '1, Press Enclave Road, Saket',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110017',
      country: 'India'
    },
    phone: '+91-11-26515050',
    email: 'saket@maxhealthcare.com',
    type: 'Private',
    departments: [
      { name: 'Cardiology', totalBeds: 55, occupiedBeds: 42 },
      { name: 'Neurology', totalBeds: 45, occupiedBeds: 35 },
      { name: 'Orthopedics', totalBeds: 50, occupiedBeds: 38 },
      { name: 'Gastroenterology', totalBeds: 35, occupiedBeds: 28 }
    ],
    facilities: ['ICU', 'NICU', 'Emergency', 'Radiology', 'MRI', 'CT Scan', 'Laboratory', 'Blood Bank', 'Pharmacy', 'Ambulance'],
    totalBeds: 650,
    availableBeds: 180,
    emergencyServices: true,
    accreditation: 'NABH & JCI Accredited',
    website: 'https://www.maxhealthcare.in',
    rating: 5
  },
  {
    name: 'Fortis Hospital',
    address: {
      street: 'Sector B, Pocket 1, Aruna Asaf Ali Marg',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110070',
      country: 'India'
    },
    phone: '+91-11-47135000',
    email: 'vasantkunj@fortishealthcare.com',
    type: 'Private',
    departments: [
      { name: 'Cardiology', totalBeds: 50, occupiedBeds: 40 },
      { name: 'Neurology', totalBeds: 40, occupiedBeds: 30 },
      { name: 'Oncology', totalBeds: 45, occupiedBeds: 35 }
    ],
    facilities: ['ICU', 'Emergency', 'Radiology', 'Laboratory', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Dialysis'],
    totalBeds: 600,
    availableBeds: 140,
    emergencyServices: true,
    accreditation: 'NABH Accredited',
    website: 'https://www.fortishealthcare.com',
    rating: 4
  },
  {
    name: 'Sir Ganga Ram Hospital',
    address: {
      street: 'Rajinder Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110060',
      country: 'India'
    },
    phone: '+91-11-25750000',
    email: 'info@sgrh.com',
    type: 'Private',
    departments: [
      { name: 'Cardiology', totalBeds: 48, occupiedBeds: 38 },
      { name: 'Nephrology', totalBeds: 40, occupiedBeds: 32 },
      { name: 'Gastroenterology', totalBeds: 35, occupiedBeds: 28 }
    ],
    facilities: ['ICU', 'Emergency', 'Radiology', 'Laboratory', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Kidney Transplant'],
    totalBeds: 675,
    availableBeds: 165,
    emergencyServices: true,
    accreditation: 'NABH Accredited',
    website: 'https://www.sgrh.com',
    rating: 5
  },
  {
    name: 'BLK Super Speciality Hospital',
    address: {
      street: 'Pusa Road',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110005',
      country: 'India'
    },
    phone: '+91-11-30403040',
    email: 'info@blkhospital.com',
    type: 'Private',
    departments: [
      { name: 'Cardiology', totalBeds: 52, occupiedBeds: 40 },
      { name: 'Oncology', totalBeds: 48, occupiedBeds: 38 },
      { name: 'Orthopedics', totalBeds: 45, occupiedBeds: 35 }
    ],
    facilities: ['ICU', 'NICU', 'Emergency', 'Radiology', 'Laboratory', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Bone Marrow Transplant'],
    totalBeds: 700,
    availableBeds: 185,
    emergencyServices: true,
    accreditation: 'NABH & JCI Accredited',
    website: 'https://www.blkhospital.com',
    rating: 5
  },
  {
    name: 'Indraprastha Apollo Hospital',
    address: {
      street: 'Sarita Vihar, Mathura Road',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110076',
      country: 'India'
    },
    phone: '+91-11-26825858',
    email: 'delhi.indraprastha@apollohospitals.com',
    type: 'Private',
    departments: [
      { name: 'Cardiology', totalBeds: 65, occupiedBeds: 50 },
      { name: 'Neurology', totalBeds: 50, occupiedBeds: 40 },
      { name: 'Oncology', totalBeds: 55, occupiedBeds: 45 }
    ],
    facilities: ['ICU', 'NICU', 'Emergency', 'Radiology', 'MRI', 'CT Scan', 'PET Scan', 'Laboratory', 'Blood Bank', 'Pharmacy', 'Ambulance'],
    totalBeds: 750,
    availableBeds: 200,
    emergencyServices: true,
    accreditation: 'JCI & NABH Accredited',
    website: 'https://www.apollohospitals.com',
    rating: 5
  }
];

// Sample Indian Doctors with Specializations
const doctorsData = [
  // Cardiology
  { name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@hospital.com', specialization: 'Cardiology', qualification: 'MD, DM (Cardiology)', experience: 15, department: 'Cardiology', fee: 1500, bio: 'Renowned cardiologist with expertise in interventional cardiology' },
  { name: 'Dr. Priya Sharma', email: 'priya.sharma@hospital.com', specialization: 'Cardiology', qualification: 'MBBS, MD, DM (Cardiology)', experience: 12, department: 'Cardiology', fee: 1200, bio: 'Specialist in heart failure and cardiac imaging' },
  
  // Dermatology
  { name: 'Dr. Anjali Mehta', email: 'anjali.mehta@hospital.com', specialization: 'Dermatology', qualification: 'MBBS, MD (Dermatology)', experience: 10, department: 'Dermatology', fee: 800, bio: 'Expert in cosmetic dermatology and skin disorders' },
  { name: 'Dr. Vikram Singh', email: 'vikram.singh@hospital.com', specialization: 'Dermatology', qualification: 'MBBS, DVD, MD', experience: 8, department: 'Dermatology', fee: 700, bio: 'Specialist in pediatric dermatology and allergic conditions' },
  
  // Neurology
  { name: 'Dr. Suresh Reddy', email: 'suresh.reddy@hospital.com', specialization: 'Neurology', qualification: 'MBBS, MD, DM (Neurology)', experience: 18, department: 'Neurology', fee: 1800, bio: 'Expert in stroke management and movement disorders' },
  { name: 'Dr. Kavita Desai', email: 'kavita.desai@hospital.com', specialization: 'Neurology', qualification: 'MD, DM (Neurology)', experience: 14, department: 'Neurology', fee: 1500, bio: 'Specialist in epilepsy and headache disorders' },
  
  // Pediatrics
  { name: 'Dr. Amit Verma', email: 'amit.verma@hospital.com', specialization: 'Pediatrics', qualification: 'MBBS, MD (Pediatrics)', experience: 13, department: 'Pediatrics', fee: 900, bio: 'Experienced pediatrician specializing in child development' },
  { name: 'Dr. Neha Gupta', email: 'neha.gupta@hospital.com', specialization: 'Pediatrics', qualification: 'MBBS, DCH, MD', experience: 11, department: 'Pediatrics', fee: 850, bio: 'Expert in neonatal care and pediatric emergencies' },
  
  // Orthopedics
  { name: 'Dr. Arjun Patel', email: 'arjun.patel@hospital.com', specialization: 'Orthopedics', qualification: 'MBBS, MS (Orthopedics)', experience: 16, department: 'Orthopedics', fee: 1300, bio: 'Specialist in joint replacement and sports injuries' },
  { name: 'Dr. Deepak Malhotra', email: 'deepak.malhotra@hospital.com', specialization: 'Orthopedics', qualification: 'MBBS, DNB (Orthopedics)', experience: 12, department: 'Orthopedics', fee: 1100, bio: 'Expert in spine surgery and trauma care' },
  
  // Gynecology
  { name: 'Dr. Sunita Rao', email: 'sunita.rao@hospital.com', specialization: 'Gynecology', qualification: 'MBBS, MS (Gynecology)', experience: 17, department: 'Gynecology', fee: 1000, bio: 'Experienced in high-risk pregnancies and laparoscopic surgery' },
  { name: 'Dr. Meera Nair', email: 'meera.nair@hospital.com', specialization: 'Gynecology', qualification: 'MBBS, DGO, DNB', experience: 14, department: 'Gynecology', fee: 950, bio: 'Specialist in infertility treatment and women\'s health' },
  
  // Psychiatry
  { name: 'Dr. Rohan Kapoor', email: 'rohan.kapoor@hospital.com', specialization: 'Psychiatry', qualification: 'MBBS, MD (Psychiatry)', experience: 12, department: 'Psychiatry', fee: 1200, bio: 'Expert in depression, anxiety, and addiction treatment' },
  { name: 'Dr. Shalini Iyer', email: 'shalini.iyer@hospital.com', specialization: 'Psychiatry', qualification: 'MBBS, DPM, DNB', experience: 10, department: 'Psychiatry', fee: 1000, bio: 'Specialist in child and adolescent psychiatry' },
  
  // Ophthalmology
  { name: 'Dr. Manoj Joshi', email: 'manoj.joshi@hospital.com', specialization: 'Ophthalmology', qualification: 'MBBS, MS (Ophthalmology)', experience: 15, department: 'Ophthalmology', fee: 900, bio: 'Expert in cataract surgery and retinal disorders' },
  { name: 'Dr. Pooja Menon', email: 'pooja.menon@hospital.com', specialization: 'Ophthalmology', qualification: 'MBBS, DO, DNB', experience: 11, department: 'Ophthalmology', fee: 800, bio: 'Specialist in LASIK and corneal transplants' },
  
  // ENT (Ear, Nose, Throat)
  { name: 'Dr. Sanjay Agarwal', email: 'sanjay.agarwal@hospital.com', specialization: 'ENT', qualification: 'MBBS, MS (ENT)', experience: 14, department: 'ENT', fee: 850, bio: 'Expert in sinus surgery and hearing disorders' },
  { name: 'Dr. Ritu Bhatt', email: 'ritu.bhatt@hospital.com', specialization: 'ENT', qualification: 'MBBS, DLO, DNB', experience: 9, department: 'ENT', fee: 750, bio: 'Specialist in voice disorders and pediatric ENT' },
  
  // General Medicine
  { name: 'Dr. Anil Kumar', email: 'anil.kumar@hospital.com', specialization: 'General Medicine', qualification: 'MBBS, MD (Medicine)', experience: 20, department: 'General Medicine', fee: 600, bio: 'Experienced physician in managing chronic diseases' },
  { name: 'Dr. Lakshmi Krishnan', email: 'lakshmi.krishnan@hospital.com', specialization: 'General Medicine', qualification: 'MBBS, MD', experience: 16, department: 'General Medicine', fee: 550, bio: 'Expert in diabetes and hypertension management' }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🗑️  Clearing existing data...');
    await Hospital.deleteMany({});
    await Doctor.deleteMany({});
    // Keep users but delete only sample doctors' users
    const sampleEmails = doctorsData.map(d => d.email);
    await User.deleteMany({ email: { $in: sampleEmails } });
    
    console.log('🏥 Seeding hospitals...');
    const createdHospitals = [];
    for (const hospitalData of hospitals) {
      const hospital = await Hospital.create(hospitalData);
      createdHospitals.push(hospital);
    }
    console.log(`✅ Created ${createdHospitals.length} hospitals`);
    
    console.log('👨‍⚕️ Seeding doctors...');
    const doctors = [];
    
    for (const doctorData of doctorsData) {
      // Create user account for doctor
      const user = await User.create({
        name: doctorData.name,
        email: doctorData.email,
        password: 'Doctor@123', // Default password
        role: 'doctor',
        phone: `+91-98${Math.floor(10000000 + Math.random() * 90000000)}`
      });
      
      // Create doctor profile
      const doctor = await Doctor.create({
        user: user._id,
        specialization: doctorData.specialization,
        qualification: doctorData.qualification,
        experience: doctorData.experience,
        licenseNumber: `MCI-${Math.floor(100000 + Math.random() * 900000)}`,
        department: doctorData.department,
        consultationFee: doctorData.fee,
        availability: [
          { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Friday', startTime: '09:00', endTime: '17:00', isAvailable: true },
          { day: 'Saturday', startTime: '09:00', endTime: '13:00', isAvailable: true }
        ],
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        totalPatients: Math.floor(Math.random() * 500) + 100,
        biography: doctorData.bio,
        awards: [
          'Best Doctor Award 2023',
          'Excellence in Patient Care'
        ]
      });
      
      doctors.push(doctor);
    }
    
    console.log(`✅ Created ${doctors.length} doctors with user accounts`);
    console.log('\n📊 Sample Credentials:');
    console.log('Email: rajesh.kumar@hospital.com | Password: Doctor@123');
    console.log('Email: priya.sharma@hospital.com | Password: Doctor@123');
    console.log('\n🎉 Database seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
