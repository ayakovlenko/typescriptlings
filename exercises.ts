enum ExerciseMode {
  Compile,
  Test,
}

interface Exercise {
  path: string;
  mode: ExerciseMode;
}

const exercises: Exercise[] = [
  {
    path: "exercises/test/test_1.ts",
    mode: ExerciseMode.Compile,
  },
  {
    path: "exercises/test/test_2.ts",
    mode: ExerciseMode.Compile,
  },
  {
    path: "exercises/test/test_3.ts",
    mode: ExerciseMode.Compile,
  },
  {
    path: "exercises/test/test_4.ts",
    mode: ExerciseMode.Compile,
  },
];

export type { Exercise };

export { ExerciseMode, exercises };
