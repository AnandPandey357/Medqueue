# 🏥 MedQueue - Hospital Management System

A comprehensive, production-ready hospital management system built with **MERN Stack** (MongoDB, Express.js, React, Node.js) featuring authentication, real-time statistics, and complete CRUD operations.

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login** with JWT authentication
- **Role-based access control** (Admin, Doctor, Patient, Staff)
- **Protected routes** with middleware
- **Password encryption** using bcryptjs
- **Forgot password** functionality

### 👥 User Management
- Complete user profiles with avatars
- Multiple user roles (Admin, Doctor, Patient, Staff)
- Profile management and updates

### 🏥 Core Modules
- **Patient Management**: Medical history, allergies, medications, insurance info
- **Doctor Management**: Specializations, schedules, consultation fees, ratings
- **Hospital Management**: Departments, bed tracking, facilities, accreditation
- **Appointment System**: Booking, status tracking, prescriptions, payments

### 📊 Dashboard & Analytics
- Real-time statistics and metrics
- Today's appointments tracking
- Bed occupancy rates
- Recent appointments list
- Role-based dashboard views

### 🎨 Modern UI/UX
- Beautiful gradient designs
- Responsive mobile-first design
- Smooth animations and transitions
- Professional color schemes
- Interactive components

## 🚀 Technology Stack

### Frontend
- **React** 18.3.1 - UI Library
- **React Router DOM** 6.26.1 - Routing
- **Axios** - HTTP Client
- **Tailwind CSS** 3.4.10 - Styling
- **React Icons** - Icon Library
- **Vite** 5.4.1 - Build Tool

### Backend
- **Node.js** & **Express.js** - Server Framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password Hashing
- **Express Validator** - Input Validation
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
hospital-management/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── patientController.js  # Patient CRUD
│   │   ├── doctorController.js   # Doctor CRUD
│   │   ├── hospitalController.js # Hospital CRUD
│   │   ├── appointmentController.js # Appointment CRUD
│   │   └── dashboardController.js # Dashboard stats
│   ├── middleware/
│   │   └── auth.js               # JWT & Authorization
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Patient.js            # Patient schema
│   │   ├── Doctor.js             # Doctor schema
│   │   ├── Hospital.js           # Hospital schema
│   │   └── Appointment.js        # Appointment schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── patientRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── hospitalRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── dashboardRoutes.js
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── package.json
│   └── server.js                 # Entry point
│
├── src/
│   ├── components/
│   │   ├── Login.jsx             # Login page
│   │   ├── Signup.jsx            # Signup page
│   │   ├── EnhancedDashboard.jsx # Main dashboard
│   │   ├── PrivateRoute.jsx      # Route protection
│   │   ├── Doctor.jsx            # Doctor management
│   │   ├── Patient.jsx           # Patient management
│   │   └── Hospital.jsx          # Hospital management
│   ├── context/
│   │   └── AuthContext.jsx       # Auth state management
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
│
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd hospitalmanagement_frontend-main
```

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and configure
cp .env.example .env
```

**Configure `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospitalDB?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Get your MongoDB Atlas URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and database name

```bash
# Start the backend server
npm run dev
# Server runs on http://localhost:5000
```

### Step 3: Setup Frontend

```bash
# Navigate to root directory
cd ..

# Install dependencies
npm install

# Install additional required packages
npm install axios react-icons
```

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/forgot-password` - Forgot password
- `PUT /api/auth/reset-password/:token` - Reset password

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get single patient
- `POST /api/patients` - Create patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient
- `GET /api/patients/my-profile` - Get my patient profile

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get single doctor
- `POST /api/doctors` - Create doctor (Admin only)
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor (Admin only)

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get single hospital
- `POST /api/hospitals` - Create hospital (Admin only)
- `PUT /api/hospitals/:id` - Update hospital (Admin only)
- `DELETE /api/hospitals/:id` - Delete hospital (Admin only)

### Appointments
- `GET /api/appointments` - Get appointments
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment (Admin only)
- `GET /api/appointments/my-appointments` - Get my appointments

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (Admin/Doctor/Staff)

## 👤 Demo Accounts

After setting up, create these demo accounts by registering:

**Admin Account:**
- Email: admin@hospital.com
- Password: admin123
- Role: admin

**Doctor Account:**
- Email: doctor@hospital.com
- Password: doctor123
- Role: doctor

**Patient Account:**
- Email: patient@hospital.com
- Password: patient123
- Role: patient

## 🎨 UI Highlights

- **Login/Signup**: Beautiful gradient backgrounds with smooth animations
- **Dashboard**: Real-time statistics with color-coded cards
- **Navigation**: Sticky header with user profile dropdown
- **Responsive**: Mobile-first design that works on all devices
- **Professional**: Production-ready UI with modern design patterns

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Role-based authorization
- Input validation with express-validator
- CORS configuration
- Environment variable protection

## 📝 Database Models

### User
- Name, email, password
- Role (admin, doctor, patient, staff)
- Phone, avatar
- Active status
- Reset password tokens

### Patient
- User reference
- Patient ID (auto-generated)
- DOB, gender, blood group
- Address, emergency contact
- Medical history, allergies
- Current medications
- Insurance information

### Doctor
- User reference
- Doctor ID (auto-generated)
- Specialization, qualification
- Experience, license number
- Department, consultation fee
- Availability schedule
- Rating, total patients
- Biography, awards

### Hospital
- Hospital ID (auto-generated)
- Name, address, contact
- Type (Government/Private)
- Departments
- Bed management
- Facilities, accreditation
- Rating

### Appointment
- Appointment ID (auto-generated)
- Patient, doctor, hospital references
- Date, time slot
- Type, status
- Symptoms, diagnosis
- Prescription
- Payment information

## 🚀 Deployment

### Backend (Render/Heroku)
1. Push code to GitHub
2. Connect to Render/Heroku
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API URL in code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Built with ❤️ by Your Name

## 🐛 Issues & Support

For issues and feature requests, please create an issue in the repository.

---

⭐ If you find this project helpful, please give it a star!
