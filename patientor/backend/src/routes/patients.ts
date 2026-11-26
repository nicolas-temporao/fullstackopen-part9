import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { Patient, NonSensitivePatient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(addedPatient);
});
export default router;
