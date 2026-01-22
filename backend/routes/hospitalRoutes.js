import express from 'express';
import {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital
} from '../controllers/hospitalController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getHospitals)
  .post(protect, authorize('admin'), createHospital);

router.route('/:id')
  .get(getHospital)
  .put(protect, authorize('admin'), updateHospital)
  .delete(protect, authorize('admin'), deleteHospital);

export default router;
