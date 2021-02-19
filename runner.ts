import { relative } from "./deps.ts";

const d = new TextDecoder();

const run = async (exercisePath: string): Promise<void> => {
  exercisePath = relative(Deno.cwd(), exercisePath);

  const p = Deno.run({
    cmd: ["deno", "run", exercisePath],
    stdout: "piped",
    stderr: "piped",
  });

  const { success } = await p.status();

  let output: string;
  if (success) {
    output = d.decode(await p.output());
    console.log(`✅ Successfully ran ${exercisePath}!\n`);
    console.log(output);
    console.log(`You can keep working on this exercise,
or jump into the next one by removing the 'I AM NOT DONE' comment.`);
  } else {
    output = d.decode(await p.stderrOutput());
    console.log(
      `Compiling of ${exercisePath} failed! Please try again. Here's the output:\n`,
    );
    console.log(output);
  }
};

export { run };
