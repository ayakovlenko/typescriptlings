type ExerciseMode = "compile" | "test";

export type Exercise = {
  readonly path: string;
  readonly mode: ExerciseMode;
};
