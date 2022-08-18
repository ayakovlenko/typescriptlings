import { Exercise } from "../src/exercise.ts";

const exercises: Exercise[] = (() => {
  const data: Exercise[] = [
    {
      path: "exercises/test/test_1.ts",
      mode: "compile",
      hint: "check the documentation of console: https://developer.mozilla.org/en-US/docs/Web/API/console"
    },
    {
      path: "exercises/test/test_2.ts",
      mode: "compile",
    },
    {
      path: "exercises/test/test_3.ts",
      mode: "compile",
    },
    {
      path: "exercises/test/test_4.ts",
      mode: "compile",
    },
  ];
  return data.map((e) => new Exercise(e));
})();

export { exercises };
