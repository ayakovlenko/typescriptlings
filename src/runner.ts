import { Exercise } from "./exercise.ts";

const d = new TextDecoder();

interface RunResult {
  ok: boolean;
  output: string;
}

const check = async (exercise: Exercise): Promise<RunResult> => {
  const p = Deno.run({
    cmd: ["deno", "check", exercise.path],
    stdout: "piped",
    stderr: "piped",
  });
  const { success } = await p.status();
  let output: string;
  if (success) {
    output = d.decode(await p.output());
    p.stderr.close();
  } else {
    output = d.decode(await p.stderrOutput());
    p.stdout.close();
  }
  p.close();
  return { ok: success, output };
};

const isDone = async (exercise: Exercise): Promise<boolean> => {
  return !(await Deno.readTextFile(exercise.path)).includes("// I AM NOT DONE");
};

const isHintNeeded = async (exercise: Exercise): Promise<boolean> => {
  return (await Deno.readTextFile(exercise.path)).includes("// HINT");
};

export { check, isDone, isHintNeeded };
