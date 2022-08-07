import { isWindows, normalize } from "./deps.ts";

type ExerciseMode = "compile" | "test";

const osNormalize = (p: string): string => isWindows ? normalize(p) : p;

class Exercise {
  public readonly path: string;
  public readonly mode: ExerciseMode;

  constructor({ path, mode }: { path: string; mode: ExerciseMode }) {
    this.path = osNormalize(path);
    this.mode = mode;
  }
}

export type { ExerciseMode };

export { Exercise };
