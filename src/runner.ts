import { Exercise } from "./exercise.ts";

const __decoder = new TextDecoder();
const __decode = (bs: Uint8Array) => __decoder.decode(bs);

interface RunResult {
  ok: boolean;
  output: string;
}

class Runner {
  async typeCheck({ path }: Exercise): Promise<RunResult> {
    const cmd = new Deno.Command(Deno.execPath(), {
      args: ["check", path],
      stdout: "piped",
      stderr: "piped",
    });

    cmd.spawn();

    const { success } = await cmd.status;
    const { stdout, stderr } = await cmd.output();
    const output = __decode(success ? stdout : stderr);
    return { ok: success, output };
  }

  async isDone(exercise: Exercise): Promise<boolean> {
    const text = await Deno.readTextFile(exercise.path);
    return !text.includes("// I AM NOT DONE");
  }
}

export { Runner };
