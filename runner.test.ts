import { Exercise } from "./exercise.ts";
import { check, run } from "./runner.ts";
import { assert } from "./deps_test.ts";

Deno.test("run: compilation success", async () => {
  const exercise = new Exercise({
    path: "exercises/test/comp_success.ts",
    mode: "compile",
  });
  const { ok } = await run(exercise);
  assert(ok);
});

Deno.test("run: compilation failure", async () => {
  const exercise = new Exercise({
    path: "exercises/test/comp_failure.ts",
    mode: "compile",
  });
  const { ok } = await run(exercise);
  assert(!ok);
});

Deno.test("check: compilation success", async () => {
  const exercise = new Exercise({
    path: "exercises/test/comp_success.ts",
    mode: "compile",
  });
  assert(await check(exercise));
});

Deno.test("check: compilation failure", async () => {
  const exercise = new Exercise({
    path: "exercises/test/comp_failure.ts",
    mode: "compile",
  });
  assert(!await check(exercise));
});
