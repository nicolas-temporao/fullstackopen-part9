import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (
    req.query.height === undefined ||
    req.query.weight === undefined ||
    !Number.isFinite(weight) ||
    !Number.isFinite(height) ||
    height <= 0 ||
    weight <= 0
  ) {
    return res.status(400).json({ error: 'invalid parameters/format' });
  }

  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
