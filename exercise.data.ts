import { Exercise } from "./exercise.ts";

const exercises: Exercise[] = (() => {
  const data: Exercise[] = [
    {
      path: "exercises/test/test_1.ts",
      mode: "compile",
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
