import { Gender, type NewPatient } from './types.ts';

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!isString(name) || name.trim() === '') {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || ssn.trim() === '') {
    throw new Error('Incorrect or missing SSN');
  }

  return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || occupation.trim() === '') {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

export const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};
