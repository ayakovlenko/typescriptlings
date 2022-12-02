import { Exercise } from "./exercise.ts";
import { assert } from "./deps_test.ts";
import { Runner } from "./runner.ts";

Deno.test("check", async (t) => {
  const runner = new Runner();

  await t.step("type-check success", async () => {
    const exercise = new Exercise({
      path: "exercises/test/comp_success.ts",
      mode: "compile",
    });
    const { ok } = await runner.typeCheck(exercise);
    assert(ok);
  });

  await t.step("type-check failure", async () => {
    const exercise = new Exercise({
      path: "exercises/test/comp_failure.ts",
      mode: "compile",
    });
    const { ok } = await runner.typeCheck(exercise);
    assert(!ok);
  });
});
