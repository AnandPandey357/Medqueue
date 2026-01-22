import express from 'express';
import {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getMyProfile
} from '../controllers/patientController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin', 'doctor', 'staff'), getPatients)
  .post(protect, createPatient);

router.get('/my-profile', protect, authorize('patient'), getMyProfile);

router.route('/:id')
  .get(protect, getPatient)
  .put(protect, updatePatient)
  .delete(protect, authorize('admin'), deletePatient);

export default router;
