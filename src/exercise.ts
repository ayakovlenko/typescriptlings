import { isWindows, normalize } from "./deps.ts";

type ExerciseMode = "compile" | "test";

const osNormalize = (p: string): string => isWindows ? normalize(p) : p;

class Exercise {
  public readonly path: string;
  public readonly mode: ExerciseMode;
  public readonly hint?: string;

  constructor({ path, mode, hint }: { path: string; mode: ExerciseMode, hint?: string }) {
    this.path = osNormalize(path);
    this.mode = mode;
    this.hint = hint;
  }
}

export type { ExerciseMode };

export { Exercise };
