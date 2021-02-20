import { normalize } from "https://deno.land/std@0.88.0/path/win32.ts";

enum ExerciseMode {
  Compile,
  Test,
}

class Exercise {
  public readonly path: string;
  public readonly mode: ExerciseMode;

  constructor({ path, mode }: { path: string; mode: ExerciseMode }) {
    this.path = normalize(path);
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
