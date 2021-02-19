enum ExerciseMode {
  Compile,
  Test,
}

interface Exercise {
  name: string;
  path: string;
  mode: ExerciseMode;
}

const exercises: Exercise[] = [
  {
    name: "test_1",
    path: "exercises/test/test_1.ts",
    mode: ExerciseMode.Compile,
  },
  {
    name: "test_2",
    path: "exercises/test_2.ts",
    mode: ExerciseMode.Compile,
  },
];

export type { Exercise };

export { ExerciseMode, exercises };
