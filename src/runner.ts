import { Exercise } from "./exercise.ts";
import { readFile } from "node:fs/promises";

interface RunResult {
  ok: boolean;
  output: string;
}

const check = async (exercise: Exercise): Promise<RunResult> => {
  const p = new Deno.Command("deno", {
    args: ["check", exercise.path],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await p.output();

  const ok = code === 0;

  let output: Uint8Array;
  if (ok) {
    output = stdout;
  } else {
    output = stderr;
  }
  return { ok, output: new TextDecoder().decode(output) };
};

const isDone = async (exercise: Exercise): Promise<boolean> => {
  return !(await readFile(exercise.path, "utf-8")).includes("// I AM NOT DONE");
};

export { check, isDone };
