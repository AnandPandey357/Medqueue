# 🚀 Quick Start Guide for MedQueue Hospital Management System

## Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

## Setup Steps

### 1. Configure Backend (.env file)
Open `backend/.env` and update with your MongoDB Atlas connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/hospitalDB?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Get Your MongoDB Atlas URI:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a FREE cluster
3. Create a database user (Database Access → Add New Database User)
4. Whitelist your IP (Network Access → Add IP Address → Allow Access from Anywhere)
5. Click "Connect" on your cluster
6. Choose "Connect your application"
7. Copy the connection string
8. Replace `<username>`, `<password>`, and database name in your `.env` file

### 2. Start the Backend Server
Open a NEW terminal and run:
```powershell
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

### 3. Start the Frontend
The frontend is already running on http://localhost:5173
If not, open another terminal and run:
```powershell
npm run dev
```

### 4. Access the Application
Open your browser and go to: **http://localhost:5173**

## First Time Usage

1. Click "Sign Up" to create a new account
2. Fill in your details:
   - Name, Email, Phone
   - Choose role (Patient or Doctor)
   - Create password
3. After signup, you'll be automatically logged in
4. Explore the dashboard and features!

## Features Available

### ✅ Authentication
- ✅ User Registration with role selection
- ✅ User Login with JWT tokens
- ✅ Protected routes
- ✅ User profile management
- ✅ Logout functionality

### ✅ Dashboard
- ✅ Real-time statistics
- ✅ Total patients, doctors, hospitals count
- ✅ Appointment tracking
- ✅ Bed occupancy rates
- ✅ Recent appointments list

### 🔄 Coming Features (Ready to Implement)
- Patient CRUD operations
- Doctor profiles with schedules
- Hospital management
- Appointment booking system
- Medical records management

## Test the System

### Create Admin User (via Postman or Thunder Client)

**POST** `http://localhost:5000/api/auth/register`

```json
{
  "name": "Admin User",
  "email": "admin@hospital.com",
  "password": "admin123",
  "phone": "+1234567890",
  "role": "admin"
}
```

### Login
**POST** `http://localhost:5000/api/auth/login`

```json
{
  "email": "admin@hospital.com",
  "password": "admin123"
}
```

Copy the token from response and use it in Authorization header:
`Authorization: Bearer YOUR_TOKEN_HERE`

### Get Dashboard Stats (Admin only)
**GET** `http://localhost:5000/api/dashboard/stats`
Headers: `Authorization: Bearer YOUR_TOKEN`

## Project Structure

```
hospitalmanagement_frontend-main/
├── backend/               # Express.js backend
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── config/          # Database config
│   └── server.js        # Entry point
│
├── src/                 # React frontend
│   ├── components/      # UI components
│   ├── context/        # Auth context
│   └── App.jsx         # Main app
│
└── README_NEW.md       # Detailed documentation
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user profile
- PUT `/api/auth/profile` - Update profile

### Dashboard
- GET `/api/dashboard/stats` - Get dashboard statistics (Auth required)

### Future Endpoints (Models Ready)
- `/api/patients` - Patient CRUD
- `/api/doctors` - Doctor CRUD
- `/api/hospitals` - Hospital CRUD
- `/api/appointments` - Appointment CRUD

## Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct in `.env`
- Ensure PORT 5000 is not in use
- Run `npm install` in backend directory

### Frontend shows errors
- Ensure axios and react-icons are installed: `npm install axios react-icons`
- Clear browser cache
- Restart dev server

### Database connection failed
- Verify MongoDB Atlas credentials
- Check IP whitelist in MongoDB Atlas
- Test connection string

## Next Steps

1. ✅ Backend with authentication - DONE
2. ✅ Frontend with login/signup - DONE
3. ✅ Dashboard with stats - DONE
4. 🔄 Implement Patient Management UI
5. 🔄 Implement Doctor Management UI
6. 🔄 Implement Hospital Management UI
7. 🔄 Implement Appointment Booking System

## Support

For detailed documentation, see `README_NEW.md`

---

**Built with ❤️ using MERN Stack**

🎉 Happy Coding!
