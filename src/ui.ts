import { Exercise } from "./exercise.ts";
import { Colors } from "./deps.ts";

const congratsAndExit = () => {
  console.log("🎉 Congrats! You have finished all the exercises!");
  Deno.exit(0);
};

const nextInstuctions = () => {
  console.log(
    Colors.yellow(`You can keep working on this exercise,
or jump into the next one by removing the "I AM NOT DONE" comment.\n`),
  );
};

const hintInstuctions = () => {
  console.log(
    Colors.yellow(`To show a hint — add "// HINT" comment anywhere in the code.\n`),
  );
};

const successfulRun = (exercise: Exercise) => {
  console.log(Colors.green(`✅ Successfully ran ${exercise.path}!`));
};

const failedRun = (exercise: Exercise) => {
  console.log(
    Colors.red(
      `❌ Compiling of ${exercise.path} failed! Please try again. Here's the output:\n`,
    ),
  );
};

export { congratsAndExit, failedRun, nextInstuctions, successfulRun, hintInstuctions };
