import { osNormalize } from "./path_util.ts";

enum ExerciseMode {
  Compile,
  Test,
}

class Exercise {
  public readonly path: string;
  public readonly mode: ExerciseMode;

  constructor({ path, mode }: { path: string; mode: ExerciseMode }) {
    this.path = osNormalize(path);
    this.mode = mode;
  }
}

const exercises: Exercise[] = [
  new Exercise({
    path: "exercises/test/test_1.ts",
    mode: ExerciseMode.Compile,
  }),
  new Exercise({
    path: "exercises/test/test_2.ts",
    mode: ExerciseMode.Compile,
  }),
  new Exercise({
    path: "exercises/test/test_3.ts",
    mode: ExerciseMode.Compile,
  }),
  new Exercise({
    path: "exercises/test/test_4.ts",
    mode: ExerciseMode.Compile,
  }),
];

export type { Exercise };

export { ExerciseMode, exercises };
