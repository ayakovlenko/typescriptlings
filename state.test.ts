import { assertEquals } from "./deps_test.ts";
import { Exercise, ExerciseMode } from "./exercise.ts";
import { State } from "./state.ts";

Deno.test("no more exercises", () => {
  const state = new State([]);

  assertEquals(state.next(), undefined);
});

Deno.test("next exercise", () => {
  const e1 = new Exercise({ path: "1.ts", mode: "compile" });
  const e2 = new Exercise({ path: "2.ts", mode: "compile" });
  const state = new State([e1, e2]);

  assertEquals(state.next(), e2);
});
