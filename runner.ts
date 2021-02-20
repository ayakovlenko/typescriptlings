import { Exercise } from "./exercises.ts";

const d = new TextDecoder();

const run = async (exercise: Exercise): Promise<[boolean, string]> => {
  const p = Deno.run({
    cmd: ["deno", "run", exercise.path],
    stdout: "piped",
    stderr: "piped",
  });

  const { success } = await p.status();

  let output: string;
  if (success) {
    output = d.decode(await p.output());
  } else {
    output = d.decode(await p.stderrOutput());
  }
  return [success, output];
};

const isDone = async (exercise: Exercise): Promise<boolean> => {
  return !(await Deno.readTextFile(exercise.path)).includes("// I AM NOT DONE");
};

const check = async (exercise: Exercise): Promise<boolean> => {
  const { success } = await Deno.run({
    cmd: ["deno", "run", exercise.path],
    stdout: "null",
    stderr: "null",
  }).status();
  return success;
};

export { check, isDone, run };
