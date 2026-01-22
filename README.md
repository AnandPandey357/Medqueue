# 🏥 MedQueue - Hospital Management System

A comprehensive, production-ready hospital management system built with the MERN stack (MongoDB, Express.js, React, Node.js). This full-stack application provides complete management capabilities for hospitals, doctors, patients, and appointments with a modern, responsive UI.

## 🚀 Live Demo

**[View Live Application →](https://medqueuehospital.vercel.app/)**

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?logo=vite)
![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey?logo=express)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.10-blue?logo=tailwindcss)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Database Seeding](#-database-seeding)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Sample Credentials](#-sample-credentials)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with secure password hashing (bcrypt)
- Role-based access control (Admin, Doctor, Patient, Staff)
- Protected routes and middleware
- Session management with token refresh

### 🏥 Hospital Management
- Complete hospital directory with Delhi-based institutions
- Real-time bed availability tracking
- Department-wise bed occupancy
- Emergency services status
- Hospital facilities and accreditation info
- Search and filter by type (Government/Private/Semi-Government)

### 👨‍⚕️ Doctor Management
- Comprehensive doctor profiles with Indian doctors
- Specialization-based categorization (10+ specialties)
- Availability scheduling (day-wise time slots)
- Consultation fee management
- Doctor ratings and patient count
- Search by name, ID, or specialization

### 👥 Patient Management
- Patient registration and profile management
- Auto-generated patient IDs (PAT000001 format)
- Blood group tracking and filtering
- Emergency contact information
- Medical history (date of birth, gender, address)
- Search and filter capabilities

### 📊 Dashboard
- Real-time statistics and analytics
- Today's appointments overview
- Bed occupancy visualization
- Recent activity tracking
- User profile management

### 🎨 UI/UX Features
- Modern gradient design with glassmorphism
- Fully responsive layout (mobile, tablet, desktop)
- Interactive modals and forms
- Loading states and error handling
- Toast notifications
- Smooth animations and transitions

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library with hooks
- **Vite 5.4.2** - Fast build tool and dev server
- **React Router DOM 6.26.1** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Comprehensive icon library
- **Tailwind CSS 3.4.10** - Utility-first CSS framework
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.18.2** - Web application framework
- **MongoDB with Mongoose 8.0.3** - NoSQL database and ODM
- **JWT (jsonwebtoken 9.0.2)** - Token-based authentication
- **Bcrypt.js 2.4.3** - Password hashing
- **Express Validator 7.0.1** - Request validation
- **CORS** - Cross-origin resource sharing
- **Nodemon 3.0.2** - Auto-restart development server

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB database
- Auto-generated IDs for all entities
- Indexed fields for fast queries
- Relationship mapping between collections

## 📁 Project Structure

```
hospitalmanagement_frontend-main/
├── src/
│   ├── components/
│   │   ├── Login.jsx              # Login page with authentication
│   │   ├── Signup.jsx             # User registration
│   │   ├── Dashboard.jsx          # Main dashboard with statistics
│   │   ├── EnhancedDashboard.jsx  # Enhanced dashboard view
│   │   ├── Doctor.jsx             # Doctor directory and profiles
│   │   ├── Patient.jsx            # Patient management interface
│   │   ├── Hospital.jsx           # Hospital listings and details
│   │   ├── Book.jsx               # Appointment booking
│   │   └── PrivateRoute.jsx       # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.jsx        # Global authentication state
│   ├── assets/                    # Images and static files
│   ├── App.jsx                    # Main app component with routing
│   ├── App.css                    # Global styles
│   ├── index.css                  # Tailwind CSS imports
│   └── main.jsx                   # React entry point
├── backend/
│   ├── models/
│   │   ├── User.js                # User schema with authentication
│   │   ├── Doctor.js              # Doctor profile schema
│   │   ├── Patient.js             # Patient information schema
│   │   ├── Hospital.js            # Hospital details schema
│   │   └── Appointment.js         # Appointment booking schema
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── doctorController.js    # Doctor CRUD operations
│   │   ├── patientController.js   # Patient management
│   │   ├── hospitalController.js  # Hospital operations
│   │   ├── appointmentController.js # Appointment handling
│   │   └── dashboardController.js # Dashboard statistics
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   ├── doctors.js             # Doctor API routes
│   │   ├── patients.js            # Patient API routes
│   │   ├── hospitals.js           # Hospital API routes
│   │   ├── appointments.js        # Appointment routes
│   │   └── dashboard.js           # Dashboard routes
│   ├── middleware/
│   │   └── auth.js                # JWT verification & authorization
│   ├── config/
│   │   └── db.js                  # MongoDB connection config
│   ├── server.js                  # Express server setup
│   ├── seedData.js                # Database seeding script
│   └── package.json               # Backend dependencies
├── public/                        # Public assets
├── .env                           # Environment variables
├── package.json                   # Frontend dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── eslint.config.js               # ESLint rules
└── README.md                      # Project documentation

```

## 📦 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) or **yarn**
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd hospitalmanagement_frontend-main/hospitalmanagement_frontend-main
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

## 🔧 Environment Setup

### 1. Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Whitelist your IP address or allow access from anywhere (0.0.0.0/0)
5. Get your connection string

### 2. Configure Backend Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
```

Create `backend/.env`:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/hospital_management?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Optional - for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@medqueue.com
```

### 3. Update MongoDB Connection String

Replace the MongoDB URI with your actual connection string from MongoDB Atlas.

## 🌱 Database Seeding

The project includes a seeding script to populate the database with sample data:

- 8 Delhi-based hospitals (Government & Private)
- 20 Indian doctors across 10 specializations
- Complete profiles with Indian names, qualifications, and contact details

### Run the Seed Script

```bash
cd backend
npm run seed
```

Or:

```bash
cd backend
node seedData.js
```

### Sample Data Included

**Hospitals:**
- AIIMS, Safdarjung Hospital, Apollo Hospitals, Max Super Speciality Hospital, Fortis Hospital, Sir Ganga Ram Hospital, BLK Super Speciality Hospital, Indraprastha Apollo Hospital

**Doctors by Specialization:**
- Cardiology: Dr. Rajesh Kumar, Dr. Priya Sharma
- Dermatology: Dr. Anjali Mehta, Dr. Vikram Singh
- Neurology: Dr. Suresh Reddy, Dr. Kavita Desai
- Pediatrics: Dr. Amit Verma, Dr. Neha Gupta
- Orthopedics: Dr. Arjun Patel, Dr. Deepak Malhotra
- Gynecology: Dr. Sunita Rao, Dr. Meera Nair
- Psychiatry: Dr. Rohan Kapoor, Dr. Shalini Iyer
- Ophthalmology: Dr. Manoj Joshi, Dr. Pooja Menon
- ENT: Dr. Sanjay Agarwal, Dr. Ritu Bhatt
- General Medicine: Dr. Anil Kumar, Dr. Lakshmi Krishnan

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: **http://localhost:5000**

### Start Frontend Development Server

Open a new terminal:

```bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/updateprofile` | Update user profile | Private |
| POST | `/forgotpassword` | Request password reset | Public |
| PUT | `/resetpassword/:token` | Reset password | Public |

### Doctor Routes (`/api/doctors`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all doctors | Private |
| GET | `/:id` | Get doctor by ID | Private |
| POST | `/` | Create doctor | Private (Admin) |
| PUT | `/:id` | Update doctor | Private (Admin/Doctor) |
| DELETE | `/:id` | Delete doctor | Private (Admin) |

### Patient Routes (`/api/patients`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all patients | Private |
| GET | `/:id` | Get patient by ID | Private |
| POST | `/` | Create patient | Private |
| PUT | `/:id` | Update patient | Private |
| DELETE | `/:id` | Delete patient | Private (Admin) |

### Hospital Routes (`/api/hospitals`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all hospitals | Private |
| GET | `/:id` | Get hospital by ID | Private |
| POST | `/` | Create hospital | Private (Admin) |
| PUT | `/:id` | Update hospital | Private (Admin) |
| DELETE | `/:id` | Delete hospital | Private (Admin) |

### Appointment Routes (`/api/appointments`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all appointments | Private |
| GET | `/:id` | Get appointment by ID | Private |
| POST | `/` | Create appointment | Private |
| PUT | `/:id` | Update appointment | Private |
| DELETE | `/:id` | Cancel appointment | Private |

### Dashboard Routes (`/api/dashboard`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/stats` | Get dashboard statistics | Private |

## 🔑 Sample Credentials

### Doctor Accounts (Default Password: `Doctor@123`)

```
Email: rajesh.kumar@hospital.com
Email: priya.sharma@hospital.com
Email: anjali.mehta@hospital.com
Email: suresh.reddy@hospital.com
Email: amit.verma@hospital.com
...and 15 more doctors
```

### Create Your Own Account

You can also register a new account through the signup page with roles:
- Patient
- Doctor

Admin accounts must be created manually in the database.

## 📸 Screenshots

### Login Page
Modern gradient design with email/password authentication and remember me option.

### Dashboard
Real-time statistics showing total patients, doctors, hospitals, appointments, bed occupancy, and recent activity.

### Hospital Directory
Browse Delhi hospitals with search, filter by type, bed availability, departments, facilities, and detailed view modals.

### Doctor Directory
Search doctors by specialization, view profiles, ratings, availability schedules, consultation fees, and contact information.

### Patient Management
Add, view, search, and filter patients with blood group tracking and detailed information cards.

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- HTTP-only cookie support (optional)
- Protected API routes with middleware
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- MongoDB injection prevention

## 🎯 Future Enhancements

- [ ] Appointment booking system with calendar view
- [ ] Real-time notifications using Socket.io
- [ ] Medical records and prescription management
- [ ] Video consultation integration
- [ ] Payment gateway integration
- [ ] Analytics and reporting dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Chat system between doctors and patients
- [ ] Lab test management
- [ ] Pharmacy inventory management
- [ ] Ambulance tracking

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- React team for the amazing library
- Tailwind CSS for the utility-first framework
- All contributors and supporters

## 📞 Support

For support, email your.email@example.com or create an issue in the repository.

---

**Made with ❤️ for better healthcare management**
