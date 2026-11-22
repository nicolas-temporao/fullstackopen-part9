interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  hours: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  const target = Number(args[2]);
  const hours = args.slice(3).map(Number);

  if (target <= 0 || !Number.isFinite(target)) {
    throw new Error('Invalid target');
  }

  if (hours.some((hour) => !Number.isFinite(hour) || hour < 0)) {
    throw new Error('Invalid exercise hours');
  }
  return { target, hours };
};

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = hours.reduce((sum, hour) => sum + hour, 0) / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;

  const percentage = average / target;
  if (percentage < 0.75) {
    rating = 1;
    ratingDescription = 'definitely needs improvement';
  } else if (percentage < 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'a complete success';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
