import { Exercise } from "./exercise.ts";
import { typeCheck } from "./runner.ts";
import { assert } from "./deps_test.ts";

Deno.test("check", async (t) => {
  await t.step("type-check success", async () => {
    const exercise = new Exercise({
      path: "exercises/test/comp_success.ts",
      mode: "compile",
    });
    const { ok } = await typeCheck(exercise);
    assert(ok);
  });

  await t.step("type-check failure", async () => {
    const exercise = new Exercise({
      path: "exercises/test/comp_failure.ts",
      mode: "compile",
    });
    const { ok } = await typeCheck(exercise);
    assert(!ok);
  });
});
