import { Exercise } from "./exercise.ts";
import { Colors } from "./deps.ts";
import process from "node:process";

const congratsAndExit = () => {
  console.log("🎉 Congrats! You have finished all the exercises!");
  process.exit(0);
};

const nextInstuctions = () => {
  console.log(
    Colors.yellow(`You can keep working on this exercise,
or jump into the next one by removing the "I AM NOT DONE" comment.\n`),
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

export { congratsAndExit, failedRun, nextInstuctions, successfulRun };
