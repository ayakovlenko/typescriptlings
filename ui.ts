import { Exercise, exercises } from "./exercises.ts";

const congratsAndExit = () => {
  console.log("🎉 Congrats! You have finished all the exercises!");
  Deno.exit(0);
};

const nextInstuctions = () => {
  console.log(`You can keep working on this exercise,
or jump into the next one by removing the 'I AM NOT DONE' comment.`);
};

const successfulRun = (exercise: Exercise) => {
  console.log(`✅ Successfully ran ${exercise.path}!`);
};

const failedRun = (exercise: Exercise) => {
  console.log(
    `⚠️ Compiling of ${exercise.path} failed! Please try again. Here's the output:\n`,
  );
};

export { congratsAndExit, failedRun, nextInstuctions, successfulRun };
