import { Exercise } from "./exercise.ts";
import { check } from "./runner.ts";
import { assert } from "./deps_test.ts";

Deno.test({
  name: "check",
  fn: async (t) => {
    await t.step({
      name: "compilation success",
      fn: async () => {
        const exercise = new Exercise({
          path: "exercises/test/comp_success.ts",
          mode: "compile",
        });
        const { ok } = await check(exercise);
        assert(ok);
      },
    });

    await t.step({
      name: "compilation failure",
      fn: async () => {
        const exercise = new Exercise({
          path: "exercises/test/comp_failure.ts",
          mode: "compile",
        });
        const { ok } = await check(exercise);
        assert(!ok);
      },
    });
  },
});
